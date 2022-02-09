import { Contract, WalletConnection } from "near-api-js"
import { ContractMethods } from "near-api-js/lib/contract"
import * as env from "../../env"

export type CampaignFactoryInfo = {
    account_campaigns: string[]
    contract_owner: string
    punkt_contract_account_id: string
}

const CampaignContractOptions: ContractMethods = {
    viewMethods: ['get_campaign_factory_info'],
    changeMethods: ['create_campaign']
}

export type CampaignFactoryContract = Contract & {
    create_campaign?: (args: any, gas: string, deposit: string) => void
}

export const getCampaignFactoryContract = (walletConnection: WalletConnection): CampaignFactoryContract => {
    const contract: CampaignFactoryContract = new Contract(
        walletConnection.account(),
        env.CAMPAIGN_CONTRACT_FACTORY,
        CampaignContractOptions)
    
    return contract
}