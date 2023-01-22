import { createSlice } from "@reduxjs/toolkit";

interface LevelState {
  id: string | null;
  characters: {
    remaining: {
      names: Array<string>;
      count: number;
    };
    found: {
      names: Array<string>;
      count: number;
    };
  };
  timer: number;
  clickedCoordinates: Array<number> | null;
  selectedCharacter: string | null;
}

const initialState: LevelState = {
  id: null,
  characters: {
    remaining: {
      names: [],
      count: 0,
    },
    found: {
      names: [],
      count: 0,
    },
  },
  timer: 0,
  clickedCoordinates: null,
  selectedCharacter: null,
};

export const levelSlice = createSlice({
  name: "levels",
  initialState: initialState,
  reducers: {
    setLevelID: (state, { payload }) => {
      state.id = payload;
    },
    addCharacter: (state, { payload }) => {
      state.characters.remaining.names = payload;
      state.characters.remaining.count = payload.length;
    },
    clearCoordinates: (state) => {
      state.clickedCoordinates = null;
    },
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
    },
  },
});

export const {
  setLevelID,
  addCharacter,
  clearCoordinates,
  clearSelectedCharacter,
} = levelSlice.actions;

export default levelSlice.reducer;
