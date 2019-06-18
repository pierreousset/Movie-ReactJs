import {
  HOME_GET_MOVIES_BEGIN,
  HOME_GET_MOVIES_SUCCESS,
  HOME_GET_MOVIES_FAILURE,
  HOME_GET_MOVIES_DISMISS_ERROR,
} from './constants';
import httpService from '../../../services/httpService'

export function getMovies(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_MOVIES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = httpService().get(getState().home.baseApiUrl + 'movie/popular?api_key=' + getState().home.api_key + '&language=fr-FR&page=1')
      
      doRequest.then(
        (res) => {    
          dispatch({
            type: HOME_GET_MOVIES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_GET_MOVIES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetMoviesError() {
  return {
    type: HOME_GET_MOVIES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_MOVIES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getMoviesPending: true,
        getMoviesError: null,
      };

    case HOME_GET_MOVIES_SUCCESS:
      // The request is success
      return {
        ...state,
        getMoviesPending: false,
        getMoviesError: null,
        popularMovie: action.data.data,
      };

    case HOME_GET_MOVIES_FAILURE:
      // The request is failed
      return {
        ...state,
        getMoviesPending: false,
        getMoviesError: action.data.error,
        popularMovie:{}
      };

    case HOME_GET_MOVIES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getMoviesError: null,
      };

    default:
      return state;
  }
}
