import { Dispatch } from "react";

export type UserType = {
  email: string;
  name: string;
  role: string;
  token: string;
  ticket: string;
};

export type IdNameBrandLocationFromType = {
  id: string;
  name: string;
};

export interface LocationType {
  id: string;
  name: string;
}

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
  ticket_price: string;
  location: IdNameBrandLocationFromType;
};

export type BusType = {
  id: string;
  type: string;
  brand: BusBrandType;
  journey_date: string;
  location: IdNameBrandLocationFromType;
  From: BusFromType[];
};

export type ActionType =
  // user
  | { type: "ADD_USER"; payload: UserType }
  | { type: "REMOVE_USER" }
  | { type: "LOADING"; payload: boolean }
  // brand
  | { type: "ADD_BRAND"; payload: IdNameBrandLocationFromType[] }
  | { type: "REMOVE_BRAND" }
  // brandId
  | { type: "ADD_BRAND_ID"; payload: string }
  | { type: "REMOVE_BRAND_ID" }
  // location
  | { type: "ADD_LOCATION"; payload: IdNameBrandLocationFromType[] }
  | { type: "REMOVE_LOCATION" };

// initialStateType
export type InitialStateType = {
  user: UserType;
  authenticated: boolean;
  isLoading: boolean;
};

// store type
export type StoreType = {
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
};
