import axios from "axios";
import * as env from "../env"

export const getAllCampaignsOfAccountIdAsync = async (accountId: string) => {
    type MyCampaignResponse = {
        campaign_account_id: string,
        campaign_beneficiary: string,
    }
    const res = await axios.get(`${env.IKO_BACKEND_ADDR}/campaigns/account/${accountId}`)
    return res.data.data as MyCampaignResponse[]
}