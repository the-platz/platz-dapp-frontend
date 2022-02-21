import {
	Text,
	Button,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Flex,
	Input,
	Textarea,
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
import { dateToEpoch } from '../utils/utils'

const TODAY = new Date()
const NEXT_WEEK = new Date(TODAY.getTime() + 7 * 24 * 60 * 60 * 1000)

const CreateCampaign = () => {
	const toast = useToast()
	const walletConnection = useAppSelector(selectWalletConnection)

	const [userAccountId, setUserAccountId] = useState<string>()
	const [campaignContractFactory, setCampaignContractFactory] =
		useState<CampaignFactoryContract>()

	const [campaignId, setCampaignId] = useState('')
	const [targetAmount, setTargetAmount] = React.useState<number>(20)
	const [minimumDonationAmount, setMinimumDonationAmount] =
		React.useState<number>(1)
	const [startDate, setStartDate] = useState(TODAY)
	const [endDate, setEndDate] = useState(NEXT_WEEK)
	const [campaignName, setCampaignName] = useState('')
	const [campaignDescription, setCampaignDescription] = useState('')

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
					campaign_id: campaignId,
					campaign_metadata: {
						name: campaignName,
						description: campaignDescription,
						start_epoch: dateToEpoch(startDate).toString(),
						end_epoch: dateToEpoch(endDate).toString(),
						version: 'v1',
						live_schedule: {
							live_platform: 'none',
							live_on_epoch: '0',
							live_uri: '',
						},
					},
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
			<Text fontWeight={'medium'}>Beneficiary:</Text>
			<Text mb={12}>{userAccountId}</Text>
			<Text>Target amount </Text>
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
			<Text mt={2}>Minimum donation amount </Text>
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

			<Text mt={4} fontWeight={'medium'}>
				Metadata:
			</Text>

			<Text mt={2}>Id</Text>
			<Input
				type="text"
				placeholder="Enter campaign id"
				value={campaignId}
				onChange={(e) => setCampaignId(e.target.value)}
			/>
			<Text mt={2}>Name</Text>
			<Input
				type="text"
				placeholder="Enter campaign name"
				value={campaignName}
				onChange={(e) => setCampaignName(e.target.value)}
			/>
			<Text mt={2}>Description</Text>
			<Textarea
				type="text"
				placeholder="Enter description"
				value={campaignDescription}
				onChange={(e) => setCampaignDescription(e.target.value)}
				width="100%"
			/>

			<Text mt={2}>Start date </Text>
			<Input
				type="date"
				placeholder="Start date"
				value={startDate.toLocaleDateString('en-CA')}
				onChange={(e) => setStartDate(new Date(e.target.value))}
			/>

			<Text mt={2}>End date </Text>
			<Input
				type="date"
				placeholder="End date"
				value={endDate.toLocaleDateString('en-CA')}
				onChange={(e) => setEndDate(new Date(e.target.value))}
			/>

			<Button onClick={createCampaign} mt={6} width="100%" colorScheme="orange">
				Continue
			</Button>
		</Flex>
	)
}

export default CreateCampaign
