import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import BN from 'bn.js';
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectWalletConnection } from '../app/slices/walletSlice'
import { CampaignContract, donateAsync, getCampaignContract, getCampaignContractInfoAsync } from '../models/contracts/campaign_contract'
import { utils } from 'near-api-js'
import { CampaignInfo } from '../models/types';
import { getTopDonorsAsync, TopDonorsResponse } from '../services/campaigns';
import ProgressBar from '../components/ProgressBar';

const Campaign = () => {
  const walletConnection = useAppSelector(selectWalletConnection)
  const { campaignAccountId } = useParams()
  const [campaignContract, setCampaignContract] = useState<CampaignContract | undefined>(undefined)
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo | undefined>(undefined)
  const [topDonors, setTopDonors] = useState<TopDonorsResponse[] | undefined>(undefined)

  useEffect(() => {
    if (walletConnection && campaignAccountId) {
      const contract = getCampaignContract(walletConnection, campaignAccountId)
      setCampaignContract(contract)
    }
  }, [walletConnection, campaignAccountId])

  useEffect(() => {
    const getInfo = async () => {
      if (campaignContract) {
        const info = await getCampaignContractInfoAsync(campaignContract)
        setCampaignInfo(info)
      }
    }
    getInfo()
  }, [campaignContract])

  useEffect(() => {
    const getTopDonors = async () => {
      if (campaignAccountId) {
        const donors = await getTopDonorsAsync(campaignAccountId)
        setTopDonors(donors)
      }
    }
    getTopDonors()
  }, [campaignAccountId])

  const donate = useCallback(async (donationAmount: string) => {
    if (campaignContract) {
      await donateAsync(campaignContract, new BN(donationAmount))
    }
  }, [campaignContract])

  return (
    <Box>

      {/* Campaign info */}
      <Flex flexDirection="column" mt={16}>
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize={['2xl', '4xl']} fontWeight="semibold">{campaignAccountId}</Text>
          <Flex mt={2}>
            <Text fontSize={['xs', 'sm']} px={4} py={1} bg="yellow.300" borderRadius={"md"} fontWeight="semibold">🔥 Nổi bật</Text>
            <Text fontSize={['xs', 'sm']} px={4} py={1} bg="purple.300" borderRadius={"md"} fontWeight="semibold" ml={3}>🎵 Âm nhạc</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Achievements */}
      {!!campaignInfo && (
        <Flex maxWidth="984" mx="auto" mb={4}  mt={12}>
            <ProgressBar current={parseInt(utils.format.formatNearAmount(campaignInfo.donated_amount, 0))} total={parseInt(utils.format.formatNearAmount(campaignInfo.target_amount, 0))} />
        </Flex>
      )}
      <Flex justifyContent="center" color="gray.500" sx={{ '& > *:not(:first-of-type)': { ml: [16, 32] } }} overflow="auto">
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
          {campaignInfo?.donated_amount && <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">{utils.format.formatNearAmount(campaignInfo.donated_amount, 2)} NEAR</Text>}
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize={['lg', 'xl']}>Mục tiêu</Text>
          {campaignInfo?.target_amount && <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">{utils.format.formatNearAmount(campaignInfo.target_amount, 2)} NEAR</Text>}
        </Flex>
      </Flex>

      {/* Bio description */}
      <Flex justifyContent="center" mx="auto" flexDirection="column" alignItems="center" maxWidth="800" mt={12}>
          <Box bgImg="/images/default_kol_avatar.jpg" bgPosition="center" bgSize="cover" height="80px" maxHeight="80" width="80px" maxWidth="80" borderRadius="50%"></Box>
          <Link to={`/kols/${campaignInfo?.campaign_beneficiary}`}>
            <Text Text fontSize={['xl', '2xl']}>{campaignInfo?.campaign_beneficiary}</Text>
          </Link>
        </Flex>
      <Flex justifyContent="center" textAlign="center" mx="auto" mt={6} color="gray.500" maxWidth="800" overflow="auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit nobis error animi iusto. Hic maiores laboriosam, in adipisci, odio ea eum at iste dolorem non aspernatur asperiores, rerum dolores omnis?
      </Flex>

      {/* Cover */}
      <Flex justifyContent="center" flexDirection="column" mx="auto" mt={12} mb={24} maxWidth="984" overflow="hidden" borderRadius="md">
        <Image src="/images/default_campaign_cover.png" maxH={460} objectFit="cover" objectPosition="center" />
      </Flex>

      {/* Donate */}
      <Flex justifyContent="center" flexDirection="column" my={24} mx="auto" maxWidth="984" overflow="auto" >
        <Text fontSize={['2xl', '3xl']} color="black" fontWeight="semibold">Ủng hộ</Text>
        <Flex mt={4} flexDirection="column">
          <Flex width="100%" borderRadius="md" border="1px solid rgba(255, 122, 0, .5)" overflow="hidden" mb={3}>
            <Flex flex="0 1 60%" bg="rgba(255, 122, 0, .5)">
              <Image src="/images/default_campaign_1.png" maxW={'60%'} objectFit="cover" objectPosition="center" mx="auto" />
            </Flex>
            <Flex flex="1 1 auto" flexDirection="column">
              <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                <Text color="#cd7f32" fontSize="xl">Supporter</Text>
                <Text fontSize="4xl" fontWeight="semibold">1 NEAR</Text>
              </Flex>
              <Flex p={3} height="150px" flexDirection="column" fontSize="lg" fontWeight="medium">
                <Text>🎶 Badge NFT</Text>
                <Text mt={2}>🎧 Hall of Mention</Text>
              </Flex>
              <Flex mt="auto">
                <Button variant="solid" type="button" backgroundColor="rgba(255, 122, 0, .5)" my={4} width="calc(100% - 24px)" mx="auto" color="black" onClick={() => donate("1000000000000000000000000")}>Tiếp tục</Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="100%" border="1px solid" borderColor="gray.100" borderRadius="md" overflow="hidden" mb={3}>
            <Flex flex="1 1 auto" flexDirection="column">
              <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                <Text color="gray.600" fontSize="xl">Fan chân chính</Text>
                <Text fontSize="4xl" fontWeight="semibold">5 NEAR</Text>
              </Flex>
              <Flex p={3} height="150px" flexDirection="column" fontSize="lg" fontWeight="medium">
                <Text>🎶 Badge NFT</Text>
                <Text mt={2}>🎧 Hall of Mention</Text>
                <Text mt={2}>⚡ Video đặc biệt</Text>
              </Flex>
              <Flex mt="auto">
                <Button variant="solid" type="button" backgroundColor="gray.100" my={4} width="calc(100% - 24px)" mx="auto" color="black" onClick={() => donate("5000000000000000000000000")}>Tiếp tục</Button>
              </Flex>
            </Flex>
            <Flex flex="0 1 60%" bg="gray.100">
              <Image src="/images/default_campaign_2.png" maxW={'60%'} objectFit="cover" objectPosition="center" mx="auto" />
            </Flex>
          </Flex>
          <Flex width="100%" border="1px solid rgba(255, 223, 142, .5)" borderRadius="md" overflow="hidden" mb={3}>
            <Flex flex="0 1 60%" bg="rgba(255, 223, 142, .5)" py={5}>
              <Image src="/images/default_campaign_3.png" maxW={'60%'} objectFit="cover" objectPosition="center" mx="auto" />
            </Flex>
            <Flex flex="1 1 auto" flexDirection="column">
              <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                <Text color="goldenrod" fontSize="xl">Fan hardcore</Text>
                <Text fontSize="4xl" fontWeight="semibold">10 NEAR</Text>
              </Flex>
              <Flex p={3} height="150px" flexDirection="column" fontSize="lg" fontWeight="medium">
                <Text>🎶 Badge NFT</Text>
                <Text mt={2}>🎧 Hall of Mention</Text>
                <Text mt={2}>⚡ Video đặc biệt</Text>
                <Text mt={2}>😋 5p meeting gặp gỡ</Text>
              </Flex>
              <Flex mt="auto">
                <Button variant="solid" backgroundColor="rgba(255, 223, 142, .5)" my={4} width="calc(100% - 24px)" mx="auto" color="black" type="button" onClick={() => donate("10000000000000000000000000")}>Tiếp tục</Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="100%" border="1px solid" borderColor="linear-gradient(to bottom, #000000, #934FB8)" borderRadius="md" overflow="hidden" mb={3}>
            <form
              onSubmit={(e: any) => {
                e.preventDefault()
                donate(utils.format.parseNearAmount(e.target.donation.value) ?? "1000000000000000000000000")
              }}
            >
              <Flex flex="1 1 auto" flexDirection="column" height="100%">
                <Flex p={3} justifyContent="space-between" fontWeight="medium" alignItems="center">
                  <Text color="gray.600" fontSize="xl">Fan tự quyết</Text>
                  <Text fontSize="4xl" fontWeight="semibold" color="linear-gradient(to bottom, #000000, #934FB8)">??? NEAR</Text>
                </Flex>
                <Flex p={3} height="150px" maxWidth="100%" flexDirection="column" fontSize="sm" fontWeight="medium">
                  <Text fontSize="md" maxWidth="100%" mb={5}>Dựa vào số lượng ủng hộ, bạn sẽ nhận được những món quà phù hợp</Text>
                  <Input placeholder="Nhập số lượng ủng hộ" width="100%" type="number" name="donation" min={1} py={3} />
                  <Text fontSize="xs" mt={2}>* Vui lòng nhập ít nhất 1 NEAR</Text>
                </Flex>
                <Flex mt="auto">
                  <Button variant="solid" type="submit" backgroundColor="#934FB8" my={4} width="calc(100% - 24px)" mx="auto" color="white">Tiếp tục</Button>
                </Flex>
              </Flex>
            </form>
            <Flex flex="0 1 60%" bg="linear-gradient(to bottom, #000000, #934FB8)">
              <Image src="/images/default_campaign_4.png" maxW={'60%'} objectFit="cover" objectPosition="center" mx="auto" />
            </Flex>
          </Flex>

        </Flex>
      </Flex>

      {/* Top donors */}
      {!!topDonors && Boolean(topDonors?.length > 0) && (
      <Flex justifyContent="center" flexDirection="column" my={24} mx="auto" maxWidth="984" overflow="auto" >
        <Text fontSize={['2xl', '3xl']} color="black" fontWeight="semibold">Fan cứng</Text>
        <Flex flexDirection="column" maxWidth="100%" maxHeight={600} overflow="auto" py={3}>
          <Flex justifyContent="space-between">
                <Flex flex="1 1 60%">
                  <Text fontSize="lg" fontWeight="light" color="black">Tài khoản</Text>
                </Flex>
                <Flex flex="1 1 40%">
                  <Text fontSize="lg" fontWeight="light" color="black">Ủng hộ</Text>
                </Flex>
          </Flex>
          {topDonors.map((donor: TopDonorsResponse) => (
            <Flex key={donor.signer_account_id} justifyContent="space-between" py={3} borderBottom="1px solid" borderColor="lightgray">
                <Flex flex="1 1 60%">
                  <Text fontSize="lg" fontWeight="medium" color="black">{donor.signer_account_id}</Text>
                </Flex>
                <Flex flex="1 1 40%">
                  <Text fontSize="lg" fontWeight="medium" color="black">{utils.format.formatNearAmount(donor.total_donation_amount, 2)} NEAR</Text>
                </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      )}
    </Box>
  )
}

export default Campaign
