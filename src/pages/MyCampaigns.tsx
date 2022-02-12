import axios from "axios";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react"
import { CampaignContract, getCampaignContract } from "../models/contracts/campaign_contract";
=======
import { Fragment, useEffect, useState } from "react";
import { Text } from "@chakra-ui/react"
>>>>>>> 6633682f100527c7fefd14cd1e322216a549bd56
import { selectWalletConnection } from "../app/slices/walletSlice";
import { useAppSelector } from "../app/hooks";
import CampaignCard from "../components/Campaigns/CampaignCard";

const MyCampaigns = () => {
    const walletConnection = useAppSelector(selectWalletConnection)

    const [myCampaignAccountIds, setMyCampaignAccountIds] = useState<string[] | undefined>(undefined)
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

    return (
        <Flex flexDirection="column" alignItems="center" maxWidth="886" mx="auto" py={16}>
            <Text>My Campaigns</Text>

            {myCampaignAccountIds?.map((campaignAccountId) =>
                <CampaignCard key={campaignAccountId} campaignAccountId={campaignAccountId} />
            )}
        </Flex>
    )
};

export default MyCampaigns;
