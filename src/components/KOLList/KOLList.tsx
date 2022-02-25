import { Flex, Image } from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { selectListKOL } from '../../app/slices/campaignFactorySlice'

import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const KOLList = () => {
	const listKOL = useAppSelector(selectListKOL)

	return (
		<Flex flexDirection="column" my={16}>
			<Text fontSize={['2xl', '3xl']} fontWeight="bold">
				Top Influencers
			</Text>
			<Flex
				sx={{
					overflowX: 'auto',
					'& > *:not(:first-of-type)': { ml: [4, 8] },
				}}
				my={2}
			>
				{listKOL?.map((kol) => (
					<Link to={`/kols/${kol.name}`} key={kol.name}>
						<Flex
							height="320px"
							width="250px"
							borderRadius="md"
							flexDirection="column"
							overflow="hidden"
							border="1px solid gray"
							p={2}
						>
							<Image
								src="/images/default_home_5.jpg"
								objectFit="cover"
								boxSize="250"
							/>
							<Flex flexDirection="column" p={2}>
								<Text fontWeight="semibold">{kol.name}</Text>
								{/* <Text fontWeight="medium" fontSize="sm">300 NEAR</Text> */}
							</Flex>
						</Flex>
					</Link>
				))}
			</Flex>
		</Flex>
	)
}

export default KOLList
