import axios from "axios";
import { ReactNode, useEffect, useMemo, useReducer } from "react";
import { ActionType, InitialStateType } from "../types/state.types";
import { api } from "../utils/axios";
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

function reducer(state: InitialStateType, action: ActionType): InitialStateType {
    // fromReducer(state, action)

    switch (action.type) {
        // user
        case "ADD_USER":
            return {
                ...state,
                user: action.payload
            };
        case "REMOVE_USER":
            return {
                ...state,
                user: { name: "", email: "", authenticated: false, role: "", token: "", ticket: "" },
            };
        case "LOADING":
            return {
                ...state,
                isLoading: action.payload
            };
        // From
        case "ADD_FROM":
            return {
                ...state,
                from: {
                    ...state.from,
                    list: action.payload
                }
            };
        case "REMOVE_FROM":
            return {
                ...state,
                from: {
                    ...state.from,
                    list: [{ id: "", name: "" }]
                },
            };
        // TO
        case "ADD_TO":
            return {
                ...state,
                to: action.payload
            };
        case "REMOVE_TO":
            return {
                ...state,
                // to: [{ fromID: "", id: "", name: "" }],
                to: [{ fromID: "", id: "", name: "" }],
            }
        // brand
        case "ADD_BRAND":
            return {
                ...state,
                brand: {
                    ...state.brand,
                    list: action.payload
                }
            };
        case "REMOVE_BRAND":
            return {
                ...state,
                brand: {
                    ...state.brand,
                    list: [{ id: '', name: '' }]
                }
            }
        // location
        case "ADD_LOCATION":
            return {
                ...state,
                locations: action.payload
            };
        case "REMOVE_LOCATION":
            return {
                ...state,
                locations: [{ id: '', name: '' }],
            }

        // bus
        case "ADD_BUSES":
            return {
                ...state,
                buses: action.payload
            };
        case "REMOVE_BUSES":
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

    // handle error boundary
    useEffect(() => {
        const controller = new AbortController();
        const _token = JSON.parse(localStorage.getItem("_token") || '""')

        const fetchUser = async () => {
            dispatch({ type: "LOADING", payload: true })
            if (_token) {
                try {
                    const res = await api.get('/users/me', {
                        headers: {
                            Authorization: _token.trim()
                        },
                        signal: controller.signal
                    });

                    localStorage.setItem("_token", JSON.stringify(res.data?.token || ""));
                    dispatch({
                        type: "ADD_USER", payload: {
                            name: res.data?.fullname,
                            email: res.data?.email,
                            authenticated: true,
                            role: res.data?.role,
                            token: res.data?.token,
                            ticket: res.data?.ticket
                        }
                    })
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const message = error.response?.data?.message;

                        if (error.response?.status === 401) {
                            localStorage.removeItem("_token")
                        }
                    }
                }

            }
            dispatch({ type: "LOADING", payload: false });
        }

        !state.user.authenticated && fetchUser();

        return () => controller.abort();
    }, [state.user.authenticated]);

    console.log(state.isLoading)

    const value = useMemo(() => ({ state: { ...state }, dispatch }), [state, dispatch]);

    return (
        <Context.Provider value={{ ...value }}>
            {children}
        </Context.Provider>
    )
}
