import { Button, Flex, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

import axios from 'axios';

type DonationTransaction = {
  transaction_hash: string,
  block_timestamp: string,
  donation_amount: string,
  tx_succeeded: boolean
}

const MyAccount = () => {
  const [donationTxs, setDonationTxs] = useState<DonationTransaction[]>([])

  useEffect(() => {
    // TODO: move the code to backend service
    axios.get(`http://localhost:5001/donation_history?account_id=phatngluu.testnet`,
    {
      headers: {
        
      }
    })
      .then(res => {
        console.log(res.data);
        
        setDonationTxs(res.data.data);
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <React.Fragment>
      <Text>Donation History</Text>

      <ul>
        { donationTxs?.map((donationTx) => (
          <li key={donationTx.transaction_hash}>
            <h3>Tx Hash: {donationTx.transaction_hash}</h3>
            <p>Block Timestamp: {donationTx.block_timestamp}</p>
            <p>Donation Amount: {donationTx.donation_amount}</p>
            <p>Tx Status: {donationTx.tx_succeeded ? "Success" : "Failed"}</p>
            <hr></hr>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
};

export default MyAccount;
