import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { WalletConnection } from 'near-api-js'
import { useCallback, useEffect, useState } from 'react'
import { BiGlobe } from 'react-icons/bi'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
	selectCampaigns,
	setCampaigns,
} from '../app/slices/campaignFactorySlice'
import { selectWalletConnection } from '../app/slices/walletSlice'
import CampaignCard from '../components/Campaigns/CampaignCard'
import { getAllCampaignsOfAccountIdAsync, getKOLMetadataAsync } from '../models/contracts/campaign_factory_contract'

const KOLProfile = () => {
	const walletConnection = useAppSelector(selectWalletConnection)
	const dispatch = useAppDispatch()
	const { id: kolId } = useParams()
	const currentCampaigns = useAppSelector(selectCampaigns(kolId))

	const [KOLMetadata, setKOLMetadata] = useState<any>()

	const sellingItems = [
		{
			name: 'Niche huite',
			imageUrl:
				'https://a.1stdibscdn.com/wonner-paul-paintings-untitled-for-sale/22569652/a_96016121643784750158/Wonner4_master.jpg?disable=upscale&auto=webp&quality=60&width=1318',
		},
		{
			name: 'Nee stand',
			imageUrl:
				'https://image-cdn.artland.com/eyJidWNrZXQiOiJhcnRsYW5kLXVwbG9hZHMiLCJrZXkiOiJnYWxsZXJpZXMvY2tjM29uZXNhNTYxdjA3OTE3bmd3eDBmai9hcnR3b3Jrcy9hcnR3b3JrX2M3dGxqNzI4ZmhjczczdWE1NTIwL2ZlYXR1cmVkX2ltYWdlX2FydHdvcmtfYzd0bGo3MjhmaGNzNzN1YTU1MjBfMTY0Mzg2MjQyOC5qcGVnIiwiZWRpdHMiOnsianBlZyI6eyJxdWFsaXR5Ijo4MH0sInJvdGF0ZSI6bnVsbCwicmVzaXplIjp7IndpZHRoIjozMDAwLCJoZWlnaHQiOjMwMDAsImZpdCI6Imluc2lkZSJ9fX0=',
		},
		{
			name: 'Colorful',
			imageUrl:
				'https://image-cdn.artland.com/eyJidWNrZXQiOiJhcnRsYW5kLXVwbG9hZHMiLCJrZXkiOiJnYWxsZXJpZXMvY2tjM29uZXNhNTYxdjA3OTE3bmd3eDBmai9hcnR3b3Jrcy9hcnR3b3JrX2M3dGxqNzI4ZmhjczczdWE1NTIwL2FkZGl0aW9uYWxfaW1hZ2VfYXJ0d29ya19jN3RsajcyOGZoY3M3M3VhNTUyMF8wXzE2NDM4NjI0MjguanBlZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzAwMCwiaGVpZ2h0IjozMDAwLCJmaXQiOiJpbnNpZGUifX19',
		},
		{
			name: 'Chillin en',
			imageUrl:
				'https://image-cdn.artland.com/eyJidWNrZXQiOiJhcnRsYW5kLXVwbG9hZHMiLCJrZXkiOiJnYWxsZXJpZXMvY2tjM29uZXNhNTYxdjA3OTE3bmd3eDBmai9hcnR3b3Jrcy9hcnR3b3JrX2M3dGxpMnE4ZmhjczczdWE1NTFnL2FkZGl0aW9uYWxfaW1hZ2VfYXJ0d29ya19jN3RsaTJxOGZoY3M3M3VhNTUxZ18wXzE2NDM4NjIyODMuanBlZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzAwMCwiaGVpZ2h0IjozMDAwLCJmaXQiOiJpbnNpZGUifX19',
		},
		{
			name: 'Killin me',
			imageUrl:
				'https://image-cdn.artland.com/eyJidWNrZXQiOiJhcnRsYW5kLXVwbG9hZHMiLCJrZXkiOiJnYWxsZXJpZXMvY2tjM29uZXNhNTYxdjA3OTE3bmd3eDBmai9hcnR3b3Jrcy9hcnR3b3JrX2M3dGxpMnE4ZmhjczczdWE1NTFnL2FkZGl0aW9uYWxfaW1hZ2VfYXJ0d29ya19jN3RsaTJxOGZoY3M3M3VhNTUxZ18xXzE2NDM4NjIyODQuanBlZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzAwMCwiaGVpZ2h0IjozMDAwLCJmaXQiOiJpbnNpZGUifX19',
		},
		{
			name: 'Lwasa Had an Idea',
			imageUrl:
				'https://image-cdn.artland.com/eyJidWNrZXQiOiJhcnRsYW5kLXVwbG9hZHMiLCJrZXkiOiJnYWxsZXJpZXMvY2tjM29uZXNhNTYxdjA3OTE3bmd3eDBmai9hcnR3b3Jrcy9hcnR3b3JrX2M3dGxpMnE4ZmhjczczdWE1NTFnL2FkZGl0aW9uYWxfaW1hZ2VfYXJ0d29ya19jN3RsaTJxOGZoY3M3M3VhNTUxZ18yXzE2NDM4NjIyODUuanBlZyIsImVkaXRzIjp7ImpwZWciOnsicXVhbGl0eSI6ODB9LCJyb3RhdGUiOm51bGwsInJlc2l6ZSI6eyJ3aWR0aCI6MzAwMCwiaGVpZ2h0IjozMDAwLCJmaXQiOiJpbnNpZGUifX19',
		},
	]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const loadKOLMetadata = useCallback(async (walletConnection: WalletConnection, kolId: string) => {
		const metadata = await getKOLMetadataAsync(walletConnection, kolId)
		setKOLMetadata(metadata)
		console.log(metadata);
		
	}, [])

	const loadCampaigns = useCallback(async(walletConnection: WalletConnection, kolId: string) => {
		const kolCampaignInfos = await getAllCampaignsOfAccountIdAsync(
			walletConnection,
			kolId
		)
		dispatch(
			setCampaigns({
				kolId,
				campaigns: kolCampaignInfos,
			})
		)
	}, [dispatch])

	useEffect(() => {
		if (walletConnection && kolId) {
			loadKOLMetadata(walletConnection, kolId)
			loadCampaigns(walletConnection, kolId)
		}
	}, [dispatch, walletConnection, kolId, loadCampaigns, loadKOLMetadata])

	return (
		<Box>
			{/* User avatar */}
			<Flex flexDirection="column">
				<Box
					maxHeight="200"
					height="200"
					bg="#d5ccc0"
					width="100%"
					position="relative"
					overflow="hidden"
				>
					<Image
						src="/images/default_kol_cover_1.png"
						position="absolute"
						height="250"
						top="0"
						left="calc(50% - 400px)"
					/>
					<Image
						src="/images/default_kol_cover_2.png"
						position="absolute"
						height="250"
						top="0"
						left="calc(50% + 250px)"
					/>
				</Box>
				<Flex
					flexDirection="column"
					alignItems="center"
					position="relative"
					zIndex={101}
				>
					<Box
						bgImg="/images/default_kol_avatar.jpg"
						bgPosition="center"
						bgSize="cover"
						height="80px"
						maxHeight="80"
						width="80px"
						maxWidth="80"
						borderRadius="50%"
						mt="-40px"
					></Box>
					<Text fontSize={['2xl', '4xl']}>{kolId}</Text>
				</Flex>
			</Flex>

			{/* Social links */}
			<Flex
				justifyContent="center"
				mt={3}
				color="gray.500"
				sx={{ '& > *:not(:first-of-type)': { ml: 5 } }}
				px={[4, 3, 2, 0]}
			>
				<BiGlobe size={24} />
				<FaTwitter size={24} />
				<FaFacebook size={24} />
			</Flex>

			{/* Achievements */}
			<Flex
				justifyContent="center"
				mx="auto"
				mt={12}
				color="gray.500"
				sx={{ '& > *:not(:first-of-type)': { ml: [16, 32] } }}
				maxWidth="800"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Flex flexDirection="column">
					<Text fontSize={['lg', 'xl']}>Volume</Text>
					<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
						1000 NEAR
					</Text>
				</Flex>

				{/* Rewarded points are in my account */}
				{/* <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Điểm thưởng</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">100,000 đ</Text>
          </Flex> */}
				<Flex flexDirection="column">
					<Text fontSize={['lg', 'xl']}>Campaigns</Text>
					<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
						{currentCampaigns?.length ?? 0}
					</Text>
				</Flex>
			</Flex>

			{/* Bio description */}
			<Flex
				justifyContent="center"
				textAlign="center"
				mx="auto"
				mt={8}
				color="gray.500"
				maxWidth="800"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit nobis
				error animi iusto. Hic maiores laboriosam, in adipisci, odio ea eum at
				iste dolorem non aspernatur asperiores, rerum dolores omnis?
			</Flex>

			{/* Campaigns */}
			<Flex
				justifyContent="center"
				flexDirection="column"
				mx="auto"
				my={24}
				maxWidth="984"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
					Campaigns
				</Text>
				<Flex sx={{ '& > *:not(:first-of-type)': { ml: [12, 24] } }} mt={4}>
					{!currentCampaigns &&
						[...Array(3)].map((_, index) => (
							<Flex
								flexDirection="column"
								width="250px"
								minWidth="250px"
								height="250px"
								minHeight="250px"
								borderRadius="md"
								border="1px solid"
								borderColor="lightgray"
								key={index}
							>
								<Box
									bg="#d5ccc0"
									width="100%"
									height="150px"
									minHeight="150px"
									borderTopRadius="md"
								></Box>
								<Text p={3}>Loading...</Text>
							</Flex>
						))}
					{currentCampaigns?.map((campaign) => (
						<Link to={`/campaigns/${campaign.name}`} key={campaign.name}>
							<CampaignCard campaignInfo={campaign} />
						</Link>
					))}
				</Flex>
			</Flex>

			{/* About KOL */}
			<Flex
				justifyContent="center"
				flexDirection="column"
				my={24}
				mx="auto"
				maxWidth="984"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
					About
				</Text>
				<Flex
					position="relative"
					mt={4}
					height="560px"
					bgImg="linear-gradient(to bottom right, #4e353b, #e9c27a)"
					borderRadius="md"
					overflow="hidden"
				>
					<Image
						src="/images/default_kol_about.png"
						maxH="480px"
						position="absolute"
						top="80px"
						right="0"
						zIndex="101"
						display={['none', 'block']}
					/>
					<Text
						fontSize={['7xl', '9xl']}
						color="transparent"
						fontWeight="medium"
						p={3}
						textShadow="1px 1px 1px black"
						textTransform="uppercase"
						position="absolute"
						top="-5"
						right="28px"
						zIndex="100"
						opacity="0.5"
					>
						Platz
					</Text>

					<Text
						fontSize={['3xl', '4xl']}
						color="white"
						fontWeight="medium"
						p={3}
						position="absolute"
						top="20%"
						left="10%"
						zIndex="100"
					>
						Hi! I'm
					</Text>
					<Text
						fontSize={['2xl', '4xl', '5xl']}
						color="#e9d0b1"
						fontWeight="bold"
						p={3}
						position="absolute"
						top="27%"
						left="10%"
						zIndex="100"
						letterSpacing="wider"
					>
						{kolId}
					</Text>
					<Text
						fontSize={['lg', 'xl']}
						color="white"
						fontWeight="medium"
						p={3}
						position="absolute"
						top="50%"
						left="10%"
						zIndex="100"
						maxWidth="420px"
						textOverflow="nowrap"
					>
						Artist, influencer, troublemaker, streamer... I like creative stuff.
						Dedicated to bringing joy to the community.
					</Text>
				</Flex>
			</Flex>

			<Flex
				justifyContent="center"
				flexDirection="column"
				my={24}
				mx="auto"
				maxWidth="984"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
					VR Liveshows
				</Text>
				<iframe
					width="auto"
					height="680px"
					src="https://www.youtube.com/embed/yoyf00nWASY"
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</Flex>

			<Flex
				justifyContent="center"
				flexDirection="column"
				my={10}
				mx="auto"
				maxWidth="984"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
					VR Gallery
				</Text>
				<iframe
					title="vr-gallery"
					src="https://embed.artland.com/shows/jesse-wright-reverie-c7tl8li8fhcs73ua54ug"
					width="auto"
					height="680px"
					frameBorder="0"
					scrolling="on"
					allowFullScreen={true}
				></iframe>
			</Flex>

			<Flex
				justifyContent="center"
				flexDirection="column"
				my={24}
				mx="auto"
				maxWidth="984"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
					Items
				</Text>
			</Flex>
			<Flex
				justifyContent="center"
				flexDirection="column"
				my={24}
				mx="auto"
				maxWidth="984"
				overflow="auto"
				px={[4, 3, 2, 0]}
			>
				<Flex flexDirection="row">
					{sellingItems.map(({ name, imageUrl }) => (
						<Flex
							flexDirection="column"
							width="250px"
							minWidth="250px"
							height="250px"
							minHeight="250px"
							borderRadius="md"
							border="1px solid"
							borderColor="lightgray"
							key={name}
						>
							<Box
								bg="#d5ccc0"
								width="100%"
								height="150px"
								minHeight="150px"
								borderTopRadius="sm"
								overflow="hidden"
							>
								<Image src={imageUrl}></Image>
							</Box>
							<Text p={3}>{name}</Text>
						</Flex>
					))}
				</Flex>
			</Flex>
			{/* Donation history */}
			{/* <Flex justifyContent="center" flexDirection="column" mx="auto" my={16} maxWidth="984" overflow="auto">
        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">Lịch sử quyên góp</Text>
        <Flex mt={4} flexDirection="column">
          <Flex sx={{ '& > *:not(:first-of-type)': { ml: [8, 12] }}} px={8} alignItems="center" color="gray.500">
              <Text width="25%">Tài khoản</Text>
              <Text width="25%">Số lượng</Text>
              <Text width="25%">Thời gian</Text>
              <Text width="25%">Chi tiết</Text>
          </Flex>
          <Flex sx={{ '& > *:not(:first-of-type)': { ml: [8, 12] }}} p={8} _hover={{ bg: 'gray.100' }} alignItems="center" borderBottom="1px solid" borderColor="gray.200">
              <Text width="25%">Fan #1</Text>
              <Text width="25%">1 NEAR</Text>
              <Text width="25%">1 ngày trước</Text>
              <Box width="25%">
                <ExternalLinkIcon />
              </Box>
          </Flex>
          <Flex sx={{ '& > *:not(:first-of-type)': { ml: [8, 12] }}} p={8} _hover={{ bg: 'gray.100' }} alignItems="center" borderBottom="1px solid" borderColor="gray.200">
              <Text width="25%">Fan #2</Text>
              <Text width="25%">1 NEAR</Text>
              <Text width="25%">2 ngày trước</Text>
              <Box width="25%">
                <ExternalLinkIcon />
              </Box>
          </Flex>
        </Flex>
      </Flex> */}
		</Box>
	)
}
export default KOLProfile
