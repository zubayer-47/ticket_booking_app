import { createContext } from "react";
import { InitialStateType } from "../constants/context-constant";

export const Context = createContext<InitialStateType>({} as InitialStateType);
