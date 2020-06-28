import {
  FetchAction,
  FetchState,
  fetchPeopleError,
  fetchPeopleLoading,
  fetchPeopleSuccess,
} from "./actions";

import { createReducer } from "@reduxjs/toolkit";

export function workWithFetch(
  state: FetchState = {},
  action: FetchAction
): FetchState {
  switch (action.type) {
    case "LOADING":
      return { status: action.type };
    case "SUCCESS":
      return { status: action.type, data: action.payload };
    case "FAILED":
      return { status: action.type, error: action.payload };
    default:
      return state;
  }
}

export const toolkitReducer = createReducer<FetchState>(
  {},
  {
    [fetchPeopleLoading.type]: (state, action) => ({
      ...state,
      status: action.type,
    }),
    [fetchPeopleSuccess.type]: (state, action) => {
      const response = JSON.parse(action.payload) as PeopleResponse;
      return { ...state, data: response.results, status: action.type };
    },
    [fetchPeopleError.type]: (state, action) => {
      return { ...state, status: action.type };
    },
  }
);
