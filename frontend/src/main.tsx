import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { LoadScript } from "@react-google-maps/api";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <LoadScript
        libraries={["places", "geometry"]}
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      >
        <App />
      </LoadScript>
    </ChakraProvider>
  </React.StrictMode>
);
