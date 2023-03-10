import { createSlice } from "@reduxjs/toolkit";
import formatTime from "../../utils/formatTime";

export interface LevelState {
  id: string;
  characters: {
    remaining: {
      names: Array<string>;
      count: number;
    };
    found: {
      names: Array<string>;
      count: number;
      coordinates: number[][];
    };
  };
  timer: {
    value: number;
    enabled: boolean;
  };
  headerHeightInPixels: number;
  status: "active" | "complete";
  clickedCoordinates: Array<number>;
}

const initialState: LevelState = {
  id: "",
  characters: {
    remaining: {
      names: [],
      count: 0,
    },
    found: {
      names: [],
      coordinates: [],
      count: 0,
    },
  },
  timer: {
    value: 0,
    enabled: false,
  },
  headerHeightInPixels: 0,
  status: "active",
  clickedCoordinates: [0, 0],
};

export const levelSlice = createSlice({
  name: "levels",
  initialState: initialState,
  reducers: {
    setLevelID: (state, { payload }) => {
      state.id = payload;
    },
    setHeaderHeight: (state, { payload }) => {
      state.headerHeightInPixels = payload;
    },
    addCharacter: (state, { payload }) => {
      state.characters.remaining.names = payload;
      state.characters.remaining.count = payload.length;
    },
    moveCharacterToFoundArray: (state, { payload }) => {
      const character = payload;
      state.characters.remaining.names =
        state.characters.remaining.names.filter((name) => name !== character);
      state.characters.found.names.push(character);
    },
    setClickedCoordinates: (state, { payload }) => {
      state.clickedCoordinates = payload;
    },
    clearCoordinates: (state) => {
      state.clickedCoordinates = [0, 0];
    },
    updateCharacterCounts: (state) => {
      state.characters.found.count = state.characters.found.names.length;
      state.characters.remaining.count =
        state.characters.remaining.names.length;
    },
    resetLevel: (state) => {
      state.characters.found.names = [];
      state.timer.value = 0;
      state.timer.enabled = false;
      state.status = "active";
      updateCharacterCounts();
    },
    startTimer: (state) => {
      state.timer.enabled = true;
    },
    stopTimer: (state) => {
      state.timer.enabled = false;
    },
    incrementTimer: (state) => {
      state.timer.value = state.timer.value += 1;
    },
    gameOver: (state) => {
      state.status = "complete";
    },
  },
});

export const {
  addCharacter,
  clearCoordinates,
  gameOver,
  incrementTimer,
  moveCharacterToFoundArray,
  resetLevel,
  setClickedCoordinates,
  setHeaderHeight,
  setLevelID,
  startTimer,
  stopTimer,
  updateCharacterCounts,
} = levelSlice.actions;

export default levelSlice.reducer;
