import React, { useRef, useState } from "react";
import axios from "axios";
import { Input, Button, Box, Flex, Text, Image, Heading } from "@chakra-ui/react";

export default function Wether() {
  const [inp, setInp] = useState("");
  const [info, setInfo] = useState({});
  const [vals, setVals] = useState([]);

  let { current } = useRef("");

  let date = new Date().toLocaleDateString(); //5/30/2022
  let year = date.split("").splice(5, 4);
  let month = date.split("").splice(0, 2);
  let d = date.split("").splice(2, 2);
  if (month[1] == "/") {
    month = 0 + month[0];
  }
  if (d[1] == "/") {
    d = 0 + d[0];
  }
  let mainDate = year.join("") + "-" + month + "-" + d.join("");  //5-30-2022
  
  const handelChange = (e) => {
    setInp(e.target.value);
  };

  function backend1(all) {
    let a = all;
    current = { ...current, ...a["location"], ...a["astronomy"]["astro"] };
    // console.log("current1",current);
  }
  function backend2(all) {
    current = {
      ...current,
      ...all["condition"],
      ...all["air_quality"],
      humidity: all["humidity"],
      temp_c: all["temp_c"],
      temp_f: all["temp_f"],
    };
    // console.log("current2",current);
    const url = "https://weather-api-backend-app.herokuapp.com/weather";
    // const url = "http://localhost:1234/weather";
    axios
      .post(url, current)
      .then((res) => {
        console.log(res.data);
        setInfo(res.data)
        setVals(Object.keys(res.data))
      })
      .catch((e) => console.log(e));
  }
  const handleClick = () => {
    const key = `e7d266b3de274da48d560528222605`;
    let api1 = `https://api.weatherapi.com/v1/astronomy.json?key=${key}&q=${inp.trim()}&dt=${mainDate}`;
    let api2 = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${inp.trim()}&days=1&aqi=yes&alerts=yes`;
    axios
      .get(api1)
      .then((res) => {
        // console.log
        backend1(res.data);
      })
      .catch((e) => console.log(e));
    axios
      .get(api2)
      .then((res) => {
        // console.log(res.data["current"])
        backend2(res.data["current"]);
      })
      .catch((e) => console.log(e));
  };

  // console.log("Info:", info)
  
  // console.log(vals)
  return (
    <>
      <Box m='auto' maxW='100%' bgColor='RGBA(0, 0, 0, 0.08)' p='5'>
          <Box m='auto' w={{base:'100%', md:'100%', lg:'100%'}}>
            <Flex gap='10' mt='' alignContent='center'>
              <Heading size='lg'>Weather App</Heading>
              <Input border='1px solid black' borderColor='black' type={"text"} placeholder="City" onChange={handelChange} 
              w='50%'  />
              <Button border='1px solid black' onClick={handleClick}>Submit</Button>
            </Flex>
          </Box>
          <Flex gap='5' mt='5' direction={{base:'column', md:'column', lg:'row'}}>
          <Box border='2px solid teal' w={{base:'100%', md:'100%', lg:'50%'}} borderRadius='10' textAlign='left' p='2'
          bgColor='#B2F5EA'>
            {
              (vals.length <= null) ? <Heading>Search your City...</Heading> :
            <Flex justifyContent='space-between' direction={{base:'column', md:'row', lg:'row'}}>
              <Flex direction='column' fontSize="25px" p='3'>
                <Heading size='lg'>CURRENT API</Heading>
                <Flex gap='5'>
                  <Box w='50%'>
                    <Image src={info.icon} h='100%' w='100%'></Image>
                  </Box>
                  <Box w='100%' fontSize="16px">
                    <Text><b>{vals[16]}: </b>{info.humidity}</Text>
                    <Text><b>{vals[22]}: </b>{info.temp_c}</Text>
                    <Text>{info.name}, {info.region}  </Text>
                  </Box>
                </Flex>
                <Text><b>{vals[5]} :  </b> {info.name}</Text>
                <Text><b>{vals[6]}:</b> {info.region}</Text>
                <Text><b>{vals[0]}:</b> {info.country}</Text>
                <Text><b>{vals[1]}:</b> {info.lat}</Text>
                <Text><b>{vals[4]}:</b> {info.lon}</Text>
                <Text><b>{vals[7]}:</b> {info.tz_id}</Text>
                <Text><b>{vals[2]}:</b> {info.localtime}</Text>  
              </Flex>
              <Flex direction='column' fontSize="25px">
                <Heading size='lg'>FORECAST API</Heading>
                <Text mt='30'><b>{vals[12]}:</b> {info.sunrise}</Text>
                <Text><b>{vals[13]}:</b> {info.sunset}</Text>
                <Text><b>{vals[10]}:</b>{info.moonrise}</Text>
                <Text><b>{vals[11]}:</b>{info.moonset}</Text>
                <Text><b>{vals[9]}:</b>{info.moon_phase}</Text>
                <Text><b>{vals[8]}:</b> {info.moon_illumination}</Text>
              </Flex>
          </Flex>
          }
          </Box>
          <Box border='2px solid teal' w={{base:'100%', md:'100%', lg:'50%'}} borderRadius='10'>
            <iframe style={{borderRadius:"10px"}}
              width="100%"
              height="500"
              id="gmap_canvas"
              src={`https://maps.google.com/maps?q=${inp.trim()}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </Box>
          </Flex>
</Box>
    </>
  );
}