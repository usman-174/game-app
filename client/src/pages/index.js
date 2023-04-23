import GameList from "@/components/GameList";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

import Sidebar from "@/components/SideBar";
import axiosInstance from "@/helpers/axiosInstance";
import { getFavoriteGames } from "@/helpers/manageFavorites";
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
        setGames(data || []);
      } catch (error) {
        setGames([]);
      }
      setLoading(false);
    };
    let q = "/all-games";
    if (query.trim().length) {
      q = "games?q=" + query;
    }
    getGames(q);
    setfavourites(getFavoriteGames());
  }, [query]);
  if (loading)
    return (
      <Text m="auto " textAlign={"center"} fontSize={"lg"}>
        LOADING
      </Text>
    );

  return (
    <>
   
      <Box m={10}>
        <SearchBar setQuery={setQuery} />

        <Link href={`/favorites`}>
          <Button colorScheme="blue" mt="6" size="xs">
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
