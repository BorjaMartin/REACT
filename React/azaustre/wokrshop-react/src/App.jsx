import React from "react";
import { Image} from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import logo from './assets/logoSpaceX.png'

import { LaunchesList } from './components/LaunchesList/LaunchesList.jsx';
import { LaunchesDetails } from './components/LaunchDetails/LaunchDetails.jsx';

export function App() {
  return (
    <React.Fragment>
      <Image m={4} src={logo} width={150} />
      <Routes>
        <Route path="/" element={<LaunchesList />} />
        <Route path="launch/:launchId" element={<LaunchesDetails />} />
      </Routes>          
    </React.Fragment>
  )
}


