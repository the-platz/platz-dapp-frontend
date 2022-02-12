import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import BN from 'bn.js';
import { useCallback, useEffect } from 'react'
import { FaCalendar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectWalletConnection } from '../app/slices/walletSlice'
import { donateAsync, getCampaignContract } from '../models/contracts/campaign_contract'

const Campaign = () => {
  const walletConnection = useAppSelector(selectWalletConnection)
  const { campaignAccountId } = useParams()

  // const donate = useCallback(async(donationAmount: string) => {
  //   if (walletConnection && campaignAccountId) {
  //     const campaignContract = getCampaignContract(walletConnection, campaignAccountId)
  //     await donateAsync(campaignContract, new BN(donationAmount))
  //   }
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     donate("5000000000000000000000000")
  //   }, 4000)
  // }, [donate])

  return (
    <Box>

     {/* Campaign info */}
     <Flex flexDirection="column" mt={16}>
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize={['2xl', '4xl']} fontWeight="semibold">Hát Cùng Platz</Text>
          <Flex mt={2}>
            <Text fontSize={['xs', 'sm']} px={4} py={1} bg="yellow.300" borderRadius={"md"} fontWeight="semibold">🔥 Nổi bật</Text>
            <Text fontSize={['xs', 'sm']} px={4} py={1} bg="purple.300" borderRadius={"md"} fontWeight="semibold" ml={3}>🎵 Âm nhạc</Text>
          </Flex>
        </Flex>
     </Flex>

     {/* Achievements */}
      <Flex justifyContent="center" mx="auto" mt={12} color="gray.500" sx={{ '& > *:not(:first-child)': { ml: [16, 32] }}} maxWidth="984" overflow="auto">
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Bắt đầu</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">15/01/2022</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Kết thúc</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">15/02/2022</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Tổng quyên góp</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">100 NEAR</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Mục tiêu</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">300 NEAR</Text>
          </Flex>
      </Flex>

      {/* Bio description */}
      <Flex justifyContent="center" textAlign="center" mx="auto" mt={8} color="gray.500" maxWidth="800" overflow="auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit nobis error animi iusto. Hic maiores laboriosam, in adipisci, odio ea eum at iste dolorem non aspernatur asperiores, rerum dolores omnis?
      </Flex>

      {/* Cover */}
      <Flex justifyContent="center" flexDirection="column" mx="auto" mt={12} mb={24} maxWidth="984" overflow="hidden" borderRadius="md">
        <Image src="/images/default_campaign_cover.png" maxH={460} objectFit="cover" objectPosition="center" />
      </Flex>

      {/* Donate */}
      <Flex justifyContent="center" flexDirection="column" my={24} mx="auto" maxWidth="984" overflow="auto" >
        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">Ủng hộ</Text>
        <Flex mt={4} flexDirection="column">
            <Flex width="100%" borderColor="#cd7f32" borderRadius="md" overflow="hidden" mb={3}>
                <Flex flex="0 1 60%" bg="#cd7f32">
                  {/* Add image */}
                </Flex>
                <Flex flex="1 1 auto" flexDirection="column">
                  <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                    <Text color="#cd7f32">Supporter</Text>
                    <Text fontSize="xl" fontWeight="semibold">1 NEAR</Text>
                  </Flex>
                  <Flex p={3} height="150px" flexDirection="column" fontSize="sm" fontWeight="medium">
                    <Text>🎶 Badge NFT</Text>
                    <Text mt={2}>🎧 Hall of Mention</Text>
                  </Flex>
                  <Flex>
                    <Button variant="solid" backgroundColor="#cd7f32" my={4} width="calc(100% - 24px)" mx="auto" color="black">Tiếp tục</Button>
                  </Flex>
                </Flex>
            </Flex>
            <Flex width="100%" borderColor="gray.300" borderRadius="md" overflow="hidden" mb={3}>
                <Flex flex="1 1 auto" flexDirection="column">
                  <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                    <Text color="gray.600">Fan chân chính</Text>
                    <Text fontSize="xl" fontWeight="semibold">5 NEAR</Text>
                  </Flex>
                  <Flex p={3} height="150px" flexDirection="column" fontSize="sm" fontWeight="medium">
                    <Text>🎶 Badge NFT</Text>
                    <Text mt={2}>🎧 Hall of Mention</Text>
                    <Text mt={2}>⚡ Video đặc biệt</Text>
                  </Flex>
                  <Flex>
                    <Button variant="solid" backgroundColor="gray.300" my={4} width="calc(100% - 24px)" mx="auto" color="black">Tiếp tục</Button>
                  </Flex>
                </Flex>
                <Flex flex="0 1 60%" bg="gray.300">
                  {/* Add image */}
                </Flex>
            </Flex>
            <Flex width="100%" borderColor="gold" borderRadius="md" overflow="hidden" mb={3}>
                <Flex flex="0 1 60%" bg="gold">
                  {/* Add image */}
                </Flex>
                <Flex flex="1 1 auto" flexDirection="column">
                  <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                    <Text color="#FFD700">Fan hardcore</Text>
                    <Text fontSize="xl" fontWeight="semibold">10 NEAR</Text>
                  </Flex>
                  <Flex p={3} height="150px" flexDirection="column" fontSize="sm" fontWeight="medium">
                    <Text>🎶 Badge NFT</Text>
                    <Text mt={2}>🎧 Hall of Mention</Text>
                    <Text mt={2}>⚡ Video đặc biệt</Text>
                    <Text mt={2}>😋 5p meeting gặp gỡ</Text>
                  </Flex>
                  <Flex>
                    <Button variant="solid" backgroundColor="#FFD700" my={4} width="calc(100% - 24px)" mx="auto" color="black">Tiếp tục</Button>
                  </Flex>
                </Flex>
            </Flex>
            <Flex width="100%" borderColor="gray.300" borderRadius="md" overflow="hidden" mb={3}>
              <form>
                <Flex flex="1 1 auto" flexDirection="column">
                  <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                    <Text color="gray.600">Fan tự quyết</Text>
                    <Text fontSize="xl" fontWeight="semibold">??? NEAR</Text>
                  </Flex>
                  <Flex p={3} height="150px" maxWidth="100%" flexDirection="column" fontSize="sm" fontWeight="medium">
                    <Text fontSize="xs" mb={2}>Dựa vào số lượng ủng hộ, bạn sẽ nhận được những món quà phù hợp</Text>
                    <Input placeholder="Nhập số lượng ủng hộ" width="100%" type="number" />
                  </Flex>
                  <Flex>
                    <Button variant="solid" backgroundColor="gray.300" my={4} width="calc(100% - 24px)" mx="auto" color="black">Tiếp tục</Button>
                  </Flex>
                </Flex>
              </form>
              <Flex flex="0 1 60%" bg="gray.300">
                  {/* Add image */}
              </Flex>
            </Flex>

        </Flex>
      </Flex>

      {/* About KOL */}
      <Flex justifyContent="center" flexDirection="column" my={24} mx="auto" maxWidth="984" overflow="auto" >
        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">Giới thiệu</Text>

      </Flex>
   </Box>
  )
}

export default Campaign
