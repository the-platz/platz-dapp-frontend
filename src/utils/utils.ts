import * as nearAPI from "near-api-js"
import { ConnectConfig } from "near-api-js";
import * as env from "../env"
import * as consts from "./consts"

export const near_utils = nearAPI.utils

export const connectConfig: ConnectConfig = env.NETWORK_ID === consts.TESTNET ?
    {
        networkId: "testnet",
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        headers: {}
    } : {
        networkId: "mainnet",
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        headers: {}
    }
