import { ReactNode, useCallback, useMemo, useReducer } from "react";
import { Action } from "../constants/context-constant";
import { ActionType, BusType, IdNameBrandLocationFromType, InitialStateType, ToType, UserType } from "../types/state.types";
import { Context } from "./Context";

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
    // to: [{ fromID: "", id: "", name: "" }],
    to: [{ fromID: "", id: "", name: "" }],
    isLoading: false,
    brand: {
        selectedBrandId: '',
        list: [{ id: '', name: '' }]
    },
    locations: [{ id: '', name: '' }],
    buses: [{ id: '', brand: { id: "", createdBy: "", name: "" }, from: [{ id: "", location: { id: "", name: "" } }], journey_date: "", type: "" }]
};

function fromReducer(state: InitialStateType, action: ActionType) {
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
    // fromReducer(state, action)

    switch (action.type) {
        // user
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
        // From
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
        // TO
        case Action.ADD_TO:
            return {
                ...state,
                to: action.payload
            };
        case Action.REMOVE_TO:
            return {
                ...state,
                // to: [{ fromID: "", id: "", name: "" }],
                to: [{ fromID: "", id: "", name: "" }],
            }
        // brand
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
        // location
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

        // bus
        case Action.ADD_BUSES:
            return {
                ...state,
                buses: action.payload
            };
        case Action.REMOVE_BUSES:
            return {
                ...state,
                buses: [{ id: '', brand: { id: "", createdBy: "", name: "" }, from: [{ id: "", location: { id: "", name: "" } }], journey_date: "", type: "" }]
            }
        default:
            return state;
    }
}

export default function Provider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // user
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

    // from
    const addFrom = useCallback((from: IdNameBrandLocationFromType[]) => {
        dispatch({ type: Action.ADD_FROM, payload: from });
    }, [])
    const removeFrom = useCallback(() => {
        dispatch({ type: Action.REMOVE_FROM });
    }, [])

    // TO
    const addTo = useCallback((to: ToType[]) => {
        dispatch({ type: Action.ADD_TO, payload: to });
    }, [])
    const removeTo = useCallback(() => {
        dispatch({ type: Action.REMOVE_TO });
    }, [])

    // buses
    const addBuses = useCallback((buses: BusType[]) => {
        dispatch({ type: Action.ADD_BUSES, payload: buses });
    }, [])
    const removeBuses = useCallback(() => {
        dispatch({ type: Action.REMOVE_BUSES });
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
        removeTo,
        addBuses,
        removeBuses
    }), [state, login, logout, updateUser, loading, dispatch, addFrom, removeFrom, addTo, removeTo, addBuses, removeBuses]);

    return (
        <Context.Provider value={{ ...value }}>
            {children}
        </Context.Provider>
    )
}
