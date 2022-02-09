import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Badge, Link } from '@chakra-ui/react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/react'

import { useEffect, useState } from "react";
import { useAppSelector } from '../../app/hooks';
import { selectWalletConnection } from '../../reducers/walletSlice';

type DonationTransaction = {
    transaction_hash: string,
    receiver_account_id: string,
    block_timestamp: string,
    donation_amount: string,
    is_failed: boolean
}

const DonationHistory = () => {
    const walletConnection = useAppSelector(selectWalletConnection)
    const [donationTxs, setDonationTxs] = useState<DonationTransaction[] | undefined>(undefined)

    useEffect(() => {
        // TODO: move the code to backend service
        if (!donationTxs && walletConnection) {
            const account = walletConnection.account()
            axios.get(`http://localhost:5001/transactions/donation?account_id=${account.accountId}&includeFailedTxs=${true}&limit=${100}&offset=${0}`)
            .then(res => {
                setDonationTxs(res.data.data);
            })
            .catch(error => console.log(error));
        }
    })

    const shortenTxHash = (tx_hash: string) => {
        return `${tx_hash.substring(0, 7)}...${tx_hash.substring(40)}` 
    }

    const epochToDate = (epoch: string) => {
        let epoch_number = Number(epoch)
        return new Date(epoch_number / 1000000).toLocaleString()
    }

    const fromYochtoNear = (yochtoNear: string) => {
        if (yochtoNear.length <= 22) return "0.00"
        let rounded_near = yochtoNear.substring(0, yochtoNear.length - 22)
        return `${rounded_near.substring(0, rounded_near.length - 2)}.${rounded_near.substring(rounded_near.length - 2)}`
    }

    const punktsFromYochtoNear = (yochtoNear: string) => {
        if (yochtoNear.length <= 24) return "0"
        return yochtoNear.substring(0, yochtoNear.length - 24)
    }

    return (
        <Table size='sm'>
            <Thead>
                <Tr>
                <Th>Status</Th>
                <Th>Transaction hash</Th>
                <Th>On</Th>
                <Th>Campaign</Th>
                <Th>Donation amount</Th>
                <Th>Rewarded Punkt</Th>
                </Tr>
            </Thead>
            <Tbody>
            { donationTxs?.map((donationTx) => (
                <Tr key={donationTx.transaction_hash}>
                    <Td>
                        {donationTx.is_failed ?
                        <Badge variant='solid' colorScheme='red'>Failed</Badge> :
                        <Badge variant='solid' colorScheme='green'>Success</Badge>
                        }
                    </Td>
                    <Td>
                        <Link href={`https://explorer.testnet.near.org/transactions/${donationTx.transaction_hash}`} isExternal>
                            {shortenTxHash(donationTx.transaction_hash)}<ExternalLinkIcon mx='2px' />
                        </Link>
                    </Td>
                    <Td>{epochToDate(donationTx.block_timestamp)}</Td>
                    <Td>
                        <Link href={`https://explorer.testnet.near.org/accounts/${donationTx.receiver_account_id}`} isExternal>
                        {donationTx.receiver_account_id}<ExternalLinkIcon mx='2px' />
                        </Link>
                    </Td>
                    <Td>{fromYochtoNear(donationTx.donation_amount)}</Td>
                    <Td>{punktsFromYochtoNear(donationTx.donation_amount)}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
    )
}

export default DonationHistory;