import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
        },
      }}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
