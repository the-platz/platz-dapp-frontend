import { Box, Button, Flex, HStack, Image, Link, Text, VStack, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Donation from "./Donate";
import KOLList from "../components/KOLList/KOLList";

// const COLOR_PRIMARY = '#9F7E69'
const COLOR_PRIMARY = 'teal'
const COLOR_NEUTRAL_LIGHT = '#414141'

const HomePage: React.FC<any> = () => {
  return <Box px={4} py={12} maxWidth="1280" mx="auto" height="calc(100vh - 64px)">
    <HStack>
      <VStack maxWidth="564px" align="flex-start">
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

        <Link style={{ marginTop: '72px' }}><Text fontSize="sm" color={COLOR_PRIMARY} fontWeight="semibold">Tìm hiểu thêm về The Platz</Text></Link>
      </VStack>

      <VStack mx="auto" width="100%" position="relative" >
        <Box borderRadius="12px" overflow="hidden" zIndex="100" position="relative" _before={{ content: `""`, position: 'absolute', zIndex: 99, top: '0', left: '0', width: '516px', height: '424px', border: '1px solid', borderRadius: '12px', borderColor: COLOR_PRIMARY, backgroundImage: '/songtungart2.png', filter: 'blur(40px) brightness(0.4)', overflow: 'hidden' }}>
          <Image src="/songtungart2.png" objectFit="contain" boxSize="516" position="relative"  zIndex="101" />
          <Flex position="absolute" sx={{ bottom: 0, width: '100%', height: '102px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', bg: 'gray.100' }} bg="white" justifyContent="space-between" alignItems="center" p={6} zIndex="101">
            <Text fontSize="2xl" fontWeight="semibold">🔥 3 BNB</Text>
            <Button size="lg" colorScheme="teal" borderRadius={'12px'}>Mua ngay</Button>
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
    </HStack>

    <KOLList />
    <Donation />
  </Box>
};

export default HomePage;
