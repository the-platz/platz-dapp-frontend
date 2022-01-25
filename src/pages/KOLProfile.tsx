import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { FaCalendar } from 'react-icons/fa'

const KOLProfile = () => {
  return (
    <Box>
      {/* Hero section */}
      <Flex h="100vh" maxH="1024px" bgImg={'https://afamilycdn.com/150157425591193600/2021/2/11/14751884443497880450504831813681599361407354o-1613040377435808694470.jpg'} bgPos="center" bgRepeat="no-repeat" bgSize="cover" position="relative">
          <Flex flexDirection="column" bg="blackAlpha.300" backdropFilter="blur(10px)" position="absolute" bottom="20%" right="50%" py={6} px={12} borderRadius="sm" color="white" sx={{ transform: 'translateX(50%)'}} justifyContent="center" alignItems="center">
            <Text fontSize="4xl" fontWeight="semibold">Bố già NFT Drops</Text>
            <Flex alignItems="center" color="gray.200" mt={2}>
              <FaCalendar />
              <Text fontSize="sm" ml={1}>19/02/2022 11AM (UTC+7)</Text>
            </Flex>
          </Flex>
      </Flex>

      {/* Introduction section */}
      <Flex bgImg={'/images/bo-gia-3.jpg'} bgPos="center" bgRepeat="no-repeat" bgSize="cover" height="auto" width="100%" minH="1024px">
        <Flex width="100%" maxW="1200" mx="auto" mt="10%">
          <Flex flexDirection="column"py={6} px={12} color="white" alignItems={['center', 'flex-start']} textAlign={['center', 'start']} flex="0 1 550px">
            <Text fontSize="4xl" fontWeight="semibold">Bố già NFT Drops</Text>
              <Flex color="gray.100" mt={2} lineHeight="7">
                <Text fontSize="md" ml={1}>
                  <Text>
                Bộ phim Bố già kể xoay quanh một xóm nghèo có bộ tứ nhiều chuyện Giàu - Sang - Phú - Quý, nhưng nhân vật chính là ông Ba Sang (do Trấn Thành thủ vai) và cậu con trai cứng đầu của mình tên là Quắn (do Tuấn Trần thủ vai).
                  </Text>
                  <Text>
                Mặc dù Ba Sang và cậu con trai Quắn hết mực thương yêu nhau, nhưng lại xảy ra nhiều bất đồng trong quan điểm, không thể thấu hiểu nhau vì chênh lệch thế hệ. Mạch phim dẫn dắt đưa bạ n đến những câu chuyện cảm động rơi nước mắt giữa hai ba con, đảm bảo là một bộ phim hấp dẫn không thể bỏ qua.
                  </Text>
                </Text>
              </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* Donation section */}
      <Flex flexDirection="column" bg="rgb(67,50,44)">
        <Flex justifyContent="space-between" alignItems="center" maxW="1200" mx='auto' mb={24} flexDirection={['column', 'row']}>
          <Flex flexDirection="column" justifyContent="flex-start" flex={["0 0 300px", "0 1 650px"]} py={12} px={12} color="white">
              <Text fontSize="3xl" fontWeight="semibold">Vé BOGIA Level-1</Text>
              <Text fontSize="md" fontWeight="semibold" lineHeight="7">Vé BOGIA Level-1 là loại vé cơ bản. Bạn có thể mua để được xem 1 video độc quyền và phòng vé VIP khi đi xem Bố Già.</Text>
              <Button variant="solid" backgroundColor="rgb(223,196,95)" mt={6} maxW="150px" color="black">Mua Vé</Button>
          </Flex>
          <Image src={"/images/bo-gia-8.jpg"} w="100%" h="100%" flex="0 1 500px" maxW="500px" objectFit="cover" />
        </Flex>
        <Flex justifyContent="space-between" maxW="1200" mx='auto' mb={24} alignItems="center" flexDirection={['column', 'row']}>
          <Image src={"/images/bo-gia.jpg"} w="100%" h="100%" px={[0, 12]} flex="0 1 524px" maxW="500px" objectFit="cover" order={[1, 0]}/>
          <Flex flexDirection="column" justifyContent="flex-start" flex={["0 0 300px", "0 1 650px"]} py={12} px={12} color="white" order={[0, 1]}>
              <Text fontSize="3xl" fontWeight="semibold">Vé BOGIA Level-2</Text>
              <Text fontSize="md" fontWeight="semibold" lineHeight="7">Vé BOGIA Level-2 là loại vé cao cấp hơn. Bạn có thể mua để được xem 1 video độc quyền và phòng vé VIP khi đi xem Bố Già.</Text>
              <Button variant="solid" backgroundColor="rgb(223,196,95)" mt={6} maxW="150px" color="black">Mua Vé</Button>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" maxW="1200" mx='auto' alignItems="center" flexDirection={['column', 'row']}>
          <Flex flexDirection="column" justifyContent="flex-start" flex={["0 0 300px", "0 1 650px"]} py={12} px={12} color="white">
              <Text fontSize="3xl" fontWeight="semibold">Vé BOGIA Level-3</Text>
              <Text fontSize="md" fontWeight="semibold" lineHeight="7">Vé BOGIA Level-3 là loại vé VIP. Bạn có thể mua để được xem 1 video độc quyền, phòng VIP, autographs, và lưu niệm đặc biệt khi đi xem Bố Già.</Text>
              <Button variant="solid" backgroundColor="rgb(223,196,95)" mt={6} maxW="150px" color="black">Mua Vé</Button>
          </Flex>
          <Image src={"/images/bo-gia-4.jpg"} w="100%" h="100%" flex="0 1 500px" maxW="500px" objectFit="cover" />
        </Flex>
      </Flex>
    </Box>
  )
}

export default KOLProfile
