/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SaasProvider } from "@saas-ui/react";
import "./index.css";
import CookieConsent from "react-cookie-consent";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { ColorModeScript } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      light: "#ffffff", // color for light mode
      dark: "#000000", // color for dark mode
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CookieConsent
        location="bottom"
        buttonText="Accept cookies"
        cookieName="MarketplaceCookie"
        style={{
          background: "white",
          color: "rgb(14 0 38)",
          fontFamily: "Arial",
          fontSize: "13px",
        }}
        buttonStyle={{
          background: "rgb(54 0 149)",
          fontSize: "15px",
          color: "white",
          borderRadius: "2px",
        }}
        expires={150}
        enableDeclineButton
        declineButtonText="Decline"
        declineButtonStyle={{
          background: "rgb(255 255 255)",
          color: "rgb(54 0 149)",
          fontSize: "15px",
          borderRadius: "2px",
        }}
      >
        Cebutech marketplace uses cookies to enhance user experience and
        perfomance and traffic on our website.
      </CookieConsent>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
