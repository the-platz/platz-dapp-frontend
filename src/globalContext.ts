import { createContext, useContext } from "react"
import { ICurrentUser } from "."

export type Campaign = {
  account_campaigns: string[]
  contract_owner: string
}

export type GlobalContent = {
  campaignFactory?: Campaign
  currentUser: ICurrentUser | null
  setCurrentUser: (user: ICurrentUser | null) => void
  setCampaignFactory:(c: Campaign) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
  campaignFactory: undefined, // set a default value
  setCampaignFactory: (c: Campaign) => {},
  currentUser: null,
  setCurrentUser: (user: ICurrentUser | null) => {}
})

export const useGlobalContext = () => useContext(MyGlobalContext)
