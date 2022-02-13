import { Button, Flex, Image, useToast } from "@chakra-ui/react"
import { useAppSelector } from "../../app/hooks"
import { selectListKOL } from "../../app/slices/campaignFactorySlice"

import { Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { selectWalletConnection } from "../../app/slices/walletSlice"
import * as env from "../../env"

const KOLList = () => {
    const listKOL = useAppSelector(selectListKOL)
    const walletConnection = useAppSelector(selectWalletConnection)
    const toast = useToast()

    const signIn = () => {
      if (walletConnection) {
        walletConnection.requestSignIn(
          env.CAMPAIGN_CONTRACT_FACTORY, // contract requesting access
          "The Platz", // optional
          env.APP_URL, // optional
          env.APP_URL // optional
        )
      } else {
          toast({
            title: 'Wallet connection error',
            description: "Wallet connection is not initialized!",
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
      }
    }

    // useEffect(() => {
    //     if (listKOL) {
    //         console.log(listKOL);
    //     }
    // }, [listKOL])

    return (
        <Flex flexDirection="column" my={16}>
            <Text fontSize="3xl" fontWeight="bold">
                Influencers nổi bật
            </Text>
            {walletConnection?.isSignedIn() ? (
            <Flex sx={{ overflowX: 'auto', '& > *:not(:first-of-type)': { ml: [4, 8] } }} my={2}>
                {listKOL?.map((kol) =>
                    <Link to={`/kols/${kol.name}`} key={kol.name}>
                    <Flex height="320px" width="250px" borderRadius="md" flexDirection="column" overflow="hidden" border="1px solid gray" p={2}>
                        <Image src="/images/default_home_3.jpg" objectFit="cover" boxSize="250" />
                        <Flex flexDirection="column" p={2}>
                          <Text fontWeight="semibold">{kol.name}</Text>
                          {/* <Text fontWeight="medium" fontSize="sm">300 NEAR</Text> */}
                        </Flex>
                    </Flex>
                  </Link>
                )}
            </Flex>
            ) : (
              <Button type="button" my={2} onClick={() => signIn()} colorScheme="orange" maxWidth="200px">Kết nối ví để bắt đầu</Button>
            )}
        </Flex>
    )
}

export default KOLList
