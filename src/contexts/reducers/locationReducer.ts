import { Action } from "../../constants/context-constant";
import { ActionType, InitialStateType } from "../../types/state.types";

export default function locationReducer(
  state: InitialStateType,
  action: ActionType
) {
  switch (action.type) {
    case Action.ADD_LOCATION:
      return {
        ...state,
        locations: action.payload,
      };
    case Action.REMOVE_LOCATION:
      return {
        ...state,
        locations: [{ id: "", name: "" }],
      };
    default:
      return state;
  }
}
