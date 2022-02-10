import * as nearAPI from "near-api-js"
import { ConnectConfig, WalletConnection } from "near-api-js";
import { CampaignContract, getCampaignContract } from "../models/contracts/campaign_contract";
import { getCampaignFactoryContract } from "../models/contracts/campaign_factory_contract";
import { CampaignProps } from "../models/types";
import * as env from "../env"
import * as consts from "./consts"

export const near_utils = nearAPI.utils

export const connectConfig: ConnectConfig = env.NETWORK_ID === consts.TESTNET ?
{
    networkId: "testnet",
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    headers: {}
} : {
    networkId: "mainnet",
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    headers: {}
}

// export const getCampaignFactoryInfo = async (callback: any) => {
//     const campaignFactoryContract = getCampaignFactoryContract(walletConnection);
//     (async () => {
//         if (campaignFactoryContract.get_campaign_factory_info) {
//             const campaignFactoryInfo = await campaignFactoryContract.get_campaign_factory_info()
//             setCampaignFactoryInfo(campaignFactoryInfo)
//         }
//     })()
// }

export const getCampaigns = async(walletConnection: WalletConnection): Promise<CampaignProps[]> => {
    let campaigns : CampaignProps[] = []

    const campaignFactory = getCampaignFactoryContract(walletConnection)
    if (campaignFactory.get_campaign_factory_info) {
        const campaignFactoryInfo = await campaignFactory.get_campaign_factory_info()

        for (let campaign_account_id of campaignFactoryInfo.account_campaigns) {
            const contract: CampaignContract = getCampaignContract(walletConnection, campaign_account_id)
            if (contract.get_campaign_info) {
                const campaign_info = await contract.get_campaign_info()

                const campaign : CampaignProps = {
                    name: campaign_account_id,
                    ...campaign_info,
                    donate: contract?.donate
                }
                
                campaigns.push(campaign)
            }
        }

    }

    return campaigns
}