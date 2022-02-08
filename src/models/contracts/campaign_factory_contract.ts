import { Contract } from "near-api-js"

export type CampaignFactoryInfo = {
    account_campaigns: string[]
    contract_owner: string
    punkt_contract_account_id: string
}

export type CampaignContractFactory = Contract & {
    create_campaign?: (args: any, gas: string, deposit: string) => void
}

export { }