import { Contract, WalletConnection } from "near-api-js"
import { ContractMethods } from "near-api-js/lib/contract"
import { IContractCall } from "./interfaces"

type CampaignInfo = {
    campaign_beneficiary: string
    campaign_metadata: any
    donated_amount: string
    minimum_donation_amount: string;
    target_amount: string
}

const CampaignContractOptions: ContractMethods = {
    viewMethods: ["get_campaign_info"],
    changeMethods: ["donate", "withdraw"]
}

export type CampaignContract = Contract & {
    campaign_account_id?: string,
    campaign_info?: CampaignInfo,
    get_campaign_info? : () => CampaignInfo,
    donate? : IContractCall,
    withdraw?: IContractCall
}

export { CampaignContractOptions }

export const getCampaignContract = (walletConnection: WalletConnection, campaignAccountId: string): CampaignContract => {
    const contract: CampaignContract = new Contract(
        walletConnection.account(),
        campaignAccountId,
        CampaignContractOptions)
    
    return contract
}