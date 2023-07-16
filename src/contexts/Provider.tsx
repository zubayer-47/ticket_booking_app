import { ReactNode, useCallback, useMemo, useReducer } from "react";
import { Action } from "../constants/context-constant";
import { ActionType, FromType, ToType, UserType } from "../types/state.types";
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
        from: [{ id: "", name: "" }],
        to: [{ fromID: "", locationID: "", locationName: "" }],
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
        case Action.ADD_FROM:
            return {
                state: {
                    ...state.state,
                    from: action.payload
                },
            };
        case Action.REMOVE_FROM:
            return {
                state: {
                    ...state.state,
                    from: []
                },
            };
        case Action.ADD_TO:
            return {
                state: {
                    ...state.state,
                    to: action.payload
                },
            };
        case Action.REMOVE_TO:
            return {
                state: {
                    ...state.state,
                    to: []
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

    const addFrom = useCallback((from: FromType[]) => {
        dispatch({ type: Action.ADD_FROM, payload: from });
    }, [])

    const removeFrom = useCallback(() => {
        dispatch({ type: Action.REMOVE_FROM });
    }, [])

    const addTo = useCallback((to: ToType[]) => {
        dispatch({ type: Action.ADD_TO, payload: to });
    }, [])

    const removeTo = useCallback(() => {
        dispatch({ type: Action.REMOVE_TO });
    }, [])

    const value = useMemo(
        () => ({ ...state, login, logout, updateUser, addFrom, removeFrom, loading, dispatch, addTo, removeTo }),
        [state, login, logout, updateUser, loading, dispatch, addFrom, removeFrom, addTo, removeTo]
    );

    return (
        <Context.Provider value={{ ...value }}>
            {children}
        </Context.Provider>
    )
}
