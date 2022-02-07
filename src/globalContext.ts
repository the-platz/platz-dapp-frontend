import { Contract } from "near-api-js"
import { createContext, useContext } from "react"
import { ICurrentUser } from "."

export type CampaignFactoryInfo = {
  account_campaigns: string[]
  contract_owner: string
  punkt_contract_account_id: string
}

export type CampaignContractFactory = Contract & {
  create_campaign?: (args: any, gas: string, deposit: string) => void
}

export type GlobalContent = {
  campaignFactory?: CampaignFactoryInfo
  setCampaignFactory:(c: CampaignFactoryInfo) => void
  currentUser: ICurrentUser | null
  setCurrentUser: (user: ICurrentUser | null) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
  campaignFactory: undefined, // set a default value
  setCampaignFactory: (c: CampaignFactoryInfo) => {},
  currentUser: null,
  setCurrentUser: (user: ICurrentUser | null) => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)
