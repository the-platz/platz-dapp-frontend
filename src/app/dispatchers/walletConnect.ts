import * as nearAPI from "near-api-js";
import * as env from "../../env"
import * as consts from "../../utils/consts"

import { signIn, signOut } from "../slices/walletSlice"
import { ConnectConfig } from "near-api-js";
import { useAppDispatch } from "../hooks";

const { connect, keyStores, WalletConnection } = nearAPI;

export const walletConnect = () => {
    // // create wallet connection
    // const wallet_connection = new WalletConnection(near, consts.APP_KEY_PREFIX);

    // wallet_connection.requestSignIn(
    //     env.CAMPAIGN_CONTRACT_FACTORY, // contract requesting access
    //     "The Platz", // optional
    //     env.APP_URL, // optional
    //     env.APP_URL // optional
    // );

    // if(wallet_connection.isSignedIn()) {
    //     const dispatch = useAppDispatch()
    //     dispatch(signIn({ walletConnection: wallet_connection }))
    // }
}

// export const walletDisconnect = () => {
//     const dispatch = useAppDispatch()
//     dispatch(signOut())
// }