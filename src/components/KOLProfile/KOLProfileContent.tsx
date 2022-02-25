import { Flex, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectCampaigns } from "../../app/slices/campaignFactorySlice"
import { KOLMetadataV1 } from "../../models/types/kol_metadata_v1"
import KOLProfileAbout from "./KOLProfileAbout"

type IKOLProfileContentProps = {
    kolId: string,
    metadata?: KOLMetadataV1,
}

const KOLProfileContent: FC<IKOLProfileContentProps> = ({ kolId, metadata }) => {
    const currentCampaigns = useAppSelector(selectCampaigns(kolId))
    const [tabs, setTabs] = useState<JSX.Element[]>([])
    const [tabPanels, setTabPanels] = useState<JSX.Element[]>([])

    useEffect(() => {
        let tabs: JSX.Element[] = []
        let tabPanels: JSX.Element[] = []

        if (currentCampaigns && (currentCampaigns?.length > 0)) {
            tabs = [
                ...tabs,
                <Tab key="campaigns">Campaigns</Tab>
            ]
        }

        if (metadata?.works && (metadata?.works?.length > 0)) {
            tabs = [
                ...tabs,
                <Tab key="works">Works</Tab>
            ]
        }

        setTabs(tabs);
        setTabPanels(tabPanels);
    }, [currentCampaigns, metadata])

    return (
        <Skeleton isLoaded={kolId !== undefined}>
            <Flex
                justifyContent="center"
                flexDirection="column"
                my={6}
                mx="auto"
                maxWidth="984"
                px={[4, 3, 2, 0]}
            >
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab key="about">About</Tab>
                        {tabs}
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <KOLProfileAbout key="about" displayName={metadata?.kol_name || kolId} />
                        </TabPanel>
                        {tabPanels}
                    </TabPanels>
                </Tabs>
            </Flex>
        </Skeleton>
    )
}

export default KOLProfileContent