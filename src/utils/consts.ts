export const TESTNET = 'testnet'
export const MAINNET = 'mainnet'
export const APP_KEY_PREFIX = 'platz'

export const ERROR_VISIBILITY_DURATION = 5000 // seconds

// Toast errors
export const TOAST_ERROR_DEFAULT = {
	title: 'Error',
	description: 'An error occurred',
	status: 'error',
	duration: ERROR_VISIBILITY_DURATION,
	isClosable: true,
}

export const TOAST_ERROR_WALLET_CONNECTION_NOT_INITIALIZED = {
	...TOAST_ERROR_DEFAULT,
	title: 'Wallet connection error',
	description: 'Wallet connection is not initialized!',
}

export const NEAR_TRANSACTION_URL =
	'https://explorer.testnet.near.org/transactions/'
