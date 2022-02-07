import { Text } from "@chakra-ui/react"
import axios from "axios";

import { Fragment, useEffect, useState } from "react";

type Campaign = {
    campaign_account_id: string,
    campaign_beneficiary: string,
}

const MyCampaigns = () => {
    const [myCampaigns, setMyCampaigns] = useState<Campaign[] | undefined>(undefined)

    useEffect(() => {
        // TODO: move the code to backend service
        if (!myCampaigns) {
            const account = (window as any).walletConnection.account()
            axios.get(`http://localhost:5001/mycampaign?account_id=${account.accountId}`)
            .then(res => {
                setMyCampaigns(res.data.data);
            })
            .catch(error => {
                console.log(error)
            });
        }
    })

    return (
        <Fragment>
            <Text>My Campaigns</Text>
            <ul>
                {myCampaigns?.map((campaign, index, _) =>
                    <li key={index}>{campaign.campaign_account_id}</li>
                )}
            </ul>
        </Fragment>
    )
};

export default MyCampaigns;
