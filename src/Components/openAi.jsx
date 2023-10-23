import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  Input,
  Button,
  Text,
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const FrontEnd = () => {
  const [searchParams,setSearchParams]=useSearchParams()
  const intialType=searchParams.get("type")
  const [type, setType] = useState(intialType||'');
  const [words, setLength] = useState('');
  const [keyword, setKeyword] = useState('');
  const [response, setResponse] = useState('');
  useEffect(()=>{
    const params={}
    type&&(params.type=type)
    setSearchParams(params)
  },[type])
  const generateContent = () => {
    // Implement the API call to your backend here
    // You can use the type, length, and keyword states to make the request
    const data={type,words,keyword}
    console.log(data)
  fetch(`https://firstopenapi-backend1.onrender.com/generate-response`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }).then(res=>res.json())
  .then(data=>{console.log(data.response);setResponse(data.response)})
  .catch(err=>console.log(err.message))
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        background="linear-gradient(120deg, #f6d365, #fda085)"
        px={4}
      >
        <Select
          placeholder="Select Content Type"
          width="200"
          mb="4"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="joke">Joke</option>
          <option value="story">Story</option>
          <option value="shayari">Shayari</option>
        </Select>
        <Input
          placeholder="Length of Response"
          width="200"
          mb="4"
          type="number"
          onChange={(e) => setLength(e.target.value)}
        />
        <Input
          placeholder="Keyword"
          width="200"
          mb="4"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          width="200"
          mb="4"
          onClick={generateContent}
        >
          Generate
        </Button>
        {response && (
          <Text
            fontSize="lg"
            textAlign="center"
            p="4"
            borderRadius="md"
            background="white"
            boxShadow="md"
          >
            {response}
          </Text>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default FrontEnd;
