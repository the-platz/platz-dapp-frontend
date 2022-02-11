import axios from "axios";
import { near_utils } from "../utils/utils";

import { Fragment, useEffect, useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { CampaignContract, getCampaignContract } from "../models/contracts/campaign_contract";
import { selectWalletConnection } from "../app/slices/walletSlice";
import { useAppSelector } from "../app/hooks";
import CampaignCard from "../components/Campaigns/CampaignCard";

const MyCampaigns = () => {
    const walletConnection = useAppSelector(selectWalletConnection)

    const toast = useToast()
    const [myCampaignAccountIds, setMyCampaignAccountIds] = useState<string[] | undefined>(undefined)
    const [myCampaignContracts, setMyCampaignContracts] = useState<CampaignContract[] | undefined>(undefined)
    // const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (walletConnection && !myCampaignAccountIds) {
            axios.get(`http://localhost:5001/campaigns/account/${walletConnection.account().accountId}`)
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
    }, [walletConnection])

    const handleWithdraw = async (campaign_contract: CampaignContract) => {
        if (campaign_contract.withdraw) {
            // await campaign_contract.withdraw({})
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

            {myCampaignAccountIds?.map((campaignAccountId) =>
                <CampaignCard campaignAccountId={campaignAccountId} />
            )}
        </Fragment>
    )
};

export default MyCampaigns;
