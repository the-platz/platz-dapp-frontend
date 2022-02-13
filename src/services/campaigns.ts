import axios from "axios";
import { WalletConnection } from "near-api-js";
import * as env from "../env"
import { CampaignContract, getCampaignContract } from "../models/contracts/campaign_contract";
import { CampaignProps } from "../models/types";

export type MyCampaignResponse = {
  campaign_account_id: string,
  campaign_beneficiary: string,
}

export type TopDonorsResponse = {
  signer_account_id: string,
  total_donation_amount: string,
}

export const getAllCampaignsOfAccountIdAsync = async (accountId: string) => {
    const res = await axios.get(`${env.IKO_BACKEND_ADDR}/campaigns/account/${accountId}`)
    return res.data.data as MyCampaignResponse[]
}

export const getTopDonorsAsync = async (campaignId: string) => {
    const res = await axios.get(`${env.IKO_BACKEND_ADDR}/campaigns/topDonors?campaignId=${campaignId}`)
    return res?.data.data as TopDonorsResponse[]
}
export const getAllCampaignsInfo = async (walletConnection: WalletConnection, campaigns: MyCampaignResponse[]) => {
    const newCampaigns: CampaignProps[]= []
    for (let campaign of campaigns) {
        const contract: CampaignContract = getCampaignContract(walletConnection, campaign.campaign_account_id)
        if (contract.get_campaign_info) {
            const campaign_info = await contract.get_campaign_info()
            const campaignData: CampaignProps = {
                name: campaign.campaign_account_id,
                ...campaign_info,
                donate: contract?.donate
            }

            newCampaigns.push(campaignData)
        }
    }
    return newCampaigns
}
