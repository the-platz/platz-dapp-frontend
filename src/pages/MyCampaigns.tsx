import { useCallback, useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react"
import { selectWalletConnection } from "../app/slices/walletSlice";
import { useAppSelector } from "../app/hooks";
import CampaignCard from "../components/Campaigns/CampaignCard";
import { getAllCampaignsOfAccountIdAsync } from "../services/campaigns";
import { WalletConnection } from "near-api-js";

const MyCampaigns = () => {
    const walletConnection = useAppSelector(selectWalletConnection)

    const [myCampaignAccountIds, setMyCampaignAccountIds] = useState<string[] | undefined>(undefined)
    // const [loading, setLoading] = useState<boolean>(false)

    const getMyCampaigns = useCallback(async(walletConnection: WalletConnection) => {
        const myCampaigns = await getAllCampaignsOfAccountIdAsync(walletConnection.account().accountId)
        setMyCampaignAccountIds(myCampaigns.map(campaignResp => campaignResp.campaign_account_id));
    }, [])

    useEffect(() => {
        if (walletConnection && !myCampaignAccountIds) {
            getMyCampaigns(walletConnection)
        }
    }, [walletConnection, myCampaignAccountIds, getMyCampaigns])

    return (
        <Flex flexDirection="column" alignItems="center" maxWidth="886" mx="auto" py={16}>
            <Text>My Campaigns</Text>

            {myCampaignAccountIds?.map((campaignAccountId) =>
                <CampaignCard key={campaignAccountId} campaignAccountId={campaignAccountId} isOwner />
            )}
        </Flex>
    )
};

export default MyCampaigns;
