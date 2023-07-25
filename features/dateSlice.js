import {createSlice} from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: new Date().toISOString().split('T')[0], //YYYY-MM-DD format
  reducers: {
    setDate: (state, action) => action.payload,
  },
});

export const {setDate} = dateSlice.actions;
export default dateSlice.reducer;
