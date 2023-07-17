import { ReactNode, useCallback, useMemo, useReducer } from "react";
import { Action } from "../constants/context-constant";
import { ActionType, IdNameBrandLocationFromType, ToType, UserType } from "../types/state.types";
import { Context } from "./Context";

type InitialStateType = {
    user: UserType;
    isLoading: boolean;
    from: {
        selectedFromId: string;
        list: IdNameBrandLocationFromType[];
    };
    to: ToType[];
    brand: {
        selectedBrandId: string;
        list: IdNameBrandLocationFromType[];
    };
    locations: IdNameBrandLocationFromType[];
};

const initialState: InitialStateType = {
    user: {
        name: "",
        email: '',
        authenticated: false,
        role: "",
        token: "",
        ticket: ""
    },
    from: {
        selectedFromId: '',
        list: [{ id: "", name: "" }],
    },
    to: [{ fromID: "", id: "", name: "" }],
    isLoading: false,
    brand: {
        selectedBrandId: '',
        list: [{ id: '', name: '' }]
    },
    locations: [{ id: '', name: '' }]
};

function fromToReducer(state: InitialStateType, action: ActionType) {
    switch (action.type) {
        case Action.ADD_FROM:
            return {
                ...state,
                from: {
                    ...state.from,
                    list: action.payload
                }
            };
        case Action.REMOVE_FROM:
            return {
                ...state,
                from: {
                    ...state.from,
                    list: [{ id: "", name: "" }]
                },
            };
        case Action.ADD_TO:
            return {
                ...state,
                to: action.payload
            };
        case Action.REMOVE_TO:
            return {
                ...state,
                to: [{ fromID: "", id: "", name: "" }],
            }
    }
}

function reducer(state: InitialStateType, action: ActionType): InitialStateType {

    const fromTo = fromToReducer(state, action);

    // console.log(fromTo )

    switch (action.type) {
        case Action.ADD_USER:
            return {
                ...state,
                user: action.payload
            };
        case Action.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        case Action.REMOVE_USER:
            return {
                ...state,
                user: { name: "", email: "", authenticated: false, role: "", token: "", ticket: "" },
            };
        case Action.LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case Action.ADD_FROM:
            return {
                ...state,
                from: {
                    ...state.from,
                    list: action.payload
                }
            };
        case Action.REMOVE_FROM:
            return {
                ...state,
                from: {
                    ...state.from,
                    list: [{ id: "", name: "" }]
                },
            };
        case Action.ADD_TO:
            return {
                ...state,
                to: action.payload
            };
        case Action.REMOVE_TO:
            return {
                ...state,
                to: [{ fromID: "", id: "", name: "" }],
            }
        case Action.ADD_BRAND:
            return {
                ...state,
                brand: {
                    ...state.brand,
                    list: action.payload
                }
            };
        case Action.REMOVE_BRAND:
            return {
                ...state,
                brand: {
                    ...state.brand,
                    list: [{ id: '', name: '' }]
                }
            }
        case Action.ADD_LOCATION:
            return {
                ...state,
                locations: action.payload
            };
        case Action.REMOVE_LOCATION:
            return {
                ...state,
                locations: [{ id: '', name: '' }],
            }
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

    const addFrom = useCallback((from: IdNameBrandLocationFromType[]) => {
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

    const value = useMemo(() => ({
        state: {
            ...state
        },
        login,
        logout,
        updateUser,
        addFrom,
        removeFrom,
        loading,
        dispatch,
        addTo,
        removeTo
    }), [state, login, logout, updateUser, loading, dispatch, addFrom, removeFrom, addTo, removeTo]);

    return (
        <Context.Provider value={{ ...value }}>
            {children}
        </Context.Provider>
    )
}
