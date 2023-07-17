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
  | { type: "ADD_USER"; payload: UserType }
  | { type: "REMOVE_USER" }
  | { type: "LOADING"; payload: boolean }
  // from
  | { type: "ADD_FROM"; payload: IdNameBrandLocationFromType[] }
  | { type: "REMOVE_FROM" }
  // fromId
  | { type: "ADD_FROM_ID"; payload: string }
  | { type: Action.REMOVE_FROM_ID }
  // to
  | { type: "ADD_TO"; payload: ToType[] }
  | { type: "REMOVE_TO" }
  // brand
  | { type: "ADD_BRAND"; payload: IdNameBrandLocationFromType[] }
  | { type: "REMOVE_BRAND" }
  // brandId
  | { type: "ADD_BRAND_ID"; payload: string }
  | { type: "REMOVE_BRAND_ID" }
  // location
  | { type: "ADD_LOCATION"; payload: IdNameBrandLocationFromType[] }
  | { type: "REMOVE_LOCATION" }
  // buses
  | { type: "ADD_BUSES"; payload: BusType[] }
  | { type: "REMOVE_BUSES" };

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
};
