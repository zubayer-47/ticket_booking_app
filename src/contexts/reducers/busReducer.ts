import { Action } from "../../constants/context-constant";
import { ActionType, InitialStateType } from "../../types/state.types";

export default function busReducer(
  state: InitialStateType,
  action: ActionType
) {
  switch (action.type) {
    case Action.ADD_BUSES:
      return {
        ...state,
        buses: action.payload,
      };
    case Action.REMOVE_BUSES:
      return {
        ...state,
        buses: [
          {
            id: "",
            brand: { id: "", createdBy: "", name: "" },
            from: [{ id: "", location: { id: "", name: "" } }],
            journey_date: "",
            type: "",
          },
        ],
      };
    default:
      return state;
  }
}
