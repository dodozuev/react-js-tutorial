import { PutDataToState, PutErrorToState, SetLoading } from "./actions";

export function fetchPeople() {
  return (dispatch: any): Promise<Response> => {
    dispatch(SetLoading());
    return fetch(`https://swapi.dev/api/people`)
      .then((data) => data.text())
      .then((text) => dispatch(PutDataToState(text)))
      .catch((error) => dispatch(PutErrorToState(error)));
  };
}
