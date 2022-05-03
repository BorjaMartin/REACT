import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";

import * as API from '../../services/launches.js'

import { LaunchItem } from '../LaunchItem/LaunchItem.jsx';


export function LaunchesList() {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    API.getAllLaunches()
    .then(setLaunches)
    .catch(console.log);    
  }, [])

    return (
        <React.Fragment>
            <Heading as="h1" size="lg" m={4}>
                SpaceX Launches
            </Heading>  
            {launches.length == 0 ? (
                <div>Loading...</div>
            ) : (
                <section>
                    { launches.map( launch => (
                        <LaunchItem 
                        key={launch.flight_number+launch.mission_name}
                        {...launch} 
                        />
                    ))}
                </section>
            ) }
        </React.Fragment>
    )
}