import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import BaseLayout from "./components/Layout/BaseLayout"
import HomePage from "./pages/Home"
import About from "./pages/About"
import KOLProfile from "./pages/KOLProfile"
import MyAccount from "./pages/MyAccount";
import CreateCampaign from "./pages/CreateCampaign";
import MyCampaigns from "./pages/MyCampaigns";
import * as nearAPI from "near-api-js";
import * as consts from "./utils/consts"
import { WalletConnection } from "near-api-js";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectWalletConnection, setWalletConnection, selectIsSignedIn } from "./app/slices/walletSlice";
import { setNear } from "./app/slices/nearSlice";
import Campaign from "./pages/Campaign";
import { connectConfig } from "./utils/utils";
import { setCampaigns, setListKOL } from "./app/slices/campaignFactorySlice";
import { getAllCampaignsAsync } from "./models/contracts/campaign_factory_contract";
import TxCampaignCallback from "./components/Transactions/TxCampaignCallback";

const { connect } = nearAPI;

export const App = () => {
  const dispatch = useAppDispatch()
  const walletConnection = useAppSelector(selectWalletConnection)
  const isSignedIn = useAppSelector(selectIsSignedIn)

  useEffect(() => {
    const connectNear = async () => {
      // connect to NEAR
      const near = await connect(connectConfig)
      dispatch(setNear({ near: near }))
      // create wallet connection
      const walletConnection = new WalletConnection(near, consts.APP_KEY_PREFIX);
      dispatch(setWalletConnection({ walletConnection: walletConnection }))
    }
    connectNear()
  }, [dispatch])

  useEffect(() => {
    const loadCampaigns = async () => {
      if (isSignedIn && walletConnection) {
        const campaigns = await getAllCampaignsAsync(walletConnection)
        const listKOL = campaigns.map((campaign) => campaign.campaign_beneficiary).filter(function (item, pos, a) {
          return a.indexOf(item) === pos;
        })
        dispatch(setListKOL({ listKOL }))
        dispatch(setCampaigns({ campaigns }))
      }
    }

    loadCampaigns()
  }, [dispatch, isSignedIn, walletConnection])

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="kols" element={<Outlet />}>
              <Route path=":id" element={<KOLProfile />} />
            </Route>
            <Route path="campaigns" element={<Outlet />}>
              <Route path=":campaignAccountId" element={<Campaign />} />
            </Route>
            <Route path="myaccount" element={<MyAccount />} />
            <Route path="createcampaign" element={<CreateCampaign />} />
            <Route path="mycampaigns" element={<MyCampaigns />} />
            <Route path="txCallback" element={<Outlet />}>
              <Route path="campaign/:campaignAccountId/:actionType" element={<TxCampaignCallback />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ChakraProvider >
  )
}
