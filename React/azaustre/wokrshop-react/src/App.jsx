import React, { useState, useEffect } from "react";
import { Heading, Image} from "@chakra-ui/react";
import "dayjs/locale/es"
import * as API from './services/launches'
import logo from './assets/logoSpaceX.png'

import { LaunchItem } from './components/LaunchItem/LaunchItem.jsx';


export function App() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    API.getAllLaunches().then(setLaunches);
  }, [])

  return (
    <React.Fragment>
      <Image m={4} src={logo} width={150} />
      <Heading as="h1" size="lg" m={4}>SpaceX Launches</Heading>
      <section>
        { launches.map( launch => (
          <LaunchItem 
            key={launch.flight_number+launch.mission_name}
            {...launch} 
          />
        ))}
      </section>
    </React.Fragment>
  )
}


