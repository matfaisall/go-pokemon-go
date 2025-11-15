const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  selectedPokemon: null,
  favorites: [],
  filters: {
    types: [],
    generation: undefined,
    search: "",
  },
  viewMode: "grid",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    toggleFavorite: (state, action) => {},
  },
});

export const { setSelectedPokemon, toggleFavorite } = pokemonSlice.actions;

export default pokemonSlice.reducer;
