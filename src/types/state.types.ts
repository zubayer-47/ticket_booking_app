import { Dispatch } from "react";
import { Action } from "../constants/context-constant";

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

export type BusBrandType = {
  id: string;
  name: string;
  createdBy: string;
};

export type BusFromType = {
  id: string;
  location: IdNameBrandLocationFromType;
};

export type BusType = {
  id: string;
  type: string;
  brand: BusBrandType;
  journey_date: string;
  from: BusFromType[];
};

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
  | { type: Action.REMOVE_LOCATION }
  // buses
  | { type: Action.ADD_BUSES; payload: BusType[] }
  | { type: Action.REMOVE_BUSES };

// initialStateType
export type InitialStateType = {
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
  buses: BusType[];
};

// store type
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
    buses: BusType[];
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
  // buses
  addBuses(buses: BusType[]): void;
  removeBuses(): void;
};
