import {createSlice} from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  
  initialState: {
    startDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    endDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    month: new Date().toISOString().split('T')[0], // YYYY-MM format
  },
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const {setStartDate, setEndDate, setMonth} = dateSlice.actions;
export default dateSlice.reducer;
