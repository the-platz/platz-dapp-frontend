import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CampaignCard from '../components/Campaigns/CampaignCard'
import {
	setMyCampaigns,
} from '../app/slices/campaignFactorySlice'
import { selectWalletConnection } from '../app/slices/walletSlice'
import { useCallback, useEffect, useState } from 'react'
import { getAllCampaignsOfAccountIdAsync } from '../models/contracts/campaign_factory_contract'
import { CampaignProps } from '../models/types'
import { WalletConnection } from 'near-api-js'

const MyCampaigns = () => {
	const walletConnection = useAppSelector(selectWalletConnection)
	const dispatch = useAppDispatch()
	const [campaigns, setCampaigns] = useState<CampaignProps[]>([])

	const getMyCampaigns = useCallback(async (walletConnection: WalletConnection, accountId: string) => {
		const myCampaignInfos = await getAllCampaignsOfAccountIdAsync(
			walletConnection,
			walletConnection.account().accountId
		)
		dispatch(
			setMyCampaigns({
				payload: walletConnection.account().accountId,
				campaigns: myCampaignInfos,
			})
		)

		setCampaigns(myCampaignInfos)

	}, [walletConnection])

	useEffect(() => {
		if (walletConnection && walletConnection.isSignedIn()) {
			getMyCampaigns(walletConnection, walletConnection.account().accountId)
		}
	}, [dispatch, walletConnection, getMyCampaigns])

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
					campaigns?.map((campaign) =>
						<GridItem>
							<CampaignCard
								key={campaign.campaign_metadata.name}
								campaignInfo={campaign}
								campaignAccountId={campaign.name}
								isOwner
							/>
						</GridItem>
					)}
			</Grid>
		</Flex>
	)
}

export default MyCampaigns
