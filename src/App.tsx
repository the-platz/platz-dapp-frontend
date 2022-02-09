import { FC, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import AuthController from "./containers/AuthController";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import BaseLayout from "./components/Layout/BaseLayout"
import HomePage from "./pages/Home"
import About from "./pages/About"
import KOLProfile from "./pages/KOLProfile"
import MyAccount from "./pages/MyAccount";
import CreateCampaign from "./pages/CreateCampaign";
import MyCampaigns from "./pages/MyCampaigns";
import * as env from "./env"
import * as nearAPI from "near-api-js";
import * as consts from "./utils/consts"
import { ConnectConfig, WalletConnection } from "near-api-js";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectWalletConnection, setWalletConnection, signIn } from "./app/slices/walletSlice";
import { selectNear, setNear } from "./app/slices/nearSlice";

const { connect, keyStores } = nearAPI;

export const App = () => {
  const near = useAppSelector(selectNear)
  const walletConnection = useAppSelector(selectWalletConnection)
  const dispatch = useAppDispatch()

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
        dispatch(setNear({ near: near }))
      }
      connectNear()
    }

    if (near && !walletConnection) {
      // create wallet connection
      const walletConnection = new WalletConnection(near, consts.APP_KEY_PREFIX);
      dispatch(setWalletConnection({ walletConnection: walletConnection }))
    }
  }, [near, walletConnection])

  return (
    <ChakraProvider theme={theme}>
      <AuthController>
        <Router>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
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
  )
}
