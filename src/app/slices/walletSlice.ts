import { createSlice } from '@reduxjs/toolkit';
import { WalletConnection } from 'near-api-js';
import * as nearAPI from "near-api-js";
import type { RootState } from '../store'

type WalletSliceState = {
    isLoggedIn: boolean,
    walletConnection?: WalletConnection,
    near?: nearAPI.Near
}

const INITIAL_STATE: WalletSliceState = {
    isLoggedIn: false,
    walletConnection: undefined,
    near: undefined
}

const walletSlice  = createSlice({
    name: 'wallet',
    initialState: INITIAL_STATE,
    reducers: {
        setWalletConnection: (state, { payload }) => {
            state.walletConnection = (payload.walletConnection as WalletConnection)
        },
        signIn: (state, { payload }) => {
            state = { 
                isLoggedIn: true,
                walletConnection: (payload.walletConnection as WalletConnection), 
                near: (payload.near as nearAPI.Near)
            };
        },
        signOut: (state) => {
            state.walletConnection?.signOut()
            state = { 
                isLoggedIn: false,
                walletConnection: undefined,
                near: undefined, 
            }
        }
    }
})

export const { signIn, signOut, setWalletConnection } = walletSlice.actions;

export const selectWalletConnection = (state: RootState) => state.wallet.walletConnection
export const selectIsSignedIn = (state: RootState) => state.wallet.walletConnection?.isSignedIn()

export default walletSlice.reducer;
