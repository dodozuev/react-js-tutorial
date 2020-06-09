import {
  PROBABLE_ACTION,
  ProbableAction,
  ProbableState,
  actWithProbability,
} from "./probableAction";
import { Store, applyMiddleware, createStore } from "redux";

import { probabilityMiddleware } from "./probabilityMiddleware";
import { probableReducer } from "./reducer";

describe("Probable middleware", () => {
  let store: Store<ProbableState, ProbableAction> & {
    dispatch: unknown | any;
  };

  beforeEach(() => {
    const a = {};
    // TODO: find out how to create typed store correctly
    store = createStore(
      probableReducer,
      a,
      applyMiddleware(probabilityMiddleware)
    );
    jest.spyOn(store, "dispatch");
  });

  it("should fire action if probability is 1", () => {
    store.dispatch(actWithProbability(1));

    const currentState = store.getState();
    expect(currentState.message).toEqual("action fired!");
  });

  it("should not fire action if probability is 0", () => {
    store.dispatch(actWithProbability(0));

    const currentState = store.getState();
    expect(currentState.message).toBeUndefined();
  });

  it("should fire action if no probability specified", () => {
    store.dispatch({ type: PROBABLE_ACTION });

    const currentState = store.getState();
    expect(currentState.message).toEqual("action fired!");
  });

  it("should fire action random showed more than specified probability", () => {
    Math.random = jest.fn(() => 0.5);
    store.dispatch(actWithProbability(0.6));

    const currentState = store.getState();
    expect(currentState.message).toEqual("action fired!");
  });

  it("should not fire action random showed less than specified probability", () => {
    Math.random = jest.fn(() => 0.6);
    store.dispatch(actWithProbability(0.5));

    const currentState = store.getState();
    expect(currentState.message).toBeUndefined();
  });
});
