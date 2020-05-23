import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Image,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Text,
  Stat,
  StatNumber,
  StatLabel,
  StatGroup,
  InputGroup,
  Icon,
  InputRightElement,
  Link,
  Spinner
} from "@chakra-ui/core";

function App() {
  const [value, updateValue] = useState("");
  const [query, updateQuery] = useState("psycho-pass");
  const [movies, updateMovies] = useState({results: []})
  const handleChange = event => updateValue(event.target.value);
  const handleSubmit = event => {
    updateQuery(value);
    event.preventDefault();
  }
  const moviesToDisplay = [];

  useEffect(() => {
    const fetchData = async () => {
      const movies = await axios(`https://api.themoviedb.org/3/search/movie?api_key=b419b17ab95d3aeb8f0fcb1737eda29e&query=${query}`);
      updateMovies(movies.data);
    }
    if (query) fetchData();
  }, [query])

  const BasicUsage = props => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Box h="500px" bg="#111" cursor="pointer" onClick={onOpen}>
          <Image h="100%" w="100%" objectFit="cover" objectPosition="top" src={`https://image.tmdb.org/t/p/original/${props.poster}`} alt={props.title}/>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.original_title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image size="100%" objectFit="cover" objectPosition="center" src={`https://image.tmdb.org/t/p/original/${props.poster}`} alt={props.title}/>
              <Heading as="h6" m="0px">Synopsis</Heading>
              <Text>
                {props.overview}
              </Text>
              <StatGroup>
                <Stat>
                  <StatLabel>Total Vote</StatLabel>
                  <StatNumber>{props.vote}</StatNumber>
                </Stat>

                <Stat>
                  <StatLabel as="h2">Popularity</StatLabel>
                  <StatNumber>{props.popularity}</StatNumber>
                </Stat>
              </StatGroup>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Box p={2} mx="auto" textAlign="center">
      <Heading as="h2" color="white"><span>Discover</span>Anime</Heading>

      <form onSubmit={handleSubmit}>
      <InputGroup size="md" w="70%" m="auto">
        <Input value={value} onChange={handleChange} placeholder="Enter anime title" m="0"/>
        <InputRightElement children={<Icon name="search" color="green.500" />}/>
      </InputGroup>
      </form>

      <Heading as="h4" color="#fff">Search result for <span>{query}</span></Heading>

      <SimpleGrid color="white" spacing="40px" columns={[1, null, 3]} width="90%" mx="auto" my="5em">
        {movies.results.forEach( item => {if (item["poster_path"]) {
          moviesToDisplay.push(<BasicUsage
            key={item["id"]}
            title={item["title"]}
            original_title={item["original_title"]}
            overview={item["overview"]}
            poster={item["poster_path"]}
            vote={item["vote_count"]}
            popularity={item["popularity"]}
          />);
        }})}
        { moviesToDisplay }
      </SimpleGrid>
      { moviesToDisplay.length === 0 ? <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
        marginBottom="3em"
      /> : null }
      <Text color="#fff">
        Developed by
        <Link href="https://kodekage.netlify.app" isExternal color="orangered"> Prosper Opara <Icon name="external-link" mx="2px" /></Link>
        Data gotten from
        <Link href="https://www.themoviedb.org/" isExternal color="orangered"> TMBD <Icon name="external-link" mx="2px" /></Link>
      </Text>
    </Box>
  );
}

export default App;
