import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_MOVIES_BEGIN,
  HOME_GET_MOVIES_SUCCESS,
  HOME_GET_MOVIES_FAILURE,
  HOME_GET_MOVIES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getMovies,
  dismissGetMoviesError,
  reducer,
} from '../../../../src/features/home/redux/getMovies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getMovies', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMovies succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMovies())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MOVIES_SUCCESS);
      });
  });

  it('dispatches failure action when getMovies fails', () => {
    const store = mockStore({});

    return store.dispatch(getMovies({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MOVIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMoviesError', () => {
    const expectedAction = {
      type: HOME_GET_MOVIES_DISMISS_ERROR,
    };
    expect(dismissGetMoviesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_MOVIES_BEGIN correctly', () => {
    const prevState = { getMoviesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOVIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMoviesPending).toBe(true);
  });

  it('handles action type HOME_GET_MOVIES_SUCCESS correctly', () => {
    const prevState = { getMoviesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOVIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMoviesPending).toBe(false);
  });

  it('handles action type HOME_GET_MOVIES_FAILURE correctly', () => {
    const prevState = { getMoviesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOVIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMoviesPending).toBe(false);
    expect(state.getMoviesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_MOVIES_DISMISS_ERROR correctly', () => {
    const prevState = { getMoviesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOVIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMoviesError).toBe(null);
  });
});

