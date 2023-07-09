export const enum Action {
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
}

export type UserType = {
  email: string;
  name: string;
  authenticated: boolean;
  role: string;
};

export type ActionType =
  | { type: Action.ADD_USER; payload: UserType }
  | { type: Action.REMOVE_USER };

export type Store = {
  state: {
    user: UserType;
  };
  dispatch: React.Dispatch<ActionType>;
};
