import { ADD_TO_FAV_MOVIES, SET_MOVIES, REMOVE_FROM_FAV_MOVIES } from '../actions/movies';

const initialState = {
  movies: [],
  favoriteMovies: [],
  arr: []
};

export default (state = initialState , action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies
      };
    case ADD_TO_FAV_MOVIES:

      return {
        ...state,
        favoriteMovies: [
          ...state.favoriteMovies, 
            action.favoriteMovie      
        ]
      }
 case REMOVE_FROM_FAV_MOVIES:
      return {
        ...state,
        favoriteMovies: action.favoriteMovies
      };
    default:
      {
        return state;
      }

  }

};
