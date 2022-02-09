import { FC, useEffect, useState } from "react"
import {BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import AuthController from "./containers/AuthController";
import { store } from './reducers';
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
import { MyGlobalContext } from "./globalContext"
import MyAccount from "./pages/MyAccount";
import CreateCampaign from "./pages/CreateCampaign";
import MyCampaigns from "./pages/MyCampaigns";
import { CampaignFactoryInfo } from "./models/contracts/campaign_factory_contract";

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
  const [campaignFactory, setCampaignFactory] = useState<CampaignFactoryInfo | undefined>(undefined)
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(user)

  useEffect(() => {
    (window as any).contract
    .get_campaign_factory_info()
    .then((res: CampaignFactoryInfo) => {
      console.log('res', res)
      setCampaignFactory(res)
    })
  }, [])

  return (
    <ReduxProvider store={store}>
      {/* <MyGlobalContext.Provider 
        value={{ 
          campaignFactory, 
          setCampaignFactory, 
          currentUser, 
          setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout contract={contract} walletConnection={walletConnection} currentUser={currentUser} />}>
            <Route index element={<HomePage currentUser={currentUser} />} />
            <Route path="about" element={<About/>} />
            <Route path="kols" element={<Outlet/>}>
              <Route path=":id" element={<KOLProfile/>} />
            </Route>
            <Route path="myaccount" element={<MyAccount/>} />
            <Route path="createcampaign" element={<CreateCampaign/>} />
            <Route path="mycampaigns" element={<MyCampaigns/>} />
          </Route>
        </Routes>
      </Router>
      </MyGlobalContext.Provider> */}
      <AuthController></AuthController>
    </ReduxProvider>
  )
}
