import GameList from "@/components/GameList";
import { getFavoriteGames } from "@/helpers/manageFavorites";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const favorites = () => {
  const [favourites, setfavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setfavourites(getFavoriteGames());
    setLoading(false);
  }, []);
  if (loading)
    return (
      <Text m="auto " textAlign={"center"} fontSize={"lg"}>
        LOADING
      </Text>
    );
  return (
    <Box p="5" m="5">
      <Button
        leftIcon={<ArrowBackIcon />}
        size="sm"
        onClick={() => {
          router.back();
        }}
      ></Button>
      <Text textAlign={"center"} m="10" fontSize={"2xl"} fontWeight={"bold"}>
        My Favourites
      </Text>
      {favourites.length ? (
        <GameList games={favourites} setfavourites={setfavourites} />
      ) : (
        <Text m="5 " fontSize={"2xl"} textAlign="center">
          There are no Favourites
        </Text>
      )}
    </Box>
  );
};

export default favorites;
