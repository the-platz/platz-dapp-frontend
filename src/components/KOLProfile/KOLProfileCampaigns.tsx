import { SimpleGrid, Skeleton } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectSignedInAccountId, selectWalletConnection } from "../../app/slices/walletSlice"
import { CampaignProps } from "../../models/types"
import CampaignCardV1 from "../Campaigns/CampaignCardV1"

type IKOLProfileCampaignsProps = {
    campaigns?: CampaignProps[]
}

const KOLProfileCampaigns: FC<IKOLProfileCampaignsProps> = ({ campaigns }) => {
    const walletConnection = useAppSelector(selectWalletConnection)
    const signedInAccountId = useAppSelector(selectSignedInAccountId)

    useEffect(() => {
    }, [walletConnection, signedInAccountId])

    return (
        <Skeleton isLoaded={walletConnection && campaigns !== undefined}>
            <SimpleGrid minChildWidth='300px' spacing='40px'>
                {campaigns?.map((campaign) =>
                    <CampaignCardV1
                        key={campaign.campaign_account_id}
                        campaignInfo={campaign}
                        campaignAccountId={campaign.campaign_account_id}
                        isOwner={signedInAccountId === campaign.campaign_beneficiary}>
                    </CampaignCardV1>)
                }
            </SimpleGrid>
        </Skeleton>
    )
}

export default KOLProfileCampaigns