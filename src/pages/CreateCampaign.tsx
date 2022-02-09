import { Text ,Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react";
import React from 'react';
import { CampaignFactoryContract, getCampaignFactoryContract } from "../models/contracts/campaign_factory_contract";
import { selectWalletConnection } from "../app/slices/walletSlice";
import { useAppSelector } from "../app/hooks";
import * as env from "../env"

const CreateCampaign = () => {
    const toast = useToast()
    const walletConnection = useAppSelector(selectWalletConnection)

    const [userAccountId, setUserAccountId] = useState<string>()
    const [campaignContractFactory, setCampaignContractFactory] = useState<CampaignFactoryContract>()

    const [targetAmount, setTargetAmount] = React.useState<number>(20)
    const [minimumDonationAmount, setMinimumDonationAmount] = React.useState<number>(1)
    
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
                description: "Contract factory is not initialized!",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } else {
            if (!userAccountId || !minimumDonationAmount || !targetAmount) {
                toast({
                    title: 'Campaign data error',
                    description: "Campaign data is not filled properly!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                const campaign_args = {
                    punkt_contract_account_id: env.PUNKT_CONTRACT,
                    campaign_beneficiary: userAccountId, 
                    target_amount: toYochtoNear(targetAmount), 
                    minimum_donation_amount: toYochtoNear(minimumDonationAmount)
                }
                const encoded_base64_campaign_args = btoa(JSON.stringify(campaign_args))
                
                await campaignContractFactory.create_campaign(
                    { args: encoded_base64_campaign_args}, 
                    env.CREATE_CAMPAIGN_GAS_FEE,
                    env.CREATE_CAMPAIGN_DEPOSIT)
            }
        }
    }

    const toYochtoNear = (near: number) : string => {
        return (BigInt(near) * BigInt(1000000000000000000000000)).toString()
    }

    return (
        <Fragment>
            <Text>Create New Campaign</Text>
            <Text>It's required to deposit 5 NEAR to create campaign</Text>
            <Text>Beneficiary:</Text>
            <Text>{ userAccountId }</Text>
            <Text>Target amount: </Text>
            <NumberInput maxW='100px' mr='2rem' 
                value={targetAmount} 
                onChange={(_, value: number) => setTargetAmount(value)}
                min={20}
                max={1000}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Text>Minimum donation amount: </Text>
            <NumberInput maxW='100px' mr='2rem' 
                value={minimumDonationAmount} 
                onChange={(_, value: number) => setMinimumDonationAmount(value)}
                min={1}
                max={1000}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Button onClick={createCampaign}>Create campaign</Button>
        </Fragment>
    )
}

export default CreateCampaign;