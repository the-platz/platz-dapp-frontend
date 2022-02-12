import { Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectListKOL } from "../../app/slices/campaignFactorySlice"

import { Text } from "@chakra-ui/react"

const KOLList = () => {
    const listKOL = useAppSelector(selectListKOL)

    useEffect(() => {
        if (listKOL) {
            console.log(listKOL);
        }
    }, [listKOL])

    return (
        <Flex flexDirection="column" my={16}>
            <Text fontSize="3xl" fontWeight="bold">
                Danh sách KOLs
            </Text>
            <Flex sx={{ overflowX: 'auto' }} my={2}>
                {listKOL?.map((kol) => 
                    <Flex flexDirection="column" p={3} key={kol} bg="teal" color="white" mt={2} borderRadius="md" mr={3}>
                        <Text fontSize="md" fontWeight="bold">
                            {kol}
                        </Text>
                    </Flex>)}
            </Flex>
        </Flex>
    )
}

export default KOLList