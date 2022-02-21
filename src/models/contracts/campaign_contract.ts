import BN from 'bn.js'
import { Contract, WalletConnection } from "near-api-js"
import { ContractMethods } from "near-api-js/lib/contract"
import { IChangeMethodFn, ChangeMethodOptions } from "./interfaces"
import * as env from "../../env"

type CampaignInfo = {
    campaign_beneficiary: string
    campaign_metadata: any
    donated_amount: string
    minimum_donation_amount: string;
    target_amount: string
}

export const CampaignContractOptions: ContractMethods = {
    viewMethods: ["get_campaign_info"],
    changeMethods: ["donate", "withdraw"]
}

export type CampaignContract = Contract & {
    campaign_account_id?: string,
    campaign_info?: CampaignInfo,
    get_campaign_info? : () => CampaignInfo,
    donate? : IChangeMethodFn,
    withdraw?: IChangeMethodFn
}

export const getCampaignContract = (walletConnection: WalletConnection, campaignAccountId: string): CampaignContract => {
    const contract: CampaignContract = new Contract(
        walletConnection.account(),
        campaignAccountId,
        CampaignContractOptions)
    
    return contract
}

export const getCampaignContractInfoAsync = async(campaignContract: CampaignContract) => {
    if (campaignContract.get_campaign_info) {
        const campaignInfo: CampaignInfo = await campaignContract.get_campaign_info()
        return campaignInfo
    } else {
        throw Error("Campaign contract is not initialized!")
    }
}

export const donateAsync = async(campaignContract: CampaignContract, donationAmount: BN) => {
    console.log(campaignContract);
    
    if (campaignContract.donate) {
        const changeMethodOptions: ChangeMethodOptions = {
            meta: `You made the transaction to donate the campaign "${campaignContract.contractId}".`,
            callbackUrl: `${env.APP_URL}/txCallback/campaign/${campaignContract.contractId}/donate`,
            args: {},
            amount: donationAmount,
            // gas auto fill
        }
        await campaignContract.donate(changeMethodOptions)
        return
    }
    throw Error("Campaign contract is not initialized!")
}

export const withdrawAsync = async(campaignContract: CampaignContract) => {
    if (campaignContract.withdraw) {
        const changeMethodOptions: ChangeMethodOptions = {
            meta: `You made the transaction to claim the campaign "${campaignContract.contractId}".`,
            callbackUrl: `${env.APP_URL}/txCallback/campaign/${campaignContract.contractId}/withdraw`,
            args: {},
            // no deposit
            // gas auto fill
        }
        await campaignContract.withdraw(changeMethodOptions)
        return
    }

    throw Error("Campaign contract is not initialized!")
}