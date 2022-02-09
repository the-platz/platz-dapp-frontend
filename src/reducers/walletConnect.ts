import * as nearAPI from "near-api-js";
import * as env from "../env"
import * as consts from "../utils/consts"

import { store } from "../app/store"
import { signIn } from "../reducers/walletSlice"
import { ConnectConfig } from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;

export const walletConnect = async () => {
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

    // connect to NEAR
    const near = await connect(config);

    // create wallet connection
    const wallet_connection = new WalletConnection(near, consts.APP_KEY_PREFIX);

    wallet_connection.requestSignIn(
        env.CAMPAIGN_CONTRACT_FACTORY, // contract requesting access
        "The Platz", // optional
        env.APP_URL, // optional
        env.APP_URL // optional
    );

    if(wallet_connection.isSignedIn()) {
        store.dispatch(signIn({ walletConnection: wallet_connection }))
    }
}