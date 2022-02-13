import { createSlice } from '@reduxjs/toolkit';
import { CampaignFactoryInfo } from '../../models/contracts/campaign_factory_contract';
import { CampaignProps } from '../../models/types';
import type { RootState } from '../store'

export interface IKOL {
    name: string,
    campaigns: CampaignProps[],
}

type MyCampaignResponse = {
    campaign_account_id: string,
    campaign_beneficiary: string,
}

type CampaignFactorySliceState = {
    campaignFactoryInfo?: CampaignFactoryInfo,
    listKOL: IKOL[],
    myCampaigns: MyCampaignResponse[]
}

const INITIAL_STATE: CampaignFactorySliceState = {
    listKOL: [],
    myCampaigns: []
}

const campaignFactorySlice  = createSlice({
    name: 'campaignFactory',
    initialState: INITIAL_STATE,
    reducers: {
        setCampaignFactoryInfo: (state, { payload }) => {
            state.campaignFactoryInfo = payload.setCampaignFactoryInfo as CampaignFactoryInfo
        },
        setListKOL: (state, { payload }) => {
            state.listKOL = payload as IKOL[]
        },
        setMyCampaigns: (state, { payload }) => {
            state.myCampaigns = payload as MyCampaignResponse[]
        },
        setCampaign: (state, { payload }) => {
            const kol = state.listKOL.find(el => el.name === payload.campaign_beneficiary)
            if (kol) {
                let campaign = kol.campaigns.find(el => el.name === payload.name);
                if (campaign) {
                    campaign = payload;
                } else {
                    kol.campaigns.push(payload)
                }
            }
        }
    }
})

export const { setListKOL, setCampaign, setMyCampaigns } = campaignFactorySlice.actions;

export const selectCampaignFactoryInfo = (state: RootState) => state.campaignFactory.campaignFactoryInfo
export const selectCampaigns = (kol?: string) => (state: RootState) => {
    if(kol) {
        return state.campaignFactory.listKOL.find(el => el.name === kol)?.campaigns
    } else {
        const campaigns: CampaignProps[] = [];
        state.campaignFactory.listKOL.forEach(element => {
            campaigns.concat(element.campaigns)
        });
        return campaigns
    }
}
export const selectListKOL = (state: RootState) => state.campaignFactory.listKOL
export const selectMyCampaigns = (state: RootState) => state.campaignFactory.myCampaigns

export default campaignFactorySlice.reducer;
