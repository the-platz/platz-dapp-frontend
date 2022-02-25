import { FC } from "react"
import { Box, Image, Badge } from '@chakra-ui/react'
import { KOLWork } from "../../models/types/kol_metadata_v1"

type IWorkV1CardProps = {
    metadata: KOLWork
}

const WorkCardV1: FC<IWorkV1CardProps> = ({ metadata }) => {
    return (
		<Box
			maxW='sm'
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'>
			<Image src={metadata.uri} />
			<Box p='6'>
				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					isTruncated
				>
					{metadata.title}
					<Badge borderRadius='full' px='2' colorScheme='teal' ml={2}>
						{metadata.type}
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
						Published on: {metadata.published_on}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default WorkCardV1