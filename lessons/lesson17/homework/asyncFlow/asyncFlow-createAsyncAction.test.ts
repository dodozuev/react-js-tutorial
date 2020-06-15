/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/camelcase */

import { configureStore, createSlice } from "@reduxjs/toolkit";

import { FetchState } from "./actions";
import fetch from "node-fetch";
import { fetchPeopleFromReduxToolkit } from "./thunk";

jest.mock("node-fetch");

describe("Redux async flow", () => {
  let slice: any;
  let store: any;

  beforeEach(() => {
    slice = createSlice({
      name: "baseSlice",
      initialState: {},
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(
            fetchPeopleFromReduxToolkit.fulfilled,
            (state: FetchState, action) => {
              state.data = action.payload.results;
            }
          )
          .addCase(fetchPeopleFromReduxToolkit.pending, (state: FetchState) => {
            state.status = "LOADING";
          });
      },
    });

    store = configureStore({ reducer: slice.reducer });
  });

  it("should set status to failed and set error when SetLoading", async () => {
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

    const fetchmocked = fetch as jest.Mocked<typeof fetch>;

    fetchmocked.mockReturnValue(
      Promise.resolve({ json: () => Promise.resolve(response) })
    );

    store.dispatch(fetchPeopleFromReduxToolkit());

    const currentState = store.getState();
    console.log(currentState);
  });
});
