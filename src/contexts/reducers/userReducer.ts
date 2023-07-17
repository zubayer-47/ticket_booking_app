import { Action } from "../../constants/context-constant";
import { ActionType, InitialStateType } from "../../types/state.types";

export default function userReducer(
  state: InitialStateType,
  action: ActionType
) {
  switch (action.type) {
    case Action.ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Action.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Action.REMOVE_USER:
      return {
        ...state,
        user: {
          name: "",
          email: "",
          authenticated: false,
          role: "",
          token: "",
          ticket: "",
        },
      };
    case Action.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
