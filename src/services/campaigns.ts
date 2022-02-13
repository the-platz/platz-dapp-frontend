import axios from "axios";
import * as env from "../env"

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
