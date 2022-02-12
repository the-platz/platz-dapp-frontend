// export const API_URL = process.env.REACT_APP_API_URL || 'https://api-launchpad.spores.dev/v1/animalia';
// export const BOOMI_START_TIME = '2022-01-03T03:00:00.000Z';
// export const BOOMI_END_TIME = '2022-01-04T11:00:00.000Z';
// export const ADDRESS_RECEIVER = process.env.REACT_APP_ADDRESS_RECEIVER || '0xE31Cc7E1DAa1fE565eBF8D58629034611C57FC03';
// export const NETWORK_CHAIN_IDS = process.env.REACT_APP_NETWORK_CHAIN_IDS || '0x61';

export const APP_URL = process.env.VERCEL_URL || process.env.REACT_APP_URL || 'http://localhost:3000'
export const NETWORK_ID = process.env.REACT_APP_NETWORK_ID || 'testnet'
export const CAMPAIGN_CONTRACT_FACTORY = process.env.REACT_APP_CAMPAIGN_CONTRACT_FACTORY || 'iko.theplatz.testnet'
export const PUNKT_CONTRACT = process.env.REACT_APP_PUNKT_CONTRACT || 'punkt.theplatz.testnet'
export const CREATE_CAMPAIGN_GAS_FEE = process.env.REACT_APP_CREATE_CAMPAIGN_GAS_FEE || '300000000000000' // yochto near
export const CREATE_CAMPAIGN_DEPOSIT = process.env.REACT_APP_CREATE_CAMPAIGN_DEPOSIT || '3000000000000000000000000' // 3 near