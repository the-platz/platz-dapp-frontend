import BN from 'bn.js'
import { Contract, WalletConnection } from 'near-api-js'
import { ContractMethods } from 'near-api-js/lib/contract'
import * as env from '../../env'
import { CampaignProps } from '../types'
import { CampaignContract, getCampaignContract, getCampaignContractInfoAsync } from './campaign_contract'
import { ChangeMethodOptions, IChangeMethodFn, IViewMethodFn } from './interfaces'

export type CampaignFactoryInfo = {
	punkt_contract_account_id: string
	contract_owner: string
	kols: string[],
	account_campaigns: string[],
	campaign_contract_version: string,
}

const CampaignContractOptions: ContractMethods = {
	viewMethods: [
		'get_campaign_factory_info',
		'get_kol_metadata',
	],
	changeMethods: [
		'create_campaign',
		'update_kol_metadata',
	],
}

export type CampaignFactoryContract = Contract & {
	create_campaign?: IChangeMethodFn
	update_kol_metadata?: IChangeMethodFn
	get_campaign_factory_info?: () => CampaignFactoryInfo
	get_kol_metadata?: IViewMethodFn<GetKOLMetadataArgs, string>
}

/**
 * CONTRACT CALL ARGS
 */

type GetKOLMetadataArgs = {
	kol_account_id: string
}

/**
 * CONTRACT METHODS
 */

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
				campaign_account_id: campaign_account_id,
				...campaign_info,
				donate: contract?.donate,
			}

			campaigns.push(campaign)
		}
	}

	return campaigns
}

export const getAllCampaignsOfAccountIdAsync = async (
	walletConnection: WalletConnection,
	accountId: string
): Promise<CampaignProps[]> => {
	let campaigns: CampaignProps[] = []

	const campaignFactoryInfo = await getCampaignFactoryInfoAsync(
		walletConnection
	)

	for (let campaign_account_id of campaignFactoryInfo.account_campaigns) {

		const contract: CampaignContract = getCampaignContract(
			walletConnection,
			campaign_account_id,
		)

		const campaignInfo = await getCampaignContractInfoAsync(contract)

		const campaign: CampaignProps = {
			campaign_account_id: campaign_account_id,
			...campaignInfo,
			donate: contract?.donate,
		}
		campaigns.push(campaign)
	}

	return campaigns.filter(x => x.campaign_beneficiary === accountId)
}

export const createCampaignAsync = async (campaignFactoryContract: CampaignFactoryContract, encoded_args: string): Promise<void> => {
	if (campaignFactoryContract.create_campaign) {
		const changeMethodOptions: ChangeMethodOptions = {
			meta: `You made the transaction to create new campaign`,
			callbackUrl: `${env.APP_URL}/mycampaigns`,
			args: { args: encoded_args },
			amount: new BN(env.CREATE_CAMPAIGN_DEPOSIT),
			gas: new BN(env.CREATE_CAMPAIGN_GAS_FEE)
		}
		await campaignFactoryContract.create_campaign(changeMethodOptions)
		return
	}
	throw Error('Campaign factory contract is not initialized!')
}

export const updateKOLMetadataAsync = async (
	walletConnection: WalletConnection,
	KOLAccountId: string,
	metadataURL: string,
	callbackUrl?: string) => {
	const campaignFactoryContract = getCampaignFactoryContract(walletConnection)

	if (campaignFactoryContract.update_kol_metadata) {
		const changeMethodOptions: ChangeMethodOptions = {
			meta: `You made the transaction to update KOL metadata`,
			callbackUrl: callbackUrl || `${env.APP_URL}`,
			args: {
				kol_account_id: KOLAccountId,
				metadata: metadataURL
			}
		}

		await campaignFactoryContract.update_kol_metadata(changeMethodOptions)
	}
}

export const getKOLMetadataUriAsync = async (
	walletConnection: WalletConnection,
	KOLAccountId: string): Promise<string> => {
	const campaignFactoryContract = getCampaignFactoryContract(walletConnection)

	if (campaignFactoryContract.get_kol_metadata) {
		const args: GetKOLMetadataArgs = {
			kol_account_id: KOLAccountId
		}

		return await campaignFactoryContract.get_kol_metadata(args)
	}

	return ""
}