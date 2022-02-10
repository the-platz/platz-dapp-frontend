import PageTransition from "../PageTransition";
import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const BaseLayout = () => {
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
