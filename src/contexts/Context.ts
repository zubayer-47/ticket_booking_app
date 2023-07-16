import { createContext } from "react";
import { InitialStateType } from "../types/state.types";

export const Context = createContext<InitialStateType>({} as InitialStateType);
