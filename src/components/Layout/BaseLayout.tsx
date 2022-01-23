import React from "react";
import PageTransition from "../PageTransition";
import { Flex, Box, FlexProps } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ICurrentUser } from "../..";
import { WalletConnection } from "near-api-js";
import { IContract } from "../../App";

interface IBaseLayoutProps extends FlexProps {
  currentUser: ICurrentUser | null,
  walletConnection: WalletConnection,
  contract: IContract
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({walletConnection, currentUser, contract, ...props}) => {
  return (
    <>
      <Header walletConnection={walletConnection} currentUser={currentUser} contract={contract}/>
      <PageTransition>
        <Flex
          direction="column"
          alignItems="center"
          className="base-page"
          {...props}
        >
          <Box w="100%" m="0 auto">
            <Outlet />
          </Box>
        </Flex>
      </PageTransition>
    </>
  );
};

export default BaseLayout;
