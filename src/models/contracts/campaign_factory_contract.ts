import { Contract } from "near-api-js"
import { ContractMethods } from "near-api-js/lib/contract"

export type CampaignFactoryInfo = {
    account_campaigns: string[]
    contract_owner: string
    punkt_contract_account_id: string
}

const CampaignContractOptions: ContractMethods = {
    viewMethods: ['get_campaign_factory_info'],
    changeMethods: ['create_campaign']
}

export type CampaignContractFactory = Contract & {
    create_campaign?: (args: any, gas: string, deposit: string) => void
}

export { }