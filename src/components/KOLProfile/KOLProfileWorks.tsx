import { SimpleGrid, Skeleton } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectSignedInAccountId, selectWalletConnection } from "../../app/slices/walletSlice"
import { KOLWork } from "../../models/types/kol_metadata_v1"
import WorkCardV1 from "../Works/WorkCardV1"

type IKOLProfileWorksProps = {
    KOLWorks?: KOLWork[]
}

const KOLProfileWorks: FC<IKOLProfileWorksProps> = ({ KOLWorks }) => {
    const walletConnection = useAppSelector(selectWalletConnection)
    const signedInAccountId = useAppSelector(selectSignedInAccountId)

    useEffect(() => {
    }, [walletConnection, signedInAccountId])

    return (
        <Skeleton isLoaded={walletConnection && KOLWorks !== undefined}>
            <SimpleGrid minChildWidth='300px' spacing='40px'>
                {KOLWorks?.map((KOLWork) => <WorkCardV1 metadata={KOLWork}/>)}
            </SimpleGrid>
        </Skeleton>
    )
}

export default KOLProfileWorks