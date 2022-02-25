import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectWalletConnection } from '../../app/slices/walletSlice';
import { useQueries } from '../../hooks/useQueries';
import { getTxDonationResultAsync } from '../../utils';

const TxCampaignCallback = () => {
    const walletConnection = useAppSelector(selectWalletConnection)
    const { campaignAccountId, actionType } = useParams()
    const queries = useQueries()
    const [txStatus, setTxStatus] = useState(false)

    const getTxStatus = useCallback(async () => {
        if (walletConnection) {
            const txDonationResult = await getTxDonationResultAsync(queries.get("transactionHashes") || '', walletConnection.account().accountId)
            setTxStatus(txDonationResult.isSucceeded)
            console.log(txDonationResult.donationAmount)
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
