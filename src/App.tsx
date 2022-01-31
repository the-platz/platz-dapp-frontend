import { FC, useEffect, useState } from "react"
import {BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import BaseLayout from "./components/Layout/BaseLayout"
import HomePage from "./pages/Home"
import About from "./pages/About"
import { Contract, WalletConnection } from "near-api-js"
import { ICurrentUser } from "."
import { NearConfig } from "near-api-js/lib/near"
import KOLProfile from "./pages/KOLProfile"
import { Campaign, MyGlobalContext } from "./globalContext"
import MyAccount from "./pages/MyAccount";

export interface IContract extends Contract {
  create_account_campaign: any,
  donate: any
}

interface IAppProps {
  contract: IContract,
  currentUser: ICurrentUser | null,
  nearConfig: NearConfig,
  walletConnection: WalletConnection,
  authData: any
}

export const App: FC<IAppProps> = ({contract, currentUser: user, nearConfig, walletConnection, authData}) => {
  const [campaignFactory, setCampaignFactory] = useState<Campaign | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(user)

  useEffect(() => {
    (window as any).contract
    .get_campaign_factory_info()
    .then((res: Campaign) => {
      console.log('res', res)
      setCampaignFactory(res)
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <MyGlobalContext.Provider value= {{ campaignFactory, setCampaignFactory, currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout contract={contract} walletConnection={walletConnection} currentUser={currentUser} />}>
            <Route index element={<HomePage currentUser={currentUser} />} />
            <Route path="about" element={<About/>} />
            <Route path="kols" element={<Outlet/>}>
              <Route path=":id" element={<KOLProfile/>} />
            </Route>
            <Route path="myaccount" element={<MyAccount/>} />
          </Route>
        </Routes>
      </Router>
      </MyGlobalContext.Provider>
    </ChakraProvider>
  )
}
