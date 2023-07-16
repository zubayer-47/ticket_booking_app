import { Dispatch } from "react";
import { Action } from "../constants/context-constant";

export type ActionType =
  // user
  | { type: Action.ADD_USER; payload: UserType }
  | { type: Action.UPDATE_USER; payload: UserType }
  | { type: Action.REMOVE_USER }
  | { type: Action.LOADING; payload: boolean }
  // from
  | { type: Action.ADD_FROM; payload: FromType[] }
  | { type: Action.REMOVE_FROM }
  // to
  | { type: Action.ADD_TO; payload: ToType[] }
  | { type: Action.REMOVE_TO };

export type UserType = {
  email: string;
  name: string;
  authenticated: boolean;
  role: string;
  token: string;
  ticket: string;
};

export type FromType = {
  id: string;
  name: string;
};

export type ToType = {
  fromID: string;
  locationID: string;
  locationName: string;
};

export type InitialStateType = {
  state: {
    user: UserType;
    isLoading: boolean;
    from: FromType[];
    to: ToType[];
  };
  dispatch: Dispatch<ActionType>;
  // user
  login(user: UserType): void;
  logout(): void;
  updateUser(user: UserType): void;
  loading(loading: boolean): void;
  // from
  addFrom(from: FromType[]): void;
  removeFrom(): void;
  // to
  addTo(to: ToType[]): void;
  removeTo(): void;
};
