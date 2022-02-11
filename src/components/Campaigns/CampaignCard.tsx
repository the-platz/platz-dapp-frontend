import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectWalletConnection } from "../../app/slices/walletSlice"
import { getCampaignContract, getCampaignContractInfoAsync, withdrawAsync } from "../../models/contracts/campaign_contract"
import { CampaignInfo } from "../../models/types"
import { near_utils } from "../../utils/utils"

type ICampaignCardProps = {
    campaignAccountId: string
}

const CampaignCard: React.FC<ICampaignCardProps> = ({ campaignAccountId }) => {
    const toast = useToast()
    const walletConnection = useAppSelector(selectWalletConnection)
    const [campaignInfo, setCampaignInfo] = useState<CampaignInfo>()

    const getCampaignInfo = useCallback(async(walletConnection) => {
        const campaignContract = getCampaignContract(walletConnection, campaignAccountId)
        const cpInfo = await getCampaignContractInfoAsync(campaignContract)
        setCampaignInfo(cpInfo)
    }, [])

    const withdraw = () => {
        if (walletConnection) {
            const campaignContract = getCampaignContract(walletConnection, campaignAccountId)
            withdrawAsync(campaignContract)
        } else {
            toast({
                title: 'Contract error',
                description: "Contract is not initialized!",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        if (walletConnection) {
            getCampaignInfo(walletConnection)
        }
    }, [walletConnection])



    return (<Box key={campaignAccountId}
        maxW='sm'
        borderWidth='1px'
        borderRadius='lg'>
        <Text fontSize="md" fontWeight="bold">
            {campaignAccountId}
        </Text>
        <Text fontSize="sm" fontWeight="normal">
            Số tiền ủng hộ: {campaignInfo ? 
            near_utils.format.formatNearAmount(campaignInfo.donated_amount, 2) : "..."} NEAR
        </Text>
        <Text fontSize="sm" fontWeight="normal">
            Mục tiêu: {campaignInfo ? 
            near_utils.format.formatNearAmount(campaignInfo.target_amount, 2) : "..."} NEAR
        </Text>
        <Button mt={4} onClick={() => withdraw()}>Withdraw</Button>
    </Box>)
}

export default CampaignCard