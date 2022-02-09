import React from "react";
import PageTransition from "../PageTransition";
import { Flex, Box, FlexProps } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ICurrentUser } from "../..";
import { WalletConnection } from "near-api-js";

const BaseLayout: React.FC<any> = () => {
  return (
    <>
      <Header/>
      <PageTransition>
        <Flex
          direction="column"
          alignItems="center"
          className="base-page"
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
