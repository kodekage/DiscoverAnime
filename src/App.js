import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Input, PseudoBox } from "@chakra-ui/core";

function App() {
  const [value, updateValue] = useState("avengers");
  const [query, updateQuery] = useState("avengers");
  const [movies, updateMovies] = useState({data: []})
  const handleChange = event => updateValue(event.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuery(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://www.omdbapi.com/?t=${query}&apikey=75ab7332`);
      updateMovies(result.data);
    }
    fetchData();
  }, [query])

  return (
    <Box p={2} mx="auto" textAlign="center">
      <Heading as="h2" color="white">Anime Finder</Heading>

      <Box Box d="flex" justifyContent="center">
        <Input w="50%" value={value} onChange={handleChange} placeholder="Enter movie name" p="3"/>
        <PseudoBox borderColor="blue" as="button" size="md" py="2" w="100px" bg="blue" onClick={handleSubmit}>Submit</PseudoBox>
      </Box>

      {/*<Box color="white" my="5" border="1px solid gray" width="50%" mx="auto">*/}
      {/*  <header as="h3">{movies["Title"]}</header>*/}
      {/*</Box>*/}
    </Box>
  );
}

export default App;
