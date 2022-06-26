import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Must be used throughout application source code instead of plain
 * `useDispatch` from `"react-redux"`.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Must be used throughout application source code instead of plain
 * `useSelector` from `"react-redux"`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
