import { TMP_ROUTES } from "mock/Routes";

const LOAD_ROUTES = "LOAD_ROUTES";
const LOAD_ROUTES_SUCCESS = "LOAD_ROUTES_SUCCESS";
const LOAD_ROUTES_FAIL = "LOAD_ROUTES_FAIL";
const DELETE_ROUTE = "DELETE_ROUTE";
const DELETE_ROUTE_SUCCESS = "DELETE_ROUTE_SUCCESS";
const DELETE_ROUTE_FAIL = "DELETE_ROUTE_FAIL";

export const initialState = {
  data: [],
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROUTES:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOAD_ROUTES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case LOAD_ROUTES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case DELETE_ROUTE:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_ROUTE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case DELETE_ROUTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

const getTmpRoute = () => {
  return TMP_ROUTES;
};

export const loadRoutes = () => async dispatch => {
  dispatch({ type: LOAD_ROUTES });

  try {
    const routes = await getTmpRoute();
    setTimeout(() => {
      return dispatch({ type: LOAD_ROUTES_SUCCESS, data: routes });
    }, 1000);
  } catch (error) {
    return dispatch({ type: LOAD_ROUTES_FAIL, error });
  }
};

export const deleteRoute = id => (dispatch, getState) => {
  dispatch({ type: DELETE_ROUTE });

  try {
    const state = getState();
    const routes = state.routes.data.filter(r => r.id + "" !== id + "");
    return dispatch({ type: LOAD_ROUTES_SUCCESS, data: routes });
  } catch (error) {
    dispatch({ type: DELETE_ROUTE_FAIL });
  }
};