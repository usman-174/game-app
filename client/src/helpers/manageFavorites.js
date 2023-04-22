const addFav = (game) => {
  if (game) {
    const data = JSON.parse(localStorage.getItem("favs")) || [];

    if (!existFav(game)) {
      data.push(game);
      localStorage.setItem("favs", JSON.stringify(data));
    }
  }
};
const removeFav = (game) => {
  if (game) {
    let data = JSON.parse(localStorage.getItem("favs"));
    if (existFav(game)) {
      data = data.filter((gamex) => gamex.id !== game.id);
      localStorage.setItem("favs", JSON.stringify(data));
    }
  }
};
const getFav = () => {
  return JSON.parse(localStorage.getItem("favs"));
};
const existFav = (game) => {
  const favs = localStorage.getItem("favs");
  if (favs && favs.length > 0) {
    return JSON.parse(favs).find((x) => x.id == game.id);
  }
  return null;
}
export { getFav, removeFav, addFav ,existFav};
