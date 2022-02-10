import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { BiGlobe } from "react-icons/bi"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"

const KOLProfile = () => {
  return (
   <Box>

     {/* User avatar */}
     <Flex flexDirection="column">
       <Box maxHeight="200" height="200" bg="#d5ccc0" width="100%" position="relative" overflow="hidden">
          <Image src="/images/default_kol_cover_1.png" position="absolute" height="250" top="0" left="calc(50% - 400px)" />
          <Image src="/images/default_kol_cover_2.png" position="absolute" height="250" top="0" left="calc(50% + 250px)" />
       </Box>
        <Flex flexDirection="column" alignItems="center" position="relative" zIndex={101}>
          <Box bgImg="/images/default_kol_avatar.jpg" bgPosition="center" bgSize="cover" height="80px" maxHeight="80" width="80px" maxWidth="80" borderRadius="50%" mt="-40px"></Box>
          <Text fontSize={['2xl', '4xl']}>Miss Platz</Text>
        </Flex>
     </Flex>

     {/* Social links */}
     <Flex justifyContent="center" mt={3} color="gray.500" sx={{ '& > *:not(:first-child)': { ml: 5 }}}>
       <BiGlobe size={24} />
       <FaTwitter size={24} />
       <FaFacebook size={24} />
     </Flex>

     {/* Achievements */}
      <Flex justifyContent="center" mx="auto" mt={12} color="gray.500" sx={{ '& > *:not(:first-child)': { ml: [16, 32] }}} maxWidth="800" overflow="auto">
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Tổng quyên góp</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">100,000,000 đ</Text>
          </Flex>

          {/* Rewarded points are in my account */}
          {/* <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Điểm thưởng</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">100,000 đ</Text>
          </Flex> */}
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Campaigns</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">10</Text>
          </Flex>
      </Flex>

      {/* Bio description */}
      <Flex justifyContent="center" textAlign="center" mx="auto" mt={8} color="gray.500" maxWidth="800" overflow="auto">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit nobis error animi iusto. Hic maiores laboriosam, in adipisci, odio ea eum at iste dolorem non aspernatur asperiores, rerum dolores omnis?
      </Flex>

      {/* Campaigns */}
      <Flex justifyContent="center" flexDirection="column" mx="auto" my={24} maxWidth="984" overflow="auto">
        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">Campaigns</Text>
        <Flex sx={{ '& > *:not(:first-child)': { ml: [12, 24] }}} mt={4}>
          <Link to="/campaigns/1">
            <Flex flexDirection="column" width="250px" minWidth="250px" height="200px" minHeight="200px" borderRadius="md" overflow="hidden">
              <Box bg="#d5ccc0" width="250px" minWidth="250px" height="150px" minHeight="150px"></Box>
              <Text fontWeight="medium" p={3}>Campaign</Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>

      {/* About KOL */}
      <Flex justifyContent="center" flexDirection="column" my={24} mx="auto" maxWidth="984" overflow="auto" >
        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">Giới thiệu</Text>
        <Flex position="relative" mt={4} height="560px" bgImg="linear-gradient(to bottom right, #4e353b, #e9c27a)" borderRadius="md" overflow="hidden">
          <Image src="/images/default_kol_about.png" maxH="480px" position="absolute" top="80px" right="0" zIndex="101" />
          <Text fontSize={['7xl', '9xl']} color="transparent" fontWeight="medium" p={3} textShadow="1px 1px 1px black" textTransform="uppercase" position="absolute" top="-5" right="28px" zIndex="100" opacity="0.5">Platz</Text>

          <Text fontSize={['3xl', '4xl']} color="white" fontWeight="medium" p={3} position="absolute" top="20%" left="10%" zIndex="100">Hi! Mình là</Text>
          <Text fontSize={['5xl', '6xl']} color="#e9d0b1" fontWeight="bold" p={3} position="absolute" top="27%" left="10%" zIndex="100" letterSpacing="wider">Miss Platz</Text>
          <Text fontSize={['lg', 'xl']} color="white" fontWeight="medium" p={3} position="absolute" top="50%" left="10%" zIndex="100" maxWidth="420px" textOverflow="nowrap">Artist, influencer, troublemaker, streamer... Mình thích các hoạt động sáng tạo và muốn mang lại niềm vui cho mọi người xung quanh.</Text>
        </Flex>
      </Flex>

      {/* Donation history */}
      {/* <Flex justifyContent="center" flexDirection="column" mx="auto" my={16} maxWidth="984" overflow="auto">
        <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">Lịch sử quyên góp</Text>
        <Flex mt={4} flexDirection="column">
          <Flex sx={{ '& > *:not(:first-child)': { ml: [8, 12] }}} px={8} alignItems="center" color="gray.500">
              <Text width="25%">Tài khoản</Text>
              <Text width="25%">Số lượng</Text>
              <Text width="25%">Thời gian</Text>
              <Text width="25%">Chi tiết</Text>
          </Flex>
          <Flex sx={{ '& > *:not(:first-child)': { ml: [8, 12] }}} p={8} _hover={{ bg: 'gray.100' }} alignItems="center" borderBottom="1px solid" borderColor="gray.200">
              <Text width="25%">Fan #1</Text>
              <Text width="25%">1 NEAR</Text>
              <Text width="25%">1 ngày trước</Text>
              <Box width="25%">
                <ExternalLinkIcon />
              </Box>
          </Flex>
          <Flex sx={{ '& > *:not(:first-child)': { ml: [8, 12] }}} p={8} _hover={{ bg: 'gray.100' }} alignItems="center" borderBottom="1px solid" borderColor="gray.200">
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
