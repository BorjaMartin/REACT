import React from 'react'
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import { App } from './App'
import { ChakraProvider } from "@chakra-ui/react"

// const root = ReactDOM.createRoot(document.getElementById("root"));
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
