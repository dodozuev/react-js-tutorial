import { createAction } from "@reduxjs/toolkit";

type FETCH_STATUS = "SUCCESS" | "LOADING" | "FAILED";

export type FetchState = {
  status?: FETCH_STATUS;
  data?: Person[];
  error?: string;
};

export type FetchAction = {
  type: FETCH_STATUS;
  payload?: string;
};

export const PutDataToState = (data: string): FetchAction => ({
  type: "SUCCESS",
  payload: data,
});

export const PutErrorToState = (err: string): FetchAction => ({
  type: "FAILED",
  payload: err,
});

export const SetLoading = (): FetchAction => ({
  type: "LOADING",
});

export const fetchPeopleSuccess = createAction<string>("fetchpeople/success");
export const fetchPeopleError = createAction("fetchpeople/error");
export const fetchPeopleLoading = createAction("fetchpeople/loading");
