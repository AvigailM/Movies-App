export const ADD_TO_FAV_MOVIES = 'ADD_TO_FAV_MOVIES';
export const SET_MOVIES = 'SET_MOVIES';
export const REMOVE_FROM_FAV_MOVIES = 'REMOVE_FROM_FAV_MOVIES';
import * as Constans from '../../res/constans'

export const fetchMovies = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Constans.THE_MOVIEDB_KEY}&language=en-US&page=1`
      );

      // if (!response.ok) {
      //   throw new Error('Something went wrong!');
      // }

      const resData = await response.json();

      dispatch({ type: SET_MOVIES, movies: resData.results });
    } catch (err) {
      throw err;
    }
  };
};

export const addToFavMovies = favoriteMovie => {
  return { type: ADD_TO_FAV_MOVIES, favoriteMovie };
};

export const removeFromFavMovies = favoriteMovies => {
  return { type: REMOVE_FROM_FAV_MOVIES, favoriteMovies: favoriteMovies };
};
