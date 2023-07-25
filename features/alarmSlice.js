import {createSlice} from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: new Date(), // Initial selected date
  reducers: {
    setDate: (state, action) => action.payload,
  },
});

export const {setDate} = dateSlice.actions;
export default dateSlice.reducer;
