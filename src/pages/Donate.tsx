import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import * as nearAPI from 'near-api-js'
import { useAppSelector } from '../app/hooks'
import { selectCampaigns } from '../app/slices/campaignFactorySlice'

const Donation = (kolName: string) => {
	const campaigns = useAppSelector(selectCampaigns(kolName))

	const [loading, setLoading] = useState(false)

	const { utils } = nearAPI

	// const handleView = () => {
	//   if (loading) return;
	//   setLoading(true);
	//   (window as any).contract
	//     .get_campaign_factory_info()
	//     .then((res: any) => {
	//       setLoading(false);
	//       console.log('res', res)
	//     });
	// };

	// const handleDonate = async (c: string) => {
	//   const account = (window as any).walletConnection.account()
	//   setLoading(true)
	//   const contract: Contract & { donate?: donateFn } = new nearAPI.Contract(
	//     account, // the account object that is connecting
	//     c,
	//     {
	//       // name of contract you're connecting to
	//       viewMethods: ["get_campaign_info"], // view methods do not change state but usually return a value
	//       changeMethods: ["donate"], // change methods modify state
	//     }
	//   )
	//   if (contract?.donate) {
	//     try {
	//       await contract.donate(
	//         {},
	//         "300000000000000", // attached GAS (optional)
	//         "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
	//       )
	//       toast({
	//         title: 'Thành công',
	//         description: "Bạn đã donate thành công",
	//         status: 'success',
	//         duration: 5000,
	//         isClosable: true,
	//       })
	//       setLoading(false)
	//     }
	//     catch (e: any) {
	//       toast({
	//         title: 'Error.',
	//         description: e,
	//         status: 'error',
	//         duration: 5000,
	//         isClosable: true,
	//       })
	//     }
	//   }
	// }

	useEffect(() => {}, [campaigns])

	return (
		<Flex flexDirection="column" my={16}>
			<Text fontSize="3xl" fontWeight="bold">
				Campaigns
			</Text>

			<Flex sx={{ overflowX: 'auto' }} my={2}>
				{campaigns?.map((campaign, index: number) => (
					<Flex
						flexDirection="column"
						p={3}
						key={`${index}-${campaign.name}`}
						bg="teal"
						color="white"
						mt={2}
						borderRadius="md"
						mr={3}
					>
						<Text fontSize="md" fontWeight="bold">
							{campaign.name}
						</Text>
						<Text fontSize="sm" fontWeight="normal">
							Donated amount:{' '}
							{utils.format.formatNearAmount(campaign.donated_amount)} NEAR
						</Text>
						<Text fontSize="sm" fontWeight="normal">
							Target: {utils.format.formatNearAmount(campaign.target_amount)}{' '}
							NEAR
						</Text>
						<Button
							mt={4}
							colorScheme="whiteAlpha"
							onClick={() => {
								setLoading(true)
								if (campaign?.donate) {
									campaign.donate(
										{},
										'300000000000000',
										campaign.minimum_donation_amount
									)
									setLoading(false)
								}
							}}
						>
							{loading ? 'Loading...' : 'Donate'}
						</Button>
					</Flex>
				))}
			</Flex>
		</Flex>
	)
}
export default Donation
