import {
  addGameToFavorites,
  getFavoriteGames,
  isGameInFavorites,
  removeGameFromFavorites,
} from "@/helpers/manageFavorites";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ADD_TO_FAV_LABEL = "Add to favorites";
const REMOVE_FROM_FAV_LABEL = "Remove from favorites";
const BLUE_COLOR_SCHEME = "blue";
const RED_COLOR_SCHEME = "red";

const ShowFavButton = ({ game, setfavourites }) => {
  const [exists, setExists] = useState(isGameInFavorites(game));

  const handleAddToFav = () => {
    addGameToFavorites(game);
    setfavourites(getFavoriteGames());
    setExists(true);
  };

  const handleRemoveFromFav = () => {
    removeGameFromFavorites(game);
    setfavourites(getFavoriteGames());
    setExists(false);
  };
  useEffect(() => {
    setExists(isGameInFavorites(game));
  }, []);

  return (
    <>
      {exists ? (
        <Button
          onClick={handleRemoveFromFav}
          mt={2}
          size="xs"
          colorScheme={RED_COLOR_SCHEME}
        >
          {REMOVE_FROM_FAV_LABEL}
        </Button>
      ) : (
        <Button
          onClick={handleAddToFav}
          mt={2}
          size="xs"
          colorScheme={BLUE_COLOR_SCHEME}
        >
          {ADD_TO_FAV_LABEL}
        </Button>
      )}
    </>
  );
};
export default ShowFavButton;
