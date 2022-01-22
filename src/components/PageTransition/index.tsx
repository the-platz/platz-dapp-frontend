import React, { ReactNode } from "react";
import { SlideFade } from "@chakra-ui/react";

const PageTransition = ({ children } : {children: ReactNode}) => {
  return <SlideFade in>{children}</SlideFade>;
};

export default PageTransition;
