type FETCH_STATUS = "SUCCESS" | "LOADING" | "FAILED";

export type FetchState = {
  status?: FETCH_STATUS;
  data?: string;
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
