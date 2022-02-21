import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import DonationHistory from '../components/MyAccount/DonationHistory'
import { selectWalletConnection } from '../app/slices/walletSlice'
import { useAppSelector } from '../app/hooks'
import { getPunktContract } from '../models/contracts/punkt_contract'

const MyAccount = () => {
	// const toast = useToast()
	const walletConnection = useAppSelector(selectWalletConnection)
	const [totalPunkt, setTotalPunkts] = useState<string | undefined>(undefined)

	useEffect(() => {
		// call punkt contract to get this account punkts
		if (!totalPunkt && walletConnection) {
			const punktContract = getPunktContract(walletConnection)
			;(async () => {
				if (punktContract.ft_balance_of) {
					const punkt_balance = await punktContract.ft_balance_of({
						account_id: walletConnection.account().accountId,
					})
					setTotalPunkts(punkt_balance)
				}
			})()
		}
	}, [walletConnection, totalPunkt])

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			maxWidth="886"
			mx="auto"
			py={16}
		>
			<Text fontSize={['2xl', '3xl']} mb={12}>
				Total rewarded Punkts: {totalPunkt ?? 0}
			</Text>
			<Text fontSize={['2xl', '3xl']} mb={2}>
				Donations
			</Text>
			<DonationHistory />
		</Flex>
	)
}

export default MyAccount
