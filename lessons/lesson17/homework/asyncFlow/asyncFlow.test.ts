import "whatwg-fetch";

import {
  FetchAction,
  FetchState,
  PutDataToState,
  PutErrorToState,
  SetLoading,
} from "./actions";
import { Store, applyMiddleware, createStore } from "redux";

import { fetchPeople } from "./thunk";
import thunkMiddleware from "redux-thunk";
import { workWithFetch } from "./reducer";

describe("Redux async flow", () => {
  let store: Store<FetchState, FetchAction> & {
    dispatch: unknown | any;
  };

  beforeEach(() => {
    const a: FetchState = {};

    store = createStore(workWithFetch, a, applyMiddleware(thunkMiddleware));
    jest.spyOn(store, "dispatch");
  });

  it("should set status to loading when SetLoading", () => {
    store.dispatch(SetLoading());

    const currentState = store.getState();
    expect(currentState.status).toEqual("LOADING");
  });

  it("should set status to success and set data when PutDataToState", () => {
    store.dispatch(PutDataToState("test"));

    const currentState = store.getState();
    expect(currentState.status).toEqual("SUCCESS");
    expect(currentState.data).toEqual("test");
  });
  it("should set status to failed and set error when SetLoading", () => {
    store.dispatch(PutErrorToState("testError"));

    const currentState = store.getState();
    expect(currentState.status).toEqual("FAILED");
    expect(currentState.error).toEqual("testError");
  });

  it("should set status to failed and set error when SetLoading", async () => {
    const mockFetchPromise = Promise.resolve({
      text: () => "TADA!",
    });
    jest.spyOn(global, "fetch").mockImplementation(() => {
      return mockFetchPromise;
    });

    await store.dispatch(fetchPeople());

    const { status, data } = store.getState();
    expect(status).toEqual("SUCCESS");
    expect(data).toEqual("TADA!");
  });
});
