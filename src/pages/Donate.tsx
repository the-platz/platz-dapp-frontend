import { Button, Flex, Text } from "@chakra-ui/react"
import {useEffect, useState } from "react"
import { useGlobalContext } from "../globalContext"
import * as nearAPI from "near-api-js"
import { Contract } from "near-api-js"
import { useToast } from '@chakra-ui/react'


type donateFn = ({ amount }?: any, gas?: string, deposit?: string) => void

type CampaignInfo = {
  campaign_beneficiary: string
  campaign_metadata: any
  donated_amount: string
  minimum_donation_amount: string;
  target_amount: string
}

type CampaignProps = {
  name: string
  donate?: donateFn
} & CampaignInfo

const Donation = () => {
  const [loading, setLoading] = useState(false)
  const { campaignFactory } = useGlobalContext()
  const toast = useToast()
  const [campaigns, setCampaigns] = useState<CampaignProps[] | undefined>(undefined)

  const { utils } = nearAPI

  // const handleView = () => {
  //   if (loading) return;
  //   setLoading(true);
  //   (window as any).contract
  //     .get_campaign_factory_info()
  //     .then((res: any) => {
  //       setLoading(false);
  //       console.log('res', res)
  //     });
  // };

  // const handleDonate = async (c: string) => {
  //   const account = (window as any).walletConnection.account()
  //   setLoading(true)
  //   const contract: Contract & { donate?: donateFn } = new nearAPI.Contract(
  //     account, // the account object that is connecting
  //     c,
  //     {
  //       // name of contract you're connecting to
  //       viewMethods: ["get_campaign_info"], // view methods do not change state but usually return a value
  //       changeMethods: ["donate"], // change methods modify state
  //     }
  //   )
  //   if (contract?.donate) {
  //     try {
  //       await contract.donate(
  //         {},
  //         "300000000000000", // attached GAS (optional)
  //         "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
  //       )
  //       toast({
  //         title: 'Thành công',
  //         description: "Bạn đã donate thành công",
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //       })
  //       setLoading(false)
  //     }
  //     catch (e: any) {
  //       toast({
  //         title: 'Error.',
  //         description: e,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       })
  //     }
  //   }
  // }

  useEffect(() => {
    const getCampaigns = () => {
      campaignFactory?.account_campaigns?.forEach(async (campaign_account_id: string) => {
        const user_account_id = (window as any).walletConnection.account()
        const contract: Contract & { get_campaign_info?: () => CampaignInfo; donate?: donateFn } = new nearAPI.Contract(
          user_account_id, // the account object that is connecting
          campaign_account_id,
          {
            // name of contract you're connecting to
            viewMethods: ["get_campaign_info"], // view methods do not change state but usually return a value
            changeMethods: ["donate"], // change methods modify state
          }
        )
        if (contract?.get_campaign_info) {
          try {
            const response = await contract.get_campaign_info()
            setCampaigns(campaigns => {
              if (!!campaigns && campaigns?.length > 0) {
                return  [...campaigns, {name: campaign_account_id, ...response, donate: contract?.donate }]
              }
              return [{name: campaign_account_id, ...response, donate: contract?.donate }]
            })
          }
          catch (e: any) {
            toast({
              title: 'Error.',
              description: e,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
        }
      })
    }
    getCampaigns()
  }, [toast, utils, campaignFactory])

  return (
   <Flex flexDirection="column" my={16}>
     <Text fontSize="3xl" fontWeight="bold">
       Danh sách Campaigns
     </Text>

     <Flex sx={{ overflowX: 'auto'}} my={2}>
       {campaigns?.map((campaign, index: number) => (
         <Flex flexDirection="column" p={3} key={`${index}-${campaign.name}`} bg="teal" color="white" mt={2} borderRadius="md" mr={3}>
            <Text fontSize="md" fontWeight="bold">
              {campaign.name}
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Số tiền ủng hộ: <Text fontWeight="bold" display="inline">{utils.format.formatNearAmount(campaign.donated_amount)}</Text> NEAR
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Mục tiêu: <Text fontWeight="bold" display="inline">{utils.format.formatNearAmount(campaign.target_amount)}</Text> NEAR
            </Text>
            <Button mt={4} colorScheme="whiteAlpha" onClick={() => {
              setLoading(true)
              if (campaign?.donate) {
                campaign.donate({}, "300000000000000", campaign.minimum_donation_amount)
                setLoading(false)
              }
            }}>{loading ? 'Loading...' : 'Donate'}</Button>
         </Flex>
       ))}
     </Flex>
   </Flex>
  )
}
export default Donation
