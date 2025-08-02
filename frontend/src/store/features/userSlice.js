import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    quizSubmitted: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setQuizSubmitted: (state, action) => {
      state.quizSubmitted = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setQuizSubmitted } = userSlice.actions;

export default userSlice.reducer;
