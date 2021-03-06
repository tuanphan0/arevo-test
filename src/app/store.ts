import { configureStore, ThunkAction, Action, getDefaultMiddleware  } from '@reduxjs/toolkit';
import countriesReducer from '../features/countries/countriesSlice';
import summaryReducer from '../features/summary/summarySlice';

export const store = configureStore({
  reducer: {
    summary:summaryReducer,
    country:countriesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
