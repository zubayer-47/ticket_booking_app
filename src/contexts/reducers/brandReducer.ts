import { Action } from "../../constants/context-constant";
import { ActionType, InitialStateType } from "../../types/state.types";

export default function brandReducer(
  state: InitialStateType,
  action: ActionType
) {
  switch (action.type) {
    case Action.ADD_BRAND:
      return {
        ...state,
        brand: {
          ...state.brand,
          list: action.payload,
        },
      };
    case Action.REMOVE_BRAND:
      return {
        ...state,
        brand: {
          ...state.brand,
          list: [{ id: "", name: "" }],
        },
      };
    default:
      return state;
  }
}
