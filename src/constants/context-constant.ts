import { Dispatch } from "react";

export const enum Action {
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  UPDATE_USER = "UPDATE_USER",
}

export type UserType = {
  email: string;
  name: string;
  authenticated: boolean;
  role: string;
  token: string;
};

export type ActionType =
  | { type: Action.ADD_USER; payload: UserType }
  | { type: Action.REMOVE_USER };

export type InitialStateType = {
  state: {
    user: UserType;
  };
  login(user: UserType): void;
  logout(): void;
  dispatch: Dispatch<ActionType>;
};
