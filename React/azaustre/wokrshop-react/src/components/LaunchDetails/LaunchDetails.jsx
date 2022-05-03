import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { HiCalendar } from "react-icons/hi";
import { Box , Flex, Text, Spacer, Tag, Link, Icon, Image} from "@chakra-ui/react"; 

import dayjs from 'dayjs';
import "dayjs/locale/es"


import * as API from '../../services/launches.js'


export function LaunchesDetails(){
    // const params = useParams();
    const { launchId } = useParams();

    const [launch, setLaunch] = useState({});

    useEffect(() => {
        API.getLaunchByFlightNumber(launchId)
            .then(setLaunch)
            .catch(console.log);
    }, [launchId])

    
    return (
        
        <Box  bg="gray.100" p={4} m={4} borderRadius="lg">
            {!launch ? (
                <div>Loading...</div> 
            ) : (    
                <Flex>

                    <Flex display="flex">
                        <Text fontSize="2x1">
                        Mission <strong>{launch.mission_name}</strong>  ({launch.launch_year})                 
                        </Text>
                        <Spacer />              
                        <Tag p={2} colorScheme={launch.launch_success ? "green" : "red"} > {launch.launch_success ? "Success" : "Failure"} </Tag>                            
                    </Flex>

                    <Flex align="center">
                        <Icon as={HiCalendar} color="gray.500" /> 
                        <Text fontSize="sm" ml={1} color="gray.500">
                            {dayjs(launch.launch_date_local)
                            .locale('es')
                            .format("D MMMM, YYYY")}
                        </Text>
                    </Flex>

                    <Flex align="center">
                        <Text fontSize="sm" ml={1} color="gray.500">
                            {JSON.stringify(launch.links)}
                            {launch.links ? (
                                <div>
                                    <Image m={4} src={launch.links.mission_patch} width={150} /> 
                                    <Link href={launch.links.article_link} isExternal>Article</Link>                
                                    <Link href={launch.links.video_link} isExternal>
                                        <Image m={4} src={youtubeThumbnail(launch.links.youtube_id)} width={150} />            
                                    </Link>                
                                </div> 
                                ) : (
                                    <div></div>
                            )}
                        </Text>

                    </Flex>

                </Flex>        

            )}
        

        </Box>
    )
}

function youtubeThumbnail(idVideo){
    return 'https://img.youtube.com/vi/' + idVideo + '/default.jpg';
}