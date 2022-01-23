import * as React from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import BaseLayout from "./components/Layout/BaseLayout";
import HomePage from "./pages/Home";
import About from "./pages/About";
import { Contract, WalletConnection } from "near-api-js";
import { ICurrentUser } from ".";
import { NearConfig } from "near-api-js/lib/near";

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

export const App: React.FC<IAppProps> = ({contract, currentUser, nearConfig, walletConnection, authData}) => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout contract={contract} walletConnection={walletConnection} currentUser={currentUser} />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About/>} />
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>
)
