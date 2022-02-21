import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { selectWalletConnection } from '../../app/slices/walletSlice'
import {
	getCampaignContract,
	withdrawAsync,
} from '../../models/contracts/campaign_contract'
import { CampaignProps } from '../../models/types'
import { getCampaignTotalDonatedAmount, near_utils } from '../../utils/utils'
import * as consts from '../../utils/consts'

type ICampaignCardProps = {
	campaignInfo: CampaignProps
	campaignAccountId?: string
	isOwner?: boolean
}

const CampaignCard: React.FC<ICampaignCardProps> = ({
	campaignInfo,
	campaignAccountId,
	isOwner = false,
}) => {
	const toast = useToast()
	const walletConnection = useAppSelector(selectWalletConnection)

	const withdraw = () => {
		if (walletConnection && campaignAccountId) {
			const campaignContract = getCampaignContract(
				walletConnection,
				campaignAccountId
			)
			withdrawAsync(campaignContract)
		} else {
			toast({
				title: consts.TOAST_ERROR_WALLET_CONNECTION_NOT_INITIALIZED.title,
				description: consts.TOAST_ERROR_WALLET_CONNECTION_NOT_INITIALIZED.title,
				status: 'error',
				duration: consts.ERROR_VISIBILITY_DURATION,
				isClosable: true,
			})
		}
	}

	return (
		<Flex
			flexDirection="column"
			width="250px"
			minWidth="250px"
			height="250px"
			minHeight="250px"
			borderRadius="md"
			border="1px solid"
			borderColor="lightgray"
		>
			<Box
				bg="#d5ccc0"
				width="100%"
				height="150px"
				minHeight="150px"
				borderTopRadius="md"
			></Box>
			<Text fontWeight="medium" p={3}>
				{campaignInfo.name}
			</Text>
			<Text fontSize="sm" fontWeight="normal" px={3}>
				Donated:{' '}
				{campaignInfo
					? getCampaignTotalDonatedAmount(campaignInfo.donor_amounts)
					: '...'}{' '}
				NEAR
			</Text>
			<Text fontSize="sm" fontWeight="normal" px={3}>
				Target:{' '}
				{campaignInfo
					? near_utils.format.formatNearAmount(campaignInfo.target_amount, 2)
					: '...'}{' '}
				NEAR
			</Text>
			{isOwner && (
				<Button mt={4} type="button" onClick={() => withdraw()}>
					Withdraw
				</Button>
			)}
		</Flex>
	)
}

export default CampaignCard
