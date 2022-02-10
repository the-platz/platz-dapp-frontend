import { Box, Button, Flex, Image, Text, VStack, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom'
// const COLOR_PRIMARY = '#9F7E69'
const COLOR_PRIMARY = 'orange'
const COLOR_NEUTRAL_LIGHT = '#414141'

const HomePage: React.FC<any> = () => {
  return (
    <Box bg="linear-gradient(to bottom,#f5efe6, white)" height="calc(100% - 64px)">
      <Box px={4} py={12} maxWidth="1280" mx="auto">
        <Flex>
          <Flex flexDirection="column" maxWidth="564px" align="flex-start">
            <Text fontSize="5xl" fontWeight="semibold">
              Ủng hộ, Sưu tầm và Trở thành
              Fan ưa thích
            </Text>
            <Text fontSize="md" maxWidth="80%" fontWeight="light" color={COLOR_NEUTRAL_LIGHT}>
              Idol của bạn đang livestream? Hãy mua NFT của người đó và tham gia vào cộng đồng NFT.
            </Text>

            <Flex alignItems="center" style={{ marginTop: '48px' }}>
              <Button bg={COLOR_PRIMARY} borderRadius="16px" rightIcon={<ChevronRightIcon />} color="white" size="md">
                <Text fontSize="sm">
                  Khám phá
                </Text>
              </Button>
              <Text fontSize="xs" fontWeight="light" ml={5} color={COLOR_NEUTRAL_LIGHT}>Sở hữu NFT và nhận những huy hiệu độc nhất trong 30s!</Text>
            </Flex>

            <Link style={{ marginTop: '72px' }} to="/"><Text fontSize="sm" color={COLOR_PRIMARY} fontWeight="semibold">Tìm hiểu thêm về The Platz</Text></Link>
          </Flex>

          <VStack flexDirection="column" mx="auto" width="100%" position="relative" >
            <Box borderRadius="12px" overflow="hidden" zIndex="100" position="relative" _before={{ content: `""`, position: 'absolute', zIndex: 99, top: '0', left: '0', width: '516px', height: '424px', borderRadius: '12px', bg: 'linear-gradient(to bottom, #ece7ce, lightgray)', overflow: 'hidden' }}>
              <Image src="/images/default_home_4.jpg" objectFit="cover" boxSize="516" position="relative"  zIndex="101" />
              <Flex position="absolute" sx={{ bottom: 0, width: '100%', height: '102px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', bg: 'white' }} bg="white" justifyContent="space-between" alignItems="center" p={6} zIndex="101">
                <Text fontSize="2xl" fontWeight="semibold">3 NEAR</Text>
                <Button size="lg" bg={COLOR_PRIMARY} borderRadius={'12px'} color="white">Ủng hộ</Button>
              </Flex>
            </Box>
            <RadioGroup colorScheme={COLOR_PRIMARY} defaultValue="1" size="md">
              <Stack direction='row'>
                <Radio value='1' bg={COLOR_PRIMARY}></Radio>
                <Radio value='2'></Radio>
                <Radio value='3'></Radio>
              </Stack>
            </RadioGroup>
          </VStack>
        </Flex>

        {/* Influencers */}
        <Flex flexDirection="column" alignItems="flex-start" mt={16}>
          <Text fontSize={['2xl', '4xl']} fontWeight="bold">Influencer nổi bật</Text>
          <Flex sx={{ '& > *:not(:first-child)': { ml: [4, 8] }}} mt={3} mb={16}>
            <Link to={'/kols/1'}>
              <Flex height="320px" width="250px" borderRadius="md" flexDirection="column" overflow="hidden" border="1px solid gray" p={2}>
                  <Image src="/images/default_home_1.jpg" objectFit="cover" boxSize="250" />
                  <Flex flexDirection="column" p={2}>
                    <Text fontWeight="semibold">Influencer #1</Text>
                    <Text fontWeight="medium" fontSize="sm">300 NEAR</Text>
                  </Flex>
              </Flex>
            </Link>
            <Link to={'/kols/1'}>
              <Flex height="320px" width="250px" borderRadius="md" flexDirection="column" overflow="hidden" border="1px solid gray" p={2}>
                  <Image src="/images/default_home_3.jpg" objectFit="cover" boxSize="250" />
                  <Flex flexDirection="column" p={2}>
                    <Text fontWeight="semibold">Influencer #2</Text>
                    <Text fontWeight="medium" fontSize="sm">100 NEAR</Text>
                  </Flex>
              </Flex>
            </Link>
          </Flex>
        </Flex>
        {/* <Donation /> */}


      </Box>
    </Box>
  )
};

export default HomePage;
