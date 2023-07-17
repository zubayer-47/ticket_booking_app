import { Dispatch } from "react";
import { Action } from "../constants/context-constant";

export type ActionType =
  // user
  | { type: Action.ADD_USER; payload: UserType }
  | { type: Action.UPDATE_USER; payload: UserType }
  | { type: Action.REMOVE_USER }
  | { type: Action.LOADING; payload: boolean }
  // from
  | { type: Action.ADD_FROM; payload: IdNameBrandLocationFromType[] }
  | { type: Action.REMOVE_FROM }
  // fromId
  | { type: Action.ADD_FROM_ID; payload: string }
  | { type: Action.REMOVE_FROM_ID }
  // to
  | { type: Action.ADD_TO; payload: ToType[] }
  | { type: Action.REMOVE_TO }
  // brand
  | { type: Action.ADD_BRAND; payload: IdNameBrandLocationFromType[] }
  | { type: Action.REMOVE_BRAND }
  // brandId
  | { type: Action.ADD_BRAND_ID; payload: string }
  | { type: Action.REMOVE_BRAND_ID }
  // location
  | { type: Action.ADD_LOCATION; payload: IdNameBrandLocationFromType[] }
  | { type: Action.REMOVE_LOCATION };

export type UserType = {
  email: string;
  name: string;
  authenticated: boolean;
  role: string;
  token: string;
  ticket: string;
};

export type IdNameBrandLocationFromType = {
  id: string;
  name: string;
};

export type ToType = {
  fromID: string;
  id: string;
  name: string;
};

export type StoreType = {
  state: {
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
  dispatch: Dispatch<ActionType>;
  // user
  login(user: UserType): void;
  logout(): void;
  updateUser(user: UserType): void;
  loading(loading: boolean): void;
  // from
  addFrom(from: IdNameBrandLocationFromType[]): void;
  removeFrom(): void;
  // to
  addTo(to: ToType[]): void;
  removeTo(): void;
};
