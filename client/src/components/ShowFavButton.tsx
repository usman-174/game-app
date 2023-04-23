import {
  addGameToFavorites,
  getFavoriteGames,
  isGameInFavorites,
  removeGameFromFavorites,
} from "@/helpers/manageFavorites";
import { Game } from "@/types/Game";
import { Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ADD_TO_FAV_LABEL = "Add to favorites";
const REMOVE_FROM_FAV_LABEL = "Remove from favorites";
const BLUE_COLOR_SCHEME = "blue";
const RED_COLOR_SCHEME = "red";

type Props = {
  game: Game
  setfavourites: Dispatch<SetStateAction<Game[]>>
}

const ShowFavButton = ({ game, setfavourites }: Props) => {
  const [exists, setExists] = useState<boolean>(isGameInFavorites(game));

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
