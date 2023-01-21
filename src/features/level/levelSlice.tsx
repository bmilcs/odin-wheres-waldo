import { createSlice } from "@reduxjs/toolkit";

interface LevelState {
  name: string | null;
  characters: {
    all: {
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
  name: null,
  characters: {
    all: {
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
  name: "level",
  initialState: initialState,
  reducers: {
    addCharacter: (state, action) => {
      state.characters.all.names.push(action.payload);
      state.characters.all.count += 1;
    },
    clearCoordinates: (state) => {
      state.clickedCoordinates = null;
    },
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
    },
  },
});

export const { addCharacter } = levelSlice.actions;

export default levelSlice.reducer;
