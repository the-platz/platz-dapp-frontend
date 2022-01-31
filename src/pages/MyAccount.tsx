import { Button, Flex, Link, Text, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

import axios from 'axios';
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useGlobalContext } from "../globalContext";
import { Contract } from "near-api-js";
import * as nearAPI from "near-api-js"

type DonationTransaction = {
  transaction_hash: string,
  block_timestamp: string,
  donation_amount: string,
  tx_succeeded: boolean
}

const MyAccount = () => {
  const { campaignFactory } = useGlobalContext()
  const [donationTxs, setDonationTxs] = useState<DonationTransaction[] | undefined>(undefined)
  const [totalPunkt, setTotalPunkts] = useState<string | undefined>(undefined)
  const toast = useToast()

  const getTotalRewarededPunkts = async (punkt_contract_account_id: string) => {
    const account = (window as any).walletConnection.account()
    console.log('account', account);
    
    const punkt_contract: Contract & { ft_balance_of?: (args: any) => string;} = new nearAPI.Contract(
      account, // the account object that is connecting
      punkt_contract_account_id, // punk contract account id
      {
        // name of contract you're connecting to
        viewMethods: ["ft_balance_of"], // view methods do not change state but usually return a value
        changeMethods: [""], // change methods modify state
      }
    )
    if (punkt_contract?.ft_balance_of) {
      try {
        const punks_balance = await punkt_contract.ft_balance_of({"account_id": account.accountId})
        setTotalPunkts(punks_balance);
      }
      catch (e: any) {
        toast({
          title: 'Error.',
          description: e,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    // TODO: move the code to backend service
    if (!donationTxs) {
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
    }
    
    // call punkt contract to get this account punkts
    if (!totalPunkt && campaignFactory?.punkt_contract_account_id) {
      getTotalRewarededPunkts(campaignFactory?.punkt_contract_account_id); 
    }
  }, [campaignFactory])

  return (
    <React.Fragment>
      <Text>Total rewarded Punkts: { totalPunkt ? totalPunkt : 0 }</Text>
      <Text>Donation History</Text>

      <ul>
        { donationTxs?.map((donationTx) => (
          <li key={donationTx.transaction_hash}>
            <p>
              Tx Hash: <Link href={`https://explorer.testnet.near.org/transactions/${donationTx.transaction_hash}`} isExternal>
              {donationTx.transaction_hash}<ExternalLinkIcon mx='2px' />
              </Link>
            </p>
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
