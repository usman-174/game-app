import GameList from "@/components/GameList";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

import axiosInstance from "@/helpers/axiosInstance";
import { getFav } from "@/helpers/manageFavorites";
import Link from "next/link";



export default function Home() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [_, setfavourites] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
   
    const getGames = async (q) => {
      try {
        const { data } = await axiosInstance.get(q);
        if (data) {
          setGames(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    };
    let q = "/game";
    if (query.trim().length) {
      q = "game?q=" + query;
    }
    getGames(q);
    setfavourites(getFav());
  }, [query]);
  if (loading)
    return (
      <Text m="auto " textAlign={"center"} fontSize={"lg"}>
        LOADING
      </Text>
    );

  return (
    <>
      <Head>
        <title>GAMES APP</title>
        <meta name="description" content="GAMES APP" />
      </Head>

      <Box m={10}>
        <SearchBar setQuery={setQuery} />

        <Link href={`/favorites`}>
          <Button colorScheme="blue" mt="6" size="xs" >
            Show favourites
          </Button>
        </Link>
        <Flex w="100%" direction={{ base: "column-reverse", md: "row" }}>
          {games.length ? (
            <Box w={{ base: "100%", lg: "70%" }} px={{ base: 2, lg: 8 }}>
              <Flex flexWrap="wrap" justifyContent="space-between">
                <GameList games={games} setfavourites={setfavourites} />
              </Flex>
            </Box>
          ) : (
            <Text m="5 " w="100%" fontSize={"2xl"} textAlign="center">
              There are no Games Available
            </Text>
          )}
          <Sidebar />
        </Flex>
      </Box>
    </>
  );
}
const Sidebar = () => {
  const [topGames, setTopames] = useState([]);

  useEffect(() => {
    const getGames = async (q) => {
      try {
        const { data } = await axiosInstance.get("/games-top");
        if (data) {
          setTopames(data);
        }
      } catch (error) {}
    };
    getGames();
  }, []);
  return (
    <Box ml={{ md: "auto" }} w={{ base: "100%", lg: "30%" }}>
      <Text textAlign={"center"} m="2" fontSize={"3xl"} fontWeight={"bold"}>
        Top 10
      </Text>

      <Flex
        overflowX={{ base: "scroll", md: "hidden" }}
        direction={{ base: "row", md: "column" }}
        gap="2"
        spacing={4}
        align="flex-start"
      >
        {topGames.map((game) => (
          <Box
            key={game.id}
            boxShadow={"sm"}
            textAlign={{ md: "left", base: "center" }}
            p={2}
            h="100%"
          >
            <Link href={`/game/${game.id}`}>
              <Heading as="h2" size="sm" mb={2}>
                {game.name}
              </Heading>
            </Link>
            <Text mb={1} fontSize={"small"}>
              Percent Recommended: {game.percentRecommended}%
            </Text>
            <Text mb={1} fontSize={"small"}>
              Number of Reviews: {game.numReviews}
            </Text>
            <Text mb={1} fontSize={"small"}>
              Top Critic Score: {game.topCriticScore}
            </Text>
            <Text>Tier: {game.tier}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
