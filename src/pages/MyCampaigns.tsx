import { Flex, Text } from "@chakra-ui/react"
import { useAppSelector } from "../app/hooks";
import CampaignCard from "../components/Campaigns/CampaignCard";
import { selectCampaigns, selectMyCampaigns } from "../app/slices/campaignFactorySlice";

const MyCampaigns = () => {
    const myCampaigns = useAppSelector(selectMyCampaigns)
    const campaigns = useAppSelector(selectCampaigns())

    return (
        <Flex flexDirection="column" alignItems="center" maxWidth="886" mx="auto" py={16}>
            <Text>My Campaigns</Text>

            {campaigns && myCampaigns?.map((campaign) => {
                    const myCampaignInfo = campaigns.find(el=> el.campaign_beneficiary === campaign.campaign_beneficiary)
                    if (myCampaignInfo) {
                        return (
                            <CampaignCard key={campaign.campaign_account_id} campaignInfo={myCampaignInfo} campaignAccountId={campaign.campaign_account_id} isOwner />
                        );
                    }
                    return null;
                }
            )}
        </Flex>
    )
};

export default MyCampaigns;
