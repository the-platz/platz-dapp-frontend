import { Box, Flex, Text } from "@chakra-ui/react"
import { BiGlobe } from "react-icons/bi"
import { FaFacebook, FaTwitter } from "react-icons/fa"

const KOLProfile = () => {
  return (
   <Box>

     {/* User avatar */}
     <Flex flexDirection="column">
       <Box maxHeight="200" height="200" bg="gray.300" width="100%"></Box>
        <Flex flexDirection="column" alignItems="center">
          <Box bg="gray.600" height="80px" maxHeight="80" width="80px" maxWidth="80" borderRadius="50%" mt="-40px"></Box>
          <Text fontSize={['2xl', '4xl']}>KOL Nào đó</Text>
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
          <Flex flexDirection="column">
            <Text fontSize={['lg', 'xl']}>Điểm thưởng</Text>
            <Text fontSize={['xl', '2xl']} color="black" fontWeight="semibold">100,000 đ</Text>
          </Flex>
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
          <Flex flexDirection="column" width="250px" minWidth="250px" height="200px" minHeight="200px" borderRadius="md" overflow="hidden">
            <Box bg="gray.100" width="250px" minWidth="250px" height="150px" minHeight="150px"></Box>
            <Text fontWeight="medium" p={3}>Campaign</Text>
          </Flex>
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
