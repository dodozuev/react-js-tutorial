/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/camelcase */

import { FetchAction, FetchState } from "./actions";
import { Store, configureStore, createSlice } from "@reduxjs/toolkit";

import fetch from "node-fetch";
import { fetchPeopleFromReduxToolkit } from "./thunk";
import { store } from "@/rdx/store";

jest.mock("node-fetch");

describe("Redux async flow", () => {
  let slice: any;
  let store: Store<FetchState, FetchAction> & {
    dispatch: unknown | any;
  };

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
              state.status = "SUCCESS";
              return state;
            }
          )
          .addCase(fetchPeopleFromReduxToolkit.pending, (state: FetchState) => {
            state.status = "LOADING";
          })
          .addCase(
            fetchPeopleFromReduxToolkit.rejected,
            (state: FetchState) => {
              state.status = "FAILED";
            }
          );
      },
    });

    store = configureStore({ reducer: slice.reducer });
  });

  it("should set status to 'SUCCESS' and set data to returned from fetch", async () => {
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

    await store.dispatch(fetchPeopleFromReduxToolkit());

    const currentState = store.getState();
    expect(currentState.status).toBe("SUCCESS");
    expect(currentState.data).toMatchObject(response.results);
    console.log(currentState);
  });
});
