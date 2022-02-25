import { Button, Input } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectWalletConnection } from '../app/slices/walletSlice'
import IPFSUploader from '../components/IPFSUploader/IPFSUploader'
import { updateKOLMetadataAsync } from '../models/contracts/campaign_factory_contract'

const KOLStudio = () => {
    const walletConnection = useAppSelector(selectWalletConnection)
    const [KOLId, setKOLId] = useState<string>()
    const [metadataURL, setMetadataURL] = useState<string>('')

    useEffect(() => {
        if (walletConnection) {
            setKOLId(walletConnection.account().accountId)
        }
    }, [walletConnection])

    const updateKOLMetadata = async() => {
        console.log(walletConnection, KOLId, metadataURL)
        if (walletConnection && KOLId && metadataURL) {
            await updateKOLMetadataAsync(walletConnection, KOLId, metadataURL)
        }
    }

    return (
        <>
            <Text>{KOLId}'s Studio</Text>
            <IPFSUploader/>
            <Text>Update your profile metadata:</Text>
            <Input 
                type="text"
                placeholder='https://bafybeiebfi53rxtqyi3lqvsfzzd3dcxcrs4lekzmhk55ckz6vwykxfkhlm.ipfs.infura-ipfs.io'
                value={metadataURL}
				onChange={(e) => setMetadataURL(e.target.value)}/>
            <Button 
                colorScheme='teal' variant='outline'
                onClick={updateKOLMetadata}>
                Update
            </Button>
        </>
    )

} 

export default KOLStudio