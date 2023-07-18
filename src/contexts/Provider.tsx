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
    isLoading: false
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
        default:
            return state;
    }
}

export default function Provider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setLocalStorage = (token: string) => {
        const _token = localStorage.getItem('_token');

        if (!_token) {
            localStorage.setItem("_token", JSON.stringify(token || ""));
        }
    }

    // handle error boundary
    useEffect(() => {
        const controller = new AbortController();
        const _token = JSON.parse(localStorage.getItem("_token") || '""')

        const fetchUser = async () => {
            console.log(true)
            if (_token) {
                dispatch({ type: "LOADING", payload: true })
                try {
                    const res = await api.get('/users/me', {
                        headers: {
                            Authorization: _token.trim()
                        },
                        signal: controller.signal
                    });

                    setLocalStorage(res.data?.token)
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
                dispatch({ type: "LOADING", payload: false });


            }
        }
        !state.user.authenticated && fetchUser();

        return () => controller.abort();
    }, [state.user.authenticated]);

    useEffect(() => {
        if (state.user.authenticated) {
            dispatch({ type: "LOADING", payload: false })
            return
        }
        dispatch({ type: "LOADING", payload: true })
    }, [state.user.authenticated])

    const value = useMemo(() => ({ state: { ...state }, dispatch }), [state, dispatch]);

    return (
        <Context.Provider value={{ ...value }}>
            {children}
        </Context.Provider>
    )
}
