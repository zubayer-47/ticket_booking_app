import { createContext } from "react";
import { Store } from "../constants/context-constant";

export const Context = createContext<Store>({} as Store);
