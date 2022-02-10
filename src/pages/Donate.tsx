import { Button, Flex, Text } from "@chakra-ui/react"
import {useEffect, useState } from "react"
import * as nearAPI from "near-api-js"
import { useToast } from '@chakra-ui/react'
import { useAppSelector } from "../app/hooks"
import { selectWalletConnection } from "../app/slices/walletSlice"
import { getCampaignFactoryContract } from "../models/contracts/campaign_factory_contract"
import { CampaignContract, getCampaignContract } from "../models/contracts/campaign_contract"


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
  const walletConnection = useAppSelector(selectWalletConnection)

  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [campaigns, setCampaigns] = useState<CampaignProps[] | undefined>(undefined)
  // const [first, setFirst] = useState(true)

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

  const getCampaigns = async() => {
    if (walletConnection) {
      const campaignFactory = getCampaignFactoryContract(walletConnection)
      if (campaignFactory.get_campaign_factory_info) {
        const campaignFactoryInfo = await campaignFactory.get_campaign_factory_info()
        campaignFactoryInfo.account_campaigns.forEach(async (campaign_account_id: string) => {
            const contract: CampaignContract = getCampaignContract(walletConnection, campaign_account_id)
            if (contract.get_campaign_info) {
              try {
                const response = await contract.get_campaign_info()
                setCampaigns(existing_campaigns => {
                  let new_campaign = {name: campaign_account_id, ...response, donate: contract?.donate }
                  if (!!existing_campaigns && existing_campaigns?.length > 0) {
                    return  [...existing_campaigns, new_campaign]
                  }
                  return [new_campaign]
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
    } else {
      toast({
        title: 'Wallet connnection error.',
        description: "Wallet connnection is not initialized",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (!campaigns && walletConnection) {
      getCampaigns()
    }
    
  }, [walletConnection, toast])

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
              Số tiền ủng hộ: {utils.format.formatNearAmount(campaign.donated_amount)} NEAR
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Mục tiêu: {utils.format.formatNearAmount(campaign.target_amount)} NEAR
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
