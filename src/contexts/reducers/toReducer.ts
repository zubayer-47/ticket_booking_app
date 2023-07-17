import { Action } from "../../constants/context-constant";
import { ActionType, InitialStateType } from "../../types/state.types";

export default function toReducer(state: InitialStateType, action: ActionType) {
  switch (action.type) {
    case Action.ADD_TO:
      return {
        ...state,
        to: action.payload,
      };
    case Action.REMOVE_TO:
      return {
        ...state,
        to: [{ fromID: "", id: "", name: "" }],
      };
    default:
      return state;
  }
}
