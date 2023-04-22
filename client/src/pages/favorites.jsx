import GameList from "@/components/GameList";
import { getFav } from "@/helpers/manageFavorites";
import useStore from "@/store/store";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const favorites = () => {
  const [favourites, setfavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite,initialise } =
  useStore((state) => ({
    favorites: state.favorites,
    addToFavorites: state.addToFavorites,
    removeFromFavorites: state.removeFromFavorites,
    isFavorite: state.isFavorite,
    initialise:state.initialise
  }));
  useEffect(() => {
    setfavourites(getFav());
    setLoading(false);
    console.log({favorites});
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
