import { ColorModeScript } from "@chakra-ui/react"
import { NearConfig } from "near-api-js/lib/near"
import * as React from "react"
import ReactDOM from "react-dom"
import * as nearAPI from 'near-api-js';

import { App, IContract } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"

const ContractName = 'platz-iko-contracts';
const AppKeyPrefix = 'platz';
const AuthDataKey = AppKeyPrefix + '_wallet_auth_key';

export interface ICurrentUser {
  accountId: string;
  balance: string;
}

const initNear = async () => {
  const nearConfig: NearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    headers: {}
  };

  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  const near = await nearAPI.connect(Object.assign({ deps: { keyStore } }, nearConfig));

  const walletConnection = new nearAPI.WalletConnection(near, AppKeyPrefix);

  let currentUser: ICurrentUser | null = null;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount
    }
  }

  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    ContractName,
    {
      viewMethods: [''],
      changeMethods: ['create_account_campaign', 'donate']
    }
  )

  const authData = JSON.parse(window.localStorage.getItem(AuthDataKey) || '{}')
  return {
    currentUser,
    contract: (contract as IContract),
    authData,
    nearConfig,
    walletConnection
  }
}

(window as any).nearInitPromise = initNear().then(
  ( {...props}) => {
  ReactDOM.render(
    <React.StrictMode>
      <ColorModeScript />
      <App {...props} />
    </React.StrictMode>,
    document.getElementById("root"),
  )
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
