import { WalletConnection } from 'near-api-js'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectKOLs, setCampaigns } from '../app/slices/campaignFactorySlice'
import { selectWalletConnection } from '../app/slices/walletSlice'
import NotFound from '../components/Errors/NotFound'
import KOLProfileContent from '../components/KOLProfile/KOLProfileContent'
import KOLTopCover from '../components/KOLProfile/KOLProfileCover'
import LoadingWrapper from '../components/Layout/LoadingWrapper'
import { getAllCampaignsOfAccountIdAsync, getKOLMetadataUriAsync } from '../models/contracts/campaign_factory_contract'
import { KOLMetadataV1 } from '../models/types/kol_metadata_v1'
import { getKOLMetadataFromIPFSAsync } from '../services/kol_metadata_service'

const KOLProfile = () => {
	const { kolId } = useParams()
	const dispatch = useAppDispatch()

	const KOLs = useAppSelector(selectKOLs)
	const walletConnection = useAppSelector(selectWalletConnection)

	const [KOLMetadata, setKOLMetadata] = useState<KOLMetadataV1>()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const loadKOLMetadata = useCallback(async (walletConnection: WalletConnection, kolId: string) => {
		const metadataUri = await getKOLMetadataUriAsync(walletConnection, kolId)

		let metadata: KOLMetadataV1
		if (metadataUri === "") {
			setKOLMetadata(undefined)
		} else {
			metadata = await getKOLMetadataFromIPFSAsync(metadataUri)
			setKOLMetadata(metadata)
		}
	}, [])

	const loadCampaigns = useCallback(async (walletConnection: WalletConnection, kolId: string) => {
		const kolCampaignInfos = await getAllCampaignsOfAccountIdAsync(
			walletConnection,
			kolId
		)

		dispatch(
			setCampaigns({
				kolId,
				campaigns: kolCampaignInfos,
			})
		)
	}, [dispatch])

	useEffect(() => {
		if (walletConnection && kolId) {
			loadKOLMetadata(walletConnection, kolId)
			loadCampaigns(walletConnection, kolId)
		}
	}, [dispatch, walletConnection, kolId, loadCampaigns, loadKOLMetadata])

	return (
		<LoadingWrapper isLoaded={kolId !== undefined && KOLs !== undefined}>
			{
				(KOLs?.includes(kolId!) ?
					<>
						<KOLTopCover kolId={kolId!} metadata={KOLMetadata}/>
						<KOLProfileContent kolId={kolId!} metadata={KOLMetadata} />
					</>
					:
					<NotFound errMsg={`${kolId} is not registered!`} />)
			}
		</LoadingWrapper>
	)
}
export default KOLProfile
