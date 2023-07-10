import { ReactNode, useCallback, useMemo, useReducer } from "react";
import { Action, ActionType, UserType } from "../constants/context-constant";
import { Context } from "./Context";

const initialState = {
    state: {
        user: {
            name: "",
            email: '',
            authenticated: false,
            role: "",
            token: "",
            ticket: ""
        },
        isLoading: false
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
        case Action.UPDATE_USER:
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
                    user: { name: "", email: "", authenticated: false, role: "", token: "", ticket: "" },
                },
            };
        case Action.LOADING:
            return {
                state: {
                    ...state.state,
                    isLoading: action.payload
                },
            };

        default:
            return state;
    }
}

export default function Provider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = useCallback((user: UserType) => {
        dispatch({ type: Action.ADD_USER, payload: user })
    }, [])

    const logout = useCallback(() => {
        dispatch({ type: Action.REMOVE_USER })
    }, [])

    const updateUser = useCallback((user: UserType) => {
        dispatch({ type: Action.UPDATE_USER, payload: user })
    }, [])

    const loading = useCallback((loading: boolean) => {
        dispatch({ type: Action.LOADING, payload: loading })
    }, [])

    const value = useMemo(
        () => ({ ...state, login, logout, updateUser, loading }),
        [state, login, logout, updateUser, loading]
    );

    return (
        <Context.Provider value={{ ...value, dispatch }}>
            {children}
        </Context.Provider>
    )
}
