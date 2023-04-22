import {create} from 'zustand'


const initialise=() => {
  const favourites = localStorage.getItem('favs')
 
  if (favourites) {
    set({ favourites: JSON.parse(favourites) })
  }
}
const useStore = create((set, get) => ({
  favourites: initialise(),
  addFavourite: (game) => {
    set(state => ({ favourites: [...state.favourites, game] }))
    localStorage.setItem('favs', JSON.stringify(get().favourites))
  },
  removeFavourite: (game) => {
    set(state => ({ favourites: state.favourites.filter(g => g.id !== game.id) }))
    localStorage.setItem('favs', JSON.stringify(get().favourites))
  },
  isGameInFavourites: (gameId) => {
    const favourites = get().favourites
    return favourites.some(game => game.id === gameId)
  },
  
}))

export default useStore