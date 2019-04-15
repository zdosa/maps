const LOAD_ROUTE = "LOAD_ROUTE";
const LOAD_ROUTE_SUCCESS = "LOAD_ROUTE_SUCCESS";
const LOAD_ROUTE_FAIL = "LOAD_ROUTE_FAIL";

export const SET_ROUTE_DATA = "SET_ROUTE_DATA";

export const initialState = {
  data: null,
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROUTE:
      return {
        ...state,
        data: null,
        loading: true,
        error: null
      };
    case LOAD_ROUTE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case LOAD_ROUTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SET_ROUTE_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}

export const loadRoute = id => (dispatch, getState) => {
  dispatch({ type: LOAD_ROUTE });

  try {
    const state = getState();
    const route = state.routes.data.find(r => r.id + "" === id + "");
    setTimeout(() => {
      return dispatch({ type: LOAD_ROUTE_SUCCESS, data: route });
    }, 100);
  } catch (error) {
    return dispatch({ type: LOAD_ROUTE_FAIL, error });
  }
};

export const editPoint = (id, latLng) => (dispatch, getState) => {
  const state = getState();
  state.route.data.points = state.route.data.points.map(point => {
    if (point.id === id) {
      return { id, lat: latLng.lat, lng: latLng.lng };
    } else {
      return point;
    }
  });
  return dispatch({ type: SET_ROUTE_DATA, data: state.route.data });
};

export const addPoint = latLng => (dispatch, getState) => {
  const state = getState();
  const data = state.route.data
    ? state.route.data
    : { name: "", id: 1, points: [] };

  data.points = data.points.concat({
    id: Math.random()
      .toString(36)
      .substr(2, 9),
    lat: latLng.lat,
    lng: latLng.lng
  });

  return dispatch({ type: SET_ROUTE_DATA, data });
};

export const removePoint = id => (dispatch, getState) => {
  const state = getState();
  const data = state.route.data
    ? state.route.data
    : { name: "", id: 1, points: [] };

  data.points = data.points.filter(point => point.id !== id);
  return dispatch({ type: SET_ROUTE_DATA, data });
};