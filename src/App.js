import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box, Grid, Heading, Input, PseudoBox, Image, Stat, StatGroup, StatLabel, StatNumber, StatHelpText, StatArrow} from "@chakra-ui/core";

function App() {
  const [value, updateValue] = useState("naruto");
  const [query, updateQuery] = useState("naruto");
  const [movies, updateMovies] = useState({results: []})
  const handleChange = event => updateValue(event.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuery(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const movies = await axios(`https://api.themoviedb.org/3/search/movie?api_key=b419b17ab95d3aeb8f0fcb1737eda29e&query=${query}`);
      updateMovies(movies.data);
    }
    fetchData();
  }, [query])

  return (
    <Box p={2} mx="auto" textAlign="center">
      <Heading as="h2" color="white">DiscoverAnime</Heading>

      <form onSubmit={handleSubmit}>
      <Box d="flex" justifyContent="center">
        <Input w="50%" value={value} onChange={handleChange} placeholder="Enter anime title" p="3"/>
        <PseudoBox borderColor="blue" as="button" size="md" py="2" w="100px" bg="blue" onClick={handleSubmit}>Submit</PseudoBox>
      </Box>
      </form>

      <Box d="flex" flexWrap="wrap" justifyContent="center" alignItems="center" color="white" my="5">
        {movies.results.map(item => {if (item["poster_path"]) {
          return (
          <Box key={item.id} w="40%" h="300px" bg="#111" d="flex" m="3" justifyContent="between" alignItems="start">
            <Image h="100%" objectFit="contain" src={`https://image.tmdb.org/t/p/original/${item["poster_path"]}`} alt={item.title}/>
            <Box px="2" textAlign="left">
              <Heading as="h3" color="orange" my="2" size="md">{item.title}</Heading>
              <span>released: {item["release_date"]}</span>
              <StatGroup>
                <Stat>
                  <StatLabel size="md">Popularity</StatLabel>
                  <StatNumber>{item["popularity"]}</StatNumber>
                  {/*<StatHelpText>*/}
                  {/*  <StatArrow type="increase" />*/}
                  {/*  23.36%*/}
                  {/*</StatHelpText>*/}
                </Stat>

                <Stat>
                  <StatLabel>Vote AVG</StatLabel>
                  <StatNumber>{item["vote_average"]}</StatNumber>
                  {/*<StatHelpText>*/}
                  {/*  <StatArrow type="decrease" />*/}
                  {/*  9.05%*/}
                  {/*</StatHelpText>*/}
                </Stat>
              </StatGroup>

              <p>{item["vote_count"]} people think you should see this series</p>
            </Box>
          </Box>
          )
        }})}
      </Box>
    </Box>
  );
}

export default App;
