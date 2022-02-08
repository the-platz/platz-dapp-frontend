import { Text, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../globalContext";
import { Contract } from "near-api-js";
import * as nearAPI from "near-api-js"
import DonationHistory from "../components/MyAccount/DonationHistory";

const MyAccount = () => {
  const { campaignFactory } = useGlobalContext()
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
    // call punkt contract to get this account punkts
    if (!totalPunkt && campaignFactory?.punkt_contract_account_id) {
      getTotalRewarededPunkts(campaignFactory?.punkt_contract_account_id); 
    }
  }, [totalPunkt, campaignFactory])

  return (
    <React.Fragment>
      <Text>Total rewarded Punkts: { totalPunkt ? totalPunkt : 0 }</Text>
      <Text>Donation History</Text>
      <DonationHistory/>
    </React.Fragment>
  )
};

export default MyAccount;
