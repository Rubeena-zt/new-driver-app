import {configureStore} from '@reduxjs/toolkit';
import dateReducer from './dateSlice';
import alarmReducer from './alarmSlice'

const store = configureStore({
  reducer: {
    date: dateReducer,
    alarm: alarmReducer,
  },
});

export default store;
