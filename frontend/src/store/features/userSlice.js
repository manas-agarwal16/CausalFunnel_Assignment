import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    marks: null,
    answers: [],
  },
  reducers: {
    setEmail: (state, action) => {      
      state.email = action.payload;
    },
    setMarks: (state, action) => {
      state.marks = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setMarks, setAnswers } = userSlice.actions;

export default userSlice.reducer;
