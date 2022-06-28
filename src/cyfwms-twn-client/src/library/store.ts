import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import RegistrationReducer from "../features/register/registerSlice";
import codetableReducer from "../features/codetable/codetableSlice";
import contactReducer from "../features/contact/contactSlice";
import householdReducer from "../features/householdMember/householdSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: RegistrationReducer,
    codetable: codetableReducer,
    contact:contactReducer,
    household:householdReducer
  },
});

/**
 * Infer the `AppDispatch` type from the store itself.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Infer the `RootState` type from the store itself.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Infer the `AppThunk` type from the store itself.
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
