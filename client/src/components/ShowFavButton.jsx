import { addFav, existFav, getFav, removeFav } from "@/helpers/manageFavorites";
import { Button } from "@chakra-ui/react";

const ShowFavButton = ({ game, setfavourites }) => {
    const exists = existFav(game);
  
    if (!exists) {
      return (
        <Button
          onClick={() => {
            addFav(game);
            setfavourites(getFav());
          }}
          mt={2}
          size="xs"
          colorScheme="blue"
        >
          Add to favorite
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            removeFav(game);
            setfavourites(getFav());
          }}
          mt={2}
          size="xs"
          colorScheme="red"
        >
          Remove from favorite
        </Button>
      );
    }
  };
  export default ShowFavButton