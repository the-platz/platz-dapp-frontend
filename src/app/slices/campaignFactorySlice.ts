import { createSlice } from '@reduxjs/toolkit';
import * as nearAPI from "near-api-js";
import { CampaignFactoryInfo } from '../../models/contracts/campaign_factory_contract';
import { CampaignProps } from '../../models/types';
import type { RootState } from '../store'

type CampaignFactorySliceState = {
    campaignFactoryInfo?: CampaignFactoryInfo,
    campaigns?: CampaignProps[]
    listKOL?: string[]
}

const INITIAL_STATE: CampaignFactorySliceState = {
    campaignFactoryInfo: undefined,
    campaigns: undefined,
    listKOL: undefined
}

const campaignFactorySlice  = createSlice({
    name: 'campaignFactory',
    initialState: INITIAL_STATE,
    reducers: {
        setCampaignFactoryInfo: (state, { payload }) => {
            state.campaignFactoryInfo = payload.setCampaignFactoryInfo as CampaignFactoryInfo
        },
        setListKOL: (state, { payload }) => {
            console.log(payload);
            
            state.listKOL = payload.listKOL as string[]
        },
        setCampaigns: (state, { payload }) => {
            console.log(payload);
            
            state.campaigns = payload.campaigns as CampaignProps[]
        }
    }
})

export const { setCampaignFactoryInfo, setCampaigns, setListKOL } = campaignFactorySlice.actions;

export const selectCampaignFactoryInfo = (state: RootState) => state.campaignFactory.campaignFactoryInfo
export const selectCampaigns = (state: RootState) => state.campaignFactory.campaigns
export const selectListKOL = (state: RootState) => state.campaignFactory.listKOL

export default campaignFactorySlice.reducer;
