import { Dispatch } from "react";

export type TicketType = {
  id: string;
  seatName: string;
};

export type UserType = {
  email: string;
  name: string;
  role: string;
  token: string;
  ticket: TicketType[];
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

export interface PassengerDetailsType {
  name: string;
  gender: string;
  email: string;
  age: number;
  mobile: number;
  boarding_point: string;
  dropping_point: string;
  isAgree: boolean;
}

export type ActionType =
  // user
  | { type: "ADD_USER"; payload: UserType }
  | { type: "REMOVE_USER" }
  | { type: "LOADING"; payload: boolean }
  // searchProds
  | { type: "ADD_PRODS"; payload: { list: BusType[]; fromID: string | null } }
  | { type: "REMOVE_PRODS" }
  | { type: "ADD_PRODS_STATUS"; payload: number | null }
  | {
      type: "ADD_PASSENGER_INFO";
      payload: {
        name:
          | "name"
          | "gender"
          | "email"
          | "age"
          | "mobile"
          | "boarding_point"
          | "dropping_point"
          | "isAgree";
        value: string | number | boolean;
      };
    }
  | { type: "REMOVE_PASSENGER_INFO" }
  | { type: "PASSENGER_LOADING"; payload: boolean };

// initialStateType
export type InitialStateType = {
  user: UserType;
  searchProds: {
    list: BusType[];
    status: null | number;
    fromID: string | null;
  };
  passengerPersonalInfo: {
    info: PassengerDetailsType;
    loading: boolean;
  };
  authenticated: boolean;
  isLoading: boolean;
};

// store type
export type StoreType = {
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
};
