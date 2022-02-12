import axios from "axios";
import { WalletConnection } from "near-api-js";
import * as env from "../env"

export const getDonationTxsOfAccountIdAsync = async(
    walletConnection: WalletConnection,
    includeFailedTxs?: boolean,
    limit?: number,
    offset?: number) => {
    includeFailedTxs = includeFailedTxs || false
    limit = limit || 20
    offset = offset || 0

    const query = `?accountId=${walletConnection.account().accountId}&includeFailedTxs=${true}&limit=${limit}&offset=${offset}`
    const res = await axios.get(`${env.IKO_BACKEND_ADDR}/transactions/donation${query}`)

    return res.data.data
}