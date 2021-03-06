// export const API_URL = process.env.REACT_APP_API_URL || 'https://api-launchpad.spores.dev/v1/animalia';
// export const BOOMI_START_TIME = '2022-01-03T03:00:00.000Z';
// export const BOOMI_END_TIME = '2022-01-04T11:00:00.000Z';
// export const ADDRESS_RECEIVER = process.env.REACT_APP_ADDRESS_RECEIVER || '0xE31Cc7E1DAa1fE565eBF8D58629034611C57FC03';
// export const NETWORK_CHAIN_IDS = process.env.REACT_APP_NETWORK_CHAIN_IDS || '0x61';

let appUrl = ""
switch (process.env.REACT_APP_CONTEXT!) {
    case "production":
        appUrl = process.env.REACT_APP_URL!
        break;
    case "deploy-preview":
    case "branch-deploy":
        appUrl = process.env.DEPLOY_PRIME_URL!
        break;
    default:
        appUrl = 'http://localhost:3000'
}

export const APP_URL = appUrl
export const NETWORK_ID = process.env.REACT_APP_NETWORK_ID || 'testnet'
export const ARCHIVAL_RPC_URL = NETWORK_ID === 'testnet' ? "https://archival-rpc.testnet.near.org" : "https://archival-rpc.mainnet.near.org"
export const CAMPAIGN_CONTRACT_FACTORY = process.env.REACT_APP_CAMPAIGN_CONTRACT_FACTORY || 'iko.theplatz.testnet'
export const PUNKT_CONTRACT = process.env.REACT_APP_PUNKT_CONTRACT || 'punkt.theplatz.testnet'
export const CREATE_CAMPAIGN_GAS_FEE = process.env.REACT_APP_CREATE_CAMPAIGN_GAS_FEE || '300000000000000' // yochto near
export const CREATE_CAMPAIGN_DEPOSIT = process.env.REACT_APP_CREATE_CAMPAIGN_DEPOSIT || '3000000000000000000000000' // 3 near
export const IKO_BACKEND_ADDR = process.env.REACT_APP_IKO_BACKEND_ADDR || 'http://localhost:8080'