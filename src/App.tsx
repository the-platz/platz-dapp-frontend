import * as React from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import BaseLayout from "./components/Layout/BaseLayout";
import HomePage from "./pages/Home";
import About from "./pages/About";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About/>} />
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>
)
