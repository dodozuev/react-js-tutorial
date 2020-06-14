import { PutDataToState, PutErrorToState, SetLoading } from "./actions";

import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "node-fetch";

export function fetchPeople() {
  return (dispatch: any): Promise<Response> => {
    dispatch(SetLoading());
    return fetch(`https://swapi.dev/api/people`)
      .then((data) => data.text())
      .then((text) => dispatch(PutDataToState(text)))
      .catch((error) => dispatch(PutErrorToState(error)));
  };
}

export const fetchPeopleFromReduxToolkit = createAsyncThunk(
  "people/fetch",
  async () => {
    const responseString = await fetch(`https://swapi.dev/api/people`);
    const responseJson = (await responseString.json()) as PeopleResponse;
    return responseJson;
  }
);
