import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"


// const DONATE = 0.1;

const Donation = () => {
  const [loading, setLoading] = useState(false)

  const handleView = () => {
    if (loading) return;
    setLoading(true);
    (window as any).contract
      .get_campaign_factory_info()
      .then((res: any) => {
        setLoading(false);
        console.log('res', res)
      });
  };

  return (
   <Flex flexDirection="column" my={16}>
     <Text fontSize="3xl" fontWeight="bold">
       Danh sách KOLs
     </Text>

     <Flex>
       <Box>
         <Button variant="solid" onClick={() => handleView()}>View</Button>
         <Button variant="solid" onClick={() => alert('hello')}>Donate</Button>
       </Box>
     </Flex>
   </Flex>
  )
}
export default Donation
