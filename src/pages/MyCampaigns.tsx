import axios from "axios";
import { near_utils } from "../utils/utils";

import { Fragment, useEffect, useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { CampaignContract, getCampaignContract } from "../models/contracts/campaign_contract";
import { selectWalletConnection } from "../reducers/walletSlice";
import { useAppSelector } from "../app/hooks";

const MyCampaigns = () => {
    const walletConnection = useAppSelector(selectWalletConnection)

    const toast = useToast()
    const [myCampaignAccountIds, setMyCampaignAccountIds] = useState<string[] | undefined>(undefined)
    const [myCampaignContracts, setMyCampaignContracts] = useState<CampaignContract[] | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!myCampaignAccountIds && walletConnection) {
            axios.get(`http://localhost:5001/mycampaign?account_id=${walletConnection.account().accountId}`)
                .then(res => {
                    // TODO:: remove below stupid mapping
                    type MyCampaignResponse = {
                        campaign_account_id: string,
                        campaign_beneficiary: string,
                    }
                    setMyCampaignAccountIds((res.data.data as MyCampaignResponse[])
                        .map(campaignResp => campaignResp.campaign_account_id));
                })
                .catch(error => {
                    console.log(error)
                });
        }

        if (!myCampaignContracts && walletConnection) {
            if (myCampaignAccountIds) {
                myCampaignAccountIds.forEach(async (campaign_account_id) => {
                    const contract: CampaignContract = getCampaignContract(walletConnection, campaign_account_id)

                    contract.campaign_account_id = campaign_account_id
                    if (contract?.get_campaign_info) {
                        try {
                            contract.campaign_info = await contract.get_campaign_info()
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    setMyCampaignContracts((existingCampaigns) =>
                        !!existingCampaigns && existingCampaigns?.length > 0 ?
                            [...existingCampaigns, contract] : [contract])
                })
            }
        }
    }, [walletConnection, myCampaignAccountIds, myCampaignContracts])

    const handleWithdraw = async (campaign_contract: CampaignContract) => {
        if (campaign_contract.withdraw) {
            await campaign_contract.withdraw()
        } else {
            toast({
                title: 'Contract error',
                description: "Contract is not initialized!",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Fragment>
            <Text>My Campaigns</Text>

            {myCampaignContracts?.map((campaign_contract, _, __) =>
                !campaign_contract.campaign_info ? null :
                    <Box key={campaign_contract.campaign_account_id}
                        maxW='sm'
                        borderWidth='1px'
                        borderRadius='lg'>
                        <Text fontSize="md" fontWeight="bold">
                            {campaign_contract.campaign_account_id}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal">
                            Số tiền ủng hộ: {near_utils.format.formatNearAmount(campaign_contract.campaign_info.donated_amount, 2)} NEAR
                        </Text>
                        <Text fontSize="sm" fontWeight="normal">
                            Mục tiêu: {near_utils.format.formatNearAmount(campaign_contract.campaign_info.target_amount, 2)} NEAR
                        </Text>
                        <Button key={campaign_contract.campaign_account_id} mt={4}
                            onClick={() => handleWithdraw(campaign_contract)}>Withdraw</Button>
                    </Box>
            )}
        </Fragment>
    )
};

export default MyCampaigns;
