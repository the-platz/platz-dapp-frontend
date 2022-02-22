import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useAppSelector } from '../app/hooks'
import CampaignCard from '../components/Campaigns/CampaignCard'
import {
	selectCampaigns,
	selectMyCampaigns,
} from '../app/slices/campaignFactorySlice'

const MyCampaigns = () => {
	const myCampaigns = useAppSelector(selectMyCampaigns)
	const campaigns = useAppSelector(selectCampaigns())

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			maxWidth="886"
			mx="auto"
			py={16}
		>
			<Text fontSize={'xl'} mb={4} fontWeight={'semibold'}>
				My Campaigns
			</Text>

			<Grid
				templateColumns={[
					'repeat(auto-fit, 1fr)',
					'repeat(auto-fit, calc(100% / 2))',
					'repeat(auto-fit, calc(100% / 3))',
				]}
				justifyContent="center"
				gap={4}
				width="100%"
			>
				{campaigns &&
					myCampaigns?.map((campaign) => {
						const myCampaignInfo = campaigns.find(
							(el) => el.campaign_beneficiary === campaign.campaign_beneficiary
						)
						if (myCampaignInfo) {
							return (
								<GridItem>
									<CampaignCard
										key={campaign.campaign_account_id}
										campaignInfo={myCampaignInfo}
										campaignAccountId={campaign.campaign_account_id}
										isOwner
									/>
								</GridItem>
							)
						}
						return null
					})}
			</Grid>
		</Flex>
	)
}

export default MyCampaigns
