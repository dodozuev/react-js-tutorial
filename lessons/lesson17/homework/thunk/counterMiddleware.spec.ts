import { FetchAction, FetchState, SetLoading } from "../asyncFlow/actions";
import { Store, applyMiddleware, createStore } from "redux";

import { counterMiddleware } from "./counterMiddleware";
import { workWithFetch } from "../asyncFlow/reducer";

describe("counterMiddlewareTests", () => {
  let store: Store<FetchState, FetchAction> & {
    dispatch: unknown | any;
  };

  beforeEach(() => {
    const a: FetchState = {};
    // TODO: find out how to create typed store correctly
    store = createStore(workWithFetch, a, applyMiddleware(counterMiddleware));
    jest.spyOn(store, "dispatch");
  });
  it("should increase dispatch counter", () => {
    console.log = jest.fn();
    store.dispatch(SetLoading());
    expect(console.log).toHaveBeenCalledWith("Dispatched 1 times");
  });
});
