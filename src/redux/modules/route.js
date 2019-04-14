const LOAD_ROUTE = "LOAD_ROUTE";
const LOAD_ROUTE_SUCCESS = "LOAD_ROUTE_SUCCESS";
const LOAD_ROUTE_FAIL = "LOAD_ROUTE_FAIL";

const SET_DATA = "SET_DATA";

const TMP_ROUTE = {
  name: "test",
  id: 1,
  points: [
    { id: 0, lat: 47.54687159892238, lng: 3.2080078125000004 },
    { id: 1, lat: 49.49667452747045, lng: 8.173828125000002 },
    { id: 2, lat: 49.993615462541136, lng: 12.436523437500002 },
    { id: 3, lat: 49.38237278700955, lng: 17.314453125000004 },
    { id: 4, lat: 48.16608541901253, lng: 20.522460937500004 },
    { id: 5, lat: 43.11702412135048, lng: 22.412109375000004 },
    { id: 6, lat: 43.54854811091288, lng: 16.589355468750004 },
    { id: 7, lat: 47.73932336136857, lng: 12.7880859375 },
    { id: 8, lat: 45.22848059584359, lng: 4.855957031250001 },
    { id: 9, lat: 44.5278427984555, lng: -2.8125 }
  ]
};

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
    case SET_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}

const getTmpRoute = () => {
  return TMP_ROUTE;
};

export const loadRoute = id => async dispatch => {
  dispatch({ type: LOAD_ROUTE });

  try {
    const route = await getTmpRoute();
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
  return dispatch({ type: SET_DATA, data: state.route.data });
};

export const addPoint = latLng => (dispatch, getState) => {
  const state = getState();
  const data = state.route.data ? state.route.data : {name: "", id: 1, points: []}

  data.points = data.points.concat({
    id: data.points.length,
    lat: latLng.lat,
    lng: latLng.lng,
  });

  return dispatch({ type: SET_DATA, data })
};

export const removePoint = id => (dispatch, getState) => {
  const state = getState();
  const data = state.route.data ? state.route.data : {name: "", id: 1, points: []}

  data.points = data.points.filter(point => point.id !== id)
  return dispatch({ type: SET_DATA, data })
};