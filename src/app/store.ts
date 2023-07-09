import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice";
import columnsReducer from "../features/columns/columnsSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
