import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as env from "../env"
import * as nearAPI from "near-api-js";
import * as consts from "../utils/consts"

import { signIn } from "../reducers/walletSlice"
import { ConnectConfig } from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;

const AuthController: React.FC<any> = (children: any) => {
    const dispatch = useDispatch();
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

            const connectNear = async() => {
                // connect to NEAR
                const near = await connect(config)
                setNear(near)
            }
            connectNear()
        }

        if (near) {
            // create wallet connection
            const wallet_connection = new WalletConnection(near, consts.APP_KEY_PREFIX);
            if (wallet_connection.isSignedIn()) {
                dispatch(signIn({ walletConnection: wallet_connection }))
            }
        }
    }, [dispatch, near]);

    return <>
        
    </> 
};

export default AuthController;
