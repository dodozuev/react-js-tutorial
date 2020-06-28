import {
  PROBABLE_ACTION,
  ProbableAction,
  ProbableState,
} from "./probableAction";

export function probableReducer(
  state: ProbableState = {},
  action: ProbableAction
): ProbableState {
  switch (action.type) {
    case PROBABLE_ACTION:
      return { message: "action fired!", status: action.type };
    default:
      return state;
  }
}
