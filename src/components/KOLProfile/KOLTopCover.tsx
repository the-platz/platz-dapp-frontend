import { Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { BiGlobe } from 'react-icons/bi'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCampaigns } from '../../app/slices/campaignFactorySlice'
import { formatNearAmount, getTotalDonationAmountOfCampaigns } from '../../utils'

type IKOLTopCoverProps = {
    kolId: string
}

const KOLTopCover: FC<IKOLTopCoverProps> = ({ kolId }) => {
    const currentCampaigns = useAppSelector(selectCampaigns(kolId))
    
    useEffect(() => {
        console.log(kolId)
        console.log(currentCampaigns);
    }, [])

    return (
        <Skeleton isLoaded={kolId !== undefined}>
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
                    <Skeleton isLoaded={kolId !== undefined}>
                        <Text fontSize={['2xl', '4xl']}>{kolId}</Text>
                    </Skeleton>
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

            {/* Achievements */}
            <Flex
                justifyContent="center"
                mx="auto"
                mt={6}
                color="gray.500"
                sx={{ '& > *:not(:first-of-type)': { ml: [8, 16] } }}
                maxWidth="800"
                overflow="auto"
                px={[4, 3, 2, 0]}
            >
                <Flex flexDirection="column">
                    <Text fontSize={['lg', 'xl']}>Fund received</Text>
                    <Skeleton isLoaded={currentCampaigns !== undefined}>
                        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
                            {formatNearAmount(getTotalDonationAmountOfCampaigns(currentCampaigns || []))} NEAR
                        </Text>
                    </Skeleton>
                </Flex>

                <Flex flexDirection="column">
                    <Text fontSize={['lg', 'xl']}>Total Campaigns</Text>
                    <Skeleton isLoaded={currentCampaigns !== undefined}>
                        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">
                            {currentCampaigns?.length || 0}
                        </Text>
                    </Skeleton>
                </Flex>
            </Flex>
        </Skeleton>
    )
}

export default KOLTopCover