import { ReactNode, useReducer } from "react";
import { Action, ActionType } from "../constants/context-constant";
import { Context } from "./Context";

const initialState = {
    state: {
        user: {
            name: "",
            email: '',
            authenticated: false,
            role: ""
        },
    },
};

function reducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
        case Action.ADD_USER:
            return {
                state: {
                    ...state.state,
                    user: action.payload,
                },
            };
        case Action.REMOVE_USER:
            return {
                state: {
                    ...state.state,
                    user: { name: "", email: "", authenticated: false, role: "" },
                },
            };

        default:
            return state;
    }
}


export default function Provider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state: state.state, dispatch }}>
            {children}
        </Context.Provider>
    )
}
