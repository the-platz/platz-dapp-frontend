import { createSlice } from '@reduxjs/toolkit';
import * as nearAPI from "near-api-js";
import type { RootState } from '../store'

type NearSliceState = {
    near?: nearAPI.Near
}

const INITIAL_STATE: NearSliceState = {
    near: undefined
}

const nearSlice  = createSlice({
    name: 'near',
    initialState: INITIAL_STATE,
    reducers: {
        setNear: (state, { payload }) => {
            state = { 
                near: (payload.near as nearAPI.Near)
            };
        },
    }
})

export const { setNear } = nearSlice.actions;

export const selectNear = (state: RootState) => state.near.near

export default nearSlice.reducer;
