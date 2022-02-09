import { FC, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import AuthController from "./containers/AuthController";
import { store } from './app/store';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import BaseLayout from "./components/Layout/BaseLayout"
import HomePage from "./pages/Home"
import About from "./pages/About"
import { ICurrentUser } from "."
import { NearConfig } from "near-api-js/lib/near"
import KOLProfile from "./pages/KOLProfile"
import MyAccount from "./pages/MyAccount";
import CreateCampaign from "./pages/CreateCampaign";
import MyCampaigns from "./pages/MyCampaigns";
import { CampaignFactoryInfo } from "./models/contracts/campaign_factory_contract";
import * as env from "./env"
import * as nearAPI from "near-api-js";
import * as consts from "./utils/consts"
import { ConnectConfig } from "near-api-js";

const { connect, keyStores, WalletConnection, Contract } = nearAPI;

export const App: FC<any> = ({ contract, currentUser: user, nearConfig, walletConnection, authData }) => {
  const [near, setNear] = useState<nearAPI.Near>()

  useEffect(() => {
    if (!near) {
      const config: ConnectConfig = env.NETWORK_ID === consts.TESTNET ?
        {
          networkId: "testnet",
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          nodeUrl: "https://rpc.testnet.near.org",
          walletUrl: "https://wallet.testnet.near.org",
          helperUrl: "https://helper.testnet.near.org",
          headers: {}
        } : {
          networkId: "mainnet",
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          nodeUrl: "https://rpc.mainnet.near.org",
          walletUrl: "https://wallet.mainnet.near.org",
          helperUrl: "https://helper.mainnet.near.org",
          headers: {}
        }

      const connectNear = async () => {
        // connect to NEAR
        const near = await connect(config)
        setNear(near)
      }
      connectNear()
    }
  }, [near])

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        {/* <MyGlobalContext.Provider 
          value={{ 
            campaignFactory, 
            setCampaignFactory, 
            currentUser, 
            setCurrentUser }}>
        
        </MyGlobalContext.Provider> */}
        <AuthController>
          <Router>
            <Routes>
              <Route path="/" element={<BaseLayout contract={contract} walletConnection={walletConnection} />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<About />} />
                <Route path="kols" element={<Outlet />}>
                  <Route path=":id" element={<KOLProfile />} />
                </Route>
                <Route path="myaccount" element={<MyAccount />} />
                <Route path="createcampaign" element={<CreateCampaign />} />
                <Route path="mycampaigns" element={<MyCampaigns />} />
              </Route>
            </Routes>
          </Router>
        </AuthController>
      </ChakraProvider>
    </ReduxProvider>
  )
}
