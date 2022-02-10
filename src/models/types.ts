
export type donateFn = ({ amount }?: any, gas?: string, deposit?: string) => void

export type CampaignInfo = {
    campaign_beneficiary: string
    campaign_metadata: any
    donated_amount: string
    minimum_donation_amount: string;
    target_amount: string
}

export type CampaignProps = {
    name: string
    donate?: donateFn
} & CampaignInfo
