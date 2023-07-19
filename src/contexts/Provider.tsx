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
                user: action.payload,
                isLoading: false,
            };
        case "REMOVE_USER":
            return {
                ...state,
                user: { name: "", email: "", authenticated: false, role: "", token: "", ticket: "" },
                isLoading: false
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
        const _token = localStorage.getItem("_token")
        // console.log(_token?.length);

        if (!_token?.length && !!token.length) {
            localStorage.setItem("_token", JSON.stringify(token));
        }
    }

    // handle error boundary
    useEffect(() => {
        const controller = new AbortController();
        const userToken = localStorage.getItem("_token");

        const fetchUser = async () => {
            try {
                const res = await api.get('/users/me', {
                    headers: {
                        Authorization: userToken
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
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // const message = error.response?.data?.message;
                    // handle error manually
                    // if (error.status)
                    console.log(error)
                }
            }

            dispatch({ type: "LOADING", payload: false })
        }

        dispatch({ type: "LOADING", payload: true })
        fetchUser();

        return () => controller.abort();
    }, [state.user.authenticated, state.isLoading]);

    const value = useMemo(() => ({ state: { ...state }, dispatch }), [state, dispatch]);

    return (
        <Context.Provider value={{ ...value }}>
            {children}
        </Context.Provider>
    )
}
