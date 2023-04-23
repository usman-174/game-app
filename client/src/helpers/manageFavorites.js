const addGameToFavorites = (game) => {
  try {
    if (!game) return;

    const favorites = getFavoriteGames();
    if (!isGameInFavorites(game)) {
      favorites.push(game);
      localStorage.setItem("favoriteGames", JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error adding game to favorites:", error);
  }
};

const removeGameFromFavorites = (game) => {
  try {
    if (!game) return;

    const favorites = getFavoriteGames();
    if (isGameInFavorites(game)) {
      const updatedFavorites = favorites.filter(
        (favGame) => favGame.id !== game.id
      );
      localStorage.setItem("favoriteGames", JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error("Error removing game from favorites:", error);
  }
};

const getFavoriteGames = () => {
  try {
    const favorites = JSON.parse(localStorage.getItem("favoriteGames")) || [];
    console.log(favorites);
    return favorites;
  } catch (error) {
    console.error("Error getting favorite games:", error);
    return [];
  }
};

const isGameInFavorites = (game) => {
  try {
    const favorites = getFavoriteGames();
    const found = favorites.some((favGame) => favGame.id === game.id);
  console.log(found)
  return found
  } catch (error) {
    console.error("Error checking if game is in favorites:", error);
    return false;
  }
};
export {
  getFavoriteGames,
  removeGameFromFavorites,
  addGameToFavorites,
  isGameInFavorites,
};
