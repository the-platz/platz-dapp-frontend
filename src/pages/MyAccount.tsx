import { Text, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

import DonationHistory from "../components/MyAccount/DonationHistory";
import { selectWalletConnection } from "../reducers/walletSlice";
import { useAppSelector } from "../app/hooks";
import { getPunktContract } from "../models/contracts/punkt_contract";

const MyAccount = () => {
  const toast = useToast()
  const walletConnection = useAppSelector(selectWalletConnection)
  const [totalPunkt, setTotalPunkts] = useState<string | undefined>(undefined)
  
  useEffect(() => {
    // call punkt contract to get this account punkts
    if (!totalPunkt && walletConnection) {
      const punktContract = getPunktContract(walletConnection);
      (async() => {
        if (punktContract.ft_balance_of) {
        const punkt_balance = await punktContract.ft_balance_of({"account_id": walletConnection.account().accountId})
        setTotalPunkts(punkt_balance)
        }
      })()
    }
  }, [totalPunkt])

  return (
    <React.Fragment>
      <Text>Total rewarded Punkts: { totalPunkt ? totalPunkt : 0 }</Text>
      <Text>Donation History</Text>
      <DonationHistory/>
    </React.Fragment>
  )
};

export default MyAccount;
