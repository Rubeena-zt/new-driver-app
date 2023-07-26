import {createSlice} from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
  },
  // reducers: {
  //   setDate: (state, action) => {
  //     state.date = action.payload.date || state.date;
  //     state.month = action.payload.month || state.month;
  //   },
  // },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const {setDate} = dateSlice.actions;
export default dateSlice.reducer;
