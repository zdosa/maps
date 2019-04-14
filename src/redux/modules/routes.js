const LOAD_ROUTES = "LOAD_ROUTES";
const LOAD_ROUTES_SUCCESS = "LOAD_ROUTES_SUCCESS";
const LOAD_ROUTES_FAIL = "LOAD_ROUTES_FAIL";

const TMP_ROUTES = [
  {
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
  }
];

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