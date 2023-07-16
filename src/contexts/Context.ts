import { createContext } from "react";
import { StoreType } from "../types/state.types";

export const Context = createContext<StoreType>({} as StoreType);
