import * as nearAPI from "near-api-js"
import { Text ,Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react";
import React from 'react';
import { CampaignContractFactory, useGlobalContext } from '../globalContext';
import { Account } from 'near-api-js';

const CreateCampaign = () => {
    const toast = useToast()
    const { currentUser } = useGlobalContext()
    const [userAccountId, setUserAccountId] = useState<Account>()
    const [campaignContractFactory, setCampaignContractFactory] = useState<CampaignContractFactory>()
    const [targetAmount, setTargetAmount] = React.useState<number>(20)
    const [minimumDonationAmount, setMinimumDonationAmount] = React.useState<number>(1)
    
    useEffect(() => {
        if (!userAccountId) {
            const user_account_id: Account = (window as any).walletConnection.account()
            setUserAccountId(user_account_id)

            // TODO: take from env var
            const campaignContractFactoryAccountId = 'iko.theplatz.testnet'

            if (!campaignContractFactory) {
                const contract: CampaignContractFactory = new nearAPI.Contract(
                    user_account_id, // the account object that is connecting
                    campaignContractFactoryAccountId,
                  {
                    viewMethods: [],
                    changeMethods: ["create_campaign"], // change methods modify state
                  }
                )

                setCampaignContractFactory(contract)
            }
        }
    })

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

                console.log(userAccountId?.accountId)
                console.log(minimumDonationAmount)
                console.log(targetAmount)
            } else {
                const campaign_args = {
                    // TODO: env var
                    punkt_contract_account_id: "punkt.theplatz.testnet",
                    campaign_beneficiary: userAccountId.accountId, 
                    target_amount: toYochtoNear(targetAmount), 
                    minimum_donation_amount: toYochtoNear(minimumDonationAmount)
                }
                const encoded_base64_campaign_args = btoa(JSON.stringify(campaign_args))
                
                // TODO: env var
                const CREATE_CAMPAIGN_GAS_FEE = '300000000000000'
                const CREATE_CAMPAIGN_DEPOSIT = 3

                await campaignContractFactory.create_campaign(
                    { args: encoded_base64_campaign_args}, 
                    CREATE_CAMPAIGN_GAS_FEE,
                    toYochtoNear(CREATE_CAMPAIGN_DEPOSIT))
            }
        }
    }

    // const shortenTxHash = (tx_hash: string) => {
    //     return `${tx_hash.substring(0, 7)}...${tx_hash.substring(40)}` 
    // }

    // const epochToDate = (epoch: string) => {
    //     let epoch_number = Number(epoch)
    //     return new Date(epoch_number / 1000000).toLocaleString()
    // }

    const toYochtoNear = (near: number) : string => {
        return (BigInt(near) * BigInt(1000000000000000000000000)).toString()
    }

    // const punktsFromYochtoNear = (yochtoNear: string) => {
    //     if (yochtoNear.length <= 24) return "0"
    //     return yochtoNear.substring(0, yochtoNear.length - 24)
    // }

    return (
        <Fragment>
            <Text>Create New Campaign</Text>
            <Text>It's required to deposit 5 NEAR to create campaign</Text>
            <Text>Beneficiary:</Text>
            <Text bold>{currentUser?.accountId }</Text>
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