import { Box, Image, Badge } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { CampaignProps } from '../../models/types'
import { formatNearAmount, getCampaignTotalDonatedAmount } from '../../utils'

type ICampaignCardProps = {
	campaignInfo: CampaignProps
	campaignAccountId?: string
	isOwner?: boolean
}

const CampaignCardV1: React.FC<ICampaignCardProps> = ({
	campaignInfo,
	campaignAccountId,
}) => {
	const navigate = useNavigate()

	const navigateToCampaign = () => {
		let path = `/campaigns/${campaignAccountId}`
		navigate(path)
	}

	return (
		<Box
			maxW='sm'
			borderWidth='1px'
			borderRadius='lg'
			as="button"
			onClick={navigateToCampaign}
			overflow='hidden'>
			<Image src={"https://bit.ly/2Z4KKcF"} />
			<Box p='6'>
				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					isTruncated
				>
					{campaignInfo.campaign_metadata.name}
					<Badge borderRadius='full' px='2' colorScheme='teal' ml={2}>
						New
					</Badge>
				</Box>

				<Box>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='sm'
						textTransform='uppercase'
					>
						Target: {formatNearAmount(campaignInfo.target_amount, 0)} N
						&bull;
						Donated: {formatNearAmount(getCampaignTotalDonatedAmount(campaignInfo.donor_amounts), 0)} N
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default CampaignCardV1
