
/**
 * Custom hook to dispatch actions in the Redux store.
 * 
 * @returns {AppDispatch} The dispatch function from the Redux store.
 */

/**
 * Custom hook to access the Redux store's state.
 * 
 * @type {TypedUseSelectorHook<RootState>}
 */

import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";

import { AppDispatch, RootState } from "@/store";




export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;








