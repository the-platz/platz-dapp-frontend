import { ColorModeScript } from "@chakra-ui/react"
import { NearConfig } from "near-api-js/lib/near"
import * as React from "react"
import ReactDOM from "react-dom"
import * as nearAPI from 'near-api-js';

import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"

const ContractName = 'iko.theplatz.testnet';
const AppKeyPrefix = 'platz';
const AuthDataKey = AppKeyPrefix + '_wallet_auth_key';

export interface ICurrentUser {
  accountId: string;
  balance: string;
}

// const initNear = async () => {
//   const nearConfig: NearConfig = {
//     networkId: 'testnet',
//     nodeUrl: 'https://rpc.testnet.near.org',
//     walletUrl: 'https://wallet.testnet.near.org',
//     headers: {}
//   };

//   const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
//   const near = await nearAPI.connect(Object.assign({ deps: { keyStore } }, nearConfig));

//   (window as any).walletConnection = new nearAPI.WalletConnection(near, AppKeyPrefix);

//   let currentUser: ICurrentUser | null = null;
//   if ((window as any).walletConnection.getAccountId()) {
//     currentUser = {
//       accountId: (window as any).walletConnection.getAccountId(),
//       balance: (await (window as any).walletConnection.account().state()).amount
//     }
//   }

//   (window as any).contract = await new nearAPI.Contract(
//     (window as any).walletConnection.account(),
//     ContractName,
//     {
//       viewMethods: ['get_campaign_factory_info', 'get_campaign_info'],
//       changeMethods: ['create_account_campaign', 'donate']
//     }
//   )


//   const authData = JSON.parse(window.localStorage.getItem(AuthDataKey) || '{}')
//   return {
//     currentUser,
//     contract: ((window as any).contract as IContract),
//     authData,
//     nearConfig,
//     walletConnection: (window as any).walletConnection
//   }
// }

// (window as any).nearInitPromise = initNear().then(
//   ({ ...props }) => {

//   })
ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <App/>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
