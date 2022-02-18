import {
	Text,
	Button,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Flex,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import React from 'react'
import {
	CampaignFactoryContract,
	getCampaignFactoryContract,
} from '../models/contracts/campaign_factory_contract'
import { selectWalletConnection } from '../app/slices/walletSlice'
import { useAppSelector } from '../app/hooks'
import * as env from '../env'

const CreateCampaign = () => {
	const toast = useToast()
	const walletConnection = useAppSelector(selectWalletConnection)

	const [userAccountId, setUserAccountId] = useState<string>()
	const [campaignContractFactory, setCampaignContractFactory] =
		useState<CampaignFactoryContract>()

	const [targetAmount, setTargetAmount] = React.useState<number>(20)
	const [minimumDonationAmount, setMinimumDonationAmount] =
		React.useState<number>(1)

	useEffect(() => {
		if (!userAccountId && walletConnection) {
			setUserAccountId(walletConnection.account().accountId)
		}

		if (!campaignContractFactory && walletConnection) {
			const contract = getCampaignFactoryContract(walletConnection)
			setCampaignContractFactory(contract)
		}
	}, [walletConnection, userAccountId, campaignContractFactory])

	const createCampaign = async () => {
		if (!campaignContractFactory || !campaignContractFactory?.create_campaign) {
			toast({
				title: 'Contract error',
				description: 'Contract factory is not initialized!',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		} else {
			if (!userAccountId || !minimumDonationAmount || !targetAmount) {
				toast({
					title: 'Campaign data error',
					description: 'Campaign data is not filled properly!',
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			} else {
				const campaign_args = {
					punkt_contract_account_id: env.PUNKT_CONTRACT,
					campaign_beneficiary: userAccountId,
					target_amount: toYochtoNear(targetAmount),
					minimum_donation_amount: toYochtoNear(minimumDonationAmount),
				}
				const encoded_base64_campaign_args = btoa(JSON.stringify(campaign_args))

				await campaignContractFactory.create_campaign(
					{ args: encoded_base64_campaign_args },
					env.CREATE_CAMPAIGN_GAS_FEE,
					env.CREATE_CAMPAIGN_DEPOSIT
				)
			}
		}
	}

	const toYochtoNear = (near: number): string => {
		return (BigInt(near) * BigInt(1000000000000000000000000)).toString()
	}

	return (
		<Flex
			flexDirection="column"
			alignItems="center"
			maxWidth="420"
			mx="auto"
			py={16}
		>
			<Text fontSize={['2xl', '3xl']} fontWeight="semibold">
				Create a new campaign
			</Text>
			<Text fontSize={['xs', 'sm']} mb={8}>
				* You should have at least 5 NEAR *
			</Text>
			<Text>Beneficiary:</Text>
			<Text mb={12}>{userAccountId}</Text>
			<Text>Target amount: </Text>
			<NumberInput
				w="100%"
				value={targetAmount}
				onChange={(_, value: number) => setTargetAmount(value)}
				min={20}
				max={1000}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Text mt={2}>Minimum donation amount: </Text>
			<NumberInput
				w="100%"
				value={minimumDonationAmount}
				onChange={(_, value: number) => setMinimumDonationAmount(value)}
				min={1}
				max={1000}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Button onClick={createCampaign} mt={6} width="100%" colorScheme="orange">
				Continue
			</Button>
		</Flex>
	)
}

export default CreateCampaign
