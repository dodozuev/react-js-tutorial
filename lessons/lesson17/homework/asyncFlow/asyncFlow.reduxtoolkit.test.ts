/* eslint-disable @typescript-eslint/camelcase */

import "whatwg-fetch";

import {
  FetchAction,
  FetchState,
  fetchPeopleError,
  fetchPeopleLoading,
  fetchPeopleSuccess,
} from "./actions";

import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { toolkitReducer } from "./reducer";

describe("Redux async flow", () => {
  let store: Store<FetchState, FetchAction> & {
    dispatch: unknown | any;
  };

  beforeEach(() => {
    store = configureStore({ reducer: toolkitReducer });
    jest.spyOn(store, "dispatch");
  });

  it("should set status to fetchpeople/loading when SetLoading", () => {
    store.dispatch(fetchPeopleLoading());

    const currentState = store.getState();
    expect(currentState.status).toEqual("fetchpeople/loading");
  });

  it("should set status to success and set data when PutDataToState", () => {
    const response = {
      results: [
        {
          eye_color: "grey",
          hair_color: "brown",
          height: 180,
          name: "qq",
          mass: 80,
        } as Person,
      ],
    } as PeopleResponse;

    store.dispatch(fetchPeopleSuccess(JSON.stringify(response)));

    const currentState = store.getState();
    expect(currentState.status).toEqual("fetchpeople/success");
    expect(currentState.data).toEqual(response.results);
  });
  it("should set status to failed and set error when SetLoading", () => {
    store.dispatch(fetchPeopleError());

    const currentState = store.getState();
    expect(currentState.status).toEqual("fetchpeople/error");
  });
});
