import { createSlice } from '@reduxjs/toolkit';
import { WalletConnection } from 'near-api-js';

type WalletSliceState = {
    isLoggedIn: boolean,
    walletConnection?: WalletConnection
}

const INITIAL_STATE: WalletSliceState = {
    isLoggedIn: false,
    walletConnection: undefined
}

const walletSlice  = createSlice({
    name: 'wallet',
    initialState: INITIAL_STATE,
    reducers: {
        signIn: (state, { payload }) => {
            state = { walletConnection: (payload.walletConnection as WalletConnection), isLoggedIn: true };

            console.log(state);
            
            return state
        },
        signOut: () => {

        }
    }
})

export const { signIn, signOut } = walletSlice.actions;

export default walletSlice.reducer;
