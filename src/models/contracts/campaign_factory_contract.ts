import { Contract, WalletConnection } from 'near-api-js'
import { ContractMethods } from 'near-api-js/lib/contract'
import * as env from '../../env'
import { CampaignProps } from '../types'
import { CampaignContract, getCampaignContract } from './campaign_contract'

export type CampaignFactoryInfo = {
	account_campaigns: string[]
	contract_owner: string
	punkt_contract_account_id: string
}

const CampaignContractOptions: ContractMethods = {
	viewMethods: ['get_campaign_factory_info'],
	changeMethods: ['create_campaign'],
}

export type CampaignFactoryContract = Contract & {
	create_campaign?: (args: any, gas: string, deposit: string) => void
	get_campaign_factory_info?: () => CampaignFactoryInfo
}

export const getCampaignFactoryContract = (
	walletConnection: WalletConnection
): CampaignFactoryContract => {
	const contract: CampaignFactoryContract = new Contract(
		walletConnection.account(),
		env.CAMPAIGN_CONTRACT_FACTORY,
		CampaignContractOptions
	)

	return contract
}

export const getCampaignFactoryInfoAsync = async (
	walletConnection: WalletConnection
): Promise<CampaignFactoryInfo> => {
	const campaignFactory = getCampaignFactoryContract(walletConnection)
	if (campaignFactory.get_campaign_factory_info) {
		const campaignFactoryInfo =
			await campaignFactory.get_campaign_factory_info()
		return campaignFactoryInfo
	} else {
		throw Error('Campaign factory contract is not initialized!')
	}
}

export const getAllCampaignsAsync = async (
	walletConnection: WalletConnection
): Promise<CampaignProps[]> => {
	let campaigns: CampaignProps[] = []

	const campaignFactoryInfo = await getCampaignFactoryInfoAsync(
		walletConnection
	)

	for (let campaign_account_id of campaignFactoryInfo.account_campaigns) {
		const contract: CampaignContract = getCampaignContract(
			walletConnection,
			campaign_account_id
		)
		if (contract.get_campaign_info) {
			const campaign_info = await contract.get_campaign_info()

			const campaign: CampaignProps = {
				name: campaign_account_id,
				...campaign_info,
				donate: contract?.donate,
			}

			campaigns.push(campaign)
		}
	}

	return campaigns
}
