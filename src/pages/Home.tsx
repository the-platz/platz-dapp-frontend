import {
	Box,
	Button,
	Flex,
	Image,
	Text,
	VStack,
	Radio,
	RadioGroup,
	Stack,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
// import Donation from "./Donate";
import KOLList from '../components/KOLList/KOLList'

// const COLOR_PRIMARY = '#9F7E69'
const COLOR_PRIMARY = 'orange'
const COLOR_NEUTRAL_LIGHT = '#414141'

const HomePage: React.FC<any> = () => {
	return (
		<Box
			bg="linear-gradient(to bottom,#f5efe6, white)"
			height="calc(100% - 64px)"
		>
			<Box px={4} py={12} maxWidth="1280" mx="auto">
				<Flex>
					<Flex flexDirection="column" maxWidth="564px" align="flex-start">
						<Text
							fontSize={['3xl', '5xl']}
							fontWeight="bold"
							lineHeight={'50px'}
							mt={12}
							mb={6}
						>
							Donate, collect, and earn NFTs from KOLs
						</Text>
						<Text
							fontSize={['lg', 'xl']}
							maxWidth={['100%', '80%']}
							fontWeight="normal"
							color={COLOR_NEUTRAL_LIGHT}
						>
							The Platz is the Web3's first decentralized crowdfunding-verse.
						</Text>

						<Flex alignItems="center" style={{ marginTop: '48px' }}>
							<Button
								bg={COLOR_PRIMARY}
								borderRadius="16px"
								rightIcon={<ChevronRightIcon />}
								color="white"
								size="md"
							>
								<Text fontSize="sm">Explore</Text>
							</Button>
							<Text
								fontSize="xs"
								fontWeight="light"
								ml={5}
								color={COLOR_NEUTRAL_LIGHT}
							>
								Donate NEAR and receive extraordinary rewards!
							</Text>
						</Flex>

						<Link style={{ marginTop: '72px' }} to="/">
							<Text fontSize="sm" color={COLOR_PRIMARY} fontWeight="semibold">
								Learn more about The Platz
							</Text>
						</Link>
					</Flex>

					<VStack
						flexDirection="column"
						mx="auto"
						width="100%"
						position="relative"
						display={['none', 'flex']}
					>
						<Box
							borderRadius="12px"
							overflow="hidden"
							zIndex="100"
							position="relative"
							_before={{
								content: `""`,
								position: 'absolute',
								zIndex: 99,
								top: '0',
								left: '0',
								width: '516px',
								height: '424px',
								borderRadius: '12px',
								bg: 'linear-gradient(to bottom, #ece7ce, lightgray)',
								overflow: 'hidden',
							}}
						>
							<Image
								src="/images/default_home_4.jpg"
								objectFit="cover"
								boxSize="516"
								position="relative"
								zIndex="101"
							/>
							<Flex
								position="absolute"
								sx={{
									bottom: 0,
									width: '100%',
									height: '102px',
									borderBottomLeftRadius: '12px',
									borderBottomRightRadius: '12px',
									bg: 'white',
								}}
								bg="white"
								justifyContent="space-between"
								alignItems="center"
								p={6}
								zIndex="101"
							>
								<Text fontSize="2xl" fontWeight="semibold">
									3 NEAR
								</Text>
								<Button
									size="lg"
									bg={COLOR_PRIMARY}
									borderRadius={'12px'}
									color="white"
								>
									Donate now
								</Button>
							</Flex>
						</Box>
						<RadioGroup colorScheme={COLOR_PRIMARY} defaultValue="1" size="md">
							<Stack direction="row">
								<Radio value="1" bg={COLOR_PRIMARY}></Radio>
								<Radio value="2"></Radio>
								<Radio value="3"></Radio>
							</Stack>
						</RadioGroup>
					</VStack>
				</Flex>

				<KOLList />
			</Box>
		</Box>
	)
}

export default HomePage
