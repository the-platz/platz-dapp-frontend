import { createSlice } from '@reduxjs/toolkit';
import { sortBy } from 'lodash'
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
    // TODO: remove this
    listKOL?: IKOL[],
    kols?: string[],
    myCampaigns?: MyCampaignResponse[]
}

const INITIAL_STATE: CampaignFactorySliceState = {
    // TODO: remove this
    listKOL: undefined,
    kols: undefined,
    myCampaigns: undefined
}

const campaignFactorySlice = createSlice({
    name: 'campaignFactory',
    initialState: INITIAL_STATE,
    reducers: {
        setCampaignFactoryInfo: (state, { payload }) => {
            state.campaignFactoryInfo = payload.setCampaignFactoryInfo as CampaignFactoryInfo
        },
        setListKOL: (state, { payload }) => {
            state.listKOL = payload as IKOL[]
        },
        setKOLs: (state, { payload }) => {
            state.kols = payload as string[]
        },
        setMyCampaigns: (state, { payload }) => {
            state.myCampaigns = payload as MyCampaignResponse[]
        },
        setCampaigns: (state, { payload }) => {
            if (state.listKOL) {
                const kol = state.listKOL.find(el => el.name === payload.kolId)
                if (kol) {
                    kol.campaigns = payload.campaigns
                    kol.campaigns = sortBy(kol.campaigns, ['name'])
                }
            }
        },
        setCampaign: (state, { payload }) => {
            if (state.listKOL) {
                const kol = state.listKOL.find(el => el.name === payload.campaign_beneficiary)
                if (kol) {
                    let campaign = kol.campaigns.find(el => el.name === payload.name);
                    if (campaign) {
                        campaign = payload;
                    } else {
                        kol.campaigns.push(payload)
                    }
                    kol.campaigns = sortBy(kol.campaigns, ['name'])
                }
            }
        }
    }
})

export const {
    setListKOL,
    setCampaign,
    setCampaigns,
    setMyCampaigns,
    setKOLs,
    setCampaignFactoryInfo,
} = campaignFactorySlice.actions;

export const selectCampaignFactoryInfo = (state: RootState) => state.campaignFactory.campaignFactoryInfo
export const selectCampaigns = (kol?: string) => (state: RootState) => {
    if (state.campaignFactory.listKOL) {
        if (kol) {
            return state.campaignFactory.listKOL.find(el => el.name === kol)?.campaigns
        } else {
            let campaigns: CampaignProps[] = [];
            state.campaignFactory.listKOL.forEach(element => {
                campaigns = campaigns.concat(element.campaigns)
            });
            return campaigns
        }
    }
}

export const selectKOLs = (state: RootState) => state.campaignFactory.kols
export const selectListKOL = (state: RootState) => state.campaignFactory.listKOL
export const selectMyCampaigns = (state: RootState) => state.campaignFactory.myCampaigns

export default campaignFactorySlice.reducer;
