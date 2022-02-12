import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectWalletConnection } from '../../app/slices/walletSlice';
import { useQueries } from '../../hooks/useQueries';
const { providers } = require("near-api-js");

const TxCampaignCallback = () => {
    const walletConnection = useAppSelector(selectWalletConnection)
    const { campaignAccountId, actionType } = useParams()
    const queries = useQueries()
    const [txStatus, setTxStatus] = useState(false)

    const getTxStatus = useCallback(async () => {
        const provider = new providers.JsonRpcProvider(
            "https://archival-rpc.testnet.near.org"
        );
        if (walletConnection) {
            const txStatus = await provider.txStatus(queries.get("transactionHashes"), walletConnection.account().accountId);
            setTxStatus(txStatus.status.SuccessValue === "")
        }
    }, [walletConnection, queries])

    useEffect(() => {
        getTxStatus()
    }, [walletConnection, getTxStatus])

    return (<>
        <p>Tx callback campaign {campaignAccountId} with action {actionType}</p>
        <p>Tx Hashes: {queries.get("transactionHashes")}</p>
        <p>Tx status: {txStatus ? "Succeeded" : "Failed"}</p>
    </>
    )
}

export default TxCampaignCallback
