import { createContext, useContext } from "react"
import { ICurrentUser } from "."
import { CampaignFactoryInfo } from "./models/contracts/campaign_factory_contract"

export type GlobalContext = {
  campaignFactory?: CampaignFactoryInfo
  setCampaignFactory:(c: CampaignFactoryInfo) => void
  currentUser: ICurrentUser | null
  setCurrentUser: (user: ICurrentUser | null) => void
}

export const MyGlobalContext = createContext<GlobalContext>({
  campaignFactory: undefined, // set a default value
  setCampaignFactory: (c: CampaignFactoryInfo) => {},
  currentUser: null,
  setCurrentUser: (user: ICurrentUser | null) => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)
