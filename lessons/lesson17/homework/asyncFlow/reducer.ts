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
