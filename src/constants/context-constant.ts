import { Dispatch } from "react";

export const enum Action {
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  UPDATE_USER = "UPDATE_USER",
  LOADING = "LOADING",
}

export type ActionType =
  | { type: Action.ADD_USER; payload: UserType }
  | { type: Action.UPDATE_USER; payload: UserType }
  | { type: Action.REMOVE_USER }
  | { type: Action.LOADING; payload: boolean };

export type UserType = {
  email: string;
  name: string;
  authenticated: boolean;
  role: string;
  token: string;
  ticket: string;
};

export type InitialStateType = {
  state: {
    user: UserType;
    isLoading: boolean;
  };
  login(user: UserType): void;
  logout(): void;
  updateUser(user: UserType): void;
  loading(loading: boolean): void;
  dispatch: Dispatch<ActionType>;
};
