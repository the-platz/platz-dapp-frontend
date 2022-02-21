import BN from 'bn.js'

export type donateFn = (
	{ amount }?: any,
	gas?: string,
	deposit?: string
) => void

type LiveSchedule = {
	live_platform: string
	live_on_epoch: string
	live_uri: string
}
type CampaignMetadata = {
	version: string
	start_epoch: string
	end_epoch: string
	name: string
	description: string
	live_schedule: LiveSchedule
}

export type DonorAmounts = {
	[account_id: string]: string
}

export type CampaignInfo = {
	campaign_beneficiary: string
	donor_amounts: DonorAmounts
	minimum_donation_amount: string
	target_amount: string
	campaign_metadata: CampaignMetadata
	punkt_contract_account_id: string
	campaign_factory_account_id: string
}

export type CampaignProps = {
	name: string
	donate?: donateFn
} & CampaignInfo

export type FunctionCall = {
	args: string
	deposit: string
	gas: BN
	method_name: string
}

export type TxStatusResult = {
	receipts_outcome: []
	status: {
		SuccessValue?: string
	}
	transaction: {
		actions: []
	}
}

export type TxDonationResult = {
	isSucceeded: boolean
	donationAmount: string
}
