import { Action } from "../../constants/context-constant";
import { ActionType, InitialStateType } from "../../types/state.types";

export default function fromReducer(
  state: InitialStateType,
  action: ActionType
) {
  switch (action.type) {
    case Action.ADD_FROM:
      return {
        ...state,
        from: {
          ...state.from,
          list: action.payload,
        },
      };
    case Action.REMOVE_FROM:
      return {
        ...state,
        from: {
          ...state.from,
          list: [{ id: "", name: "" }],
        },
      };
    default:
      return state;
  }
}
