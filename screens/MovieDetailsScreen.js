import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as moviesActions from '../store/actions/movies';
import * as Images from '../res/images'
import * as Constans from '../res/constans'


const MovieDetailsScreen = ({ route, navigation }) => {
  const movieId = route.params.movieId.id;
  const selectedFavMovies = useSelector(state => state.movies.favoriteMovies);
  const selectedMovie = useSelector(state =>
    state.movies.movies.find(item => item.id === movieId)
  );
  const dispatch = useDispatch();
  const movieInFav = selectedFavMovies.includes(selectedMovie)
  const favWithoutMovie = selectedFavMovies.filter(item => item.id !== movieId);

  if (!selectedMovie && !selectedMovie.poster_path) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.buttonFav} onPress={() => { navigation.navigate('Favorite Movies'); }}>
          <Text style={styles.textButtonFav}>{selectedFavMovies.length}</Text>
          <Image style={styles.image} source={Images.favoriteIcon} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{selectedMovie.title}</Text>
        {selectedMovie.poster_path &&
          <Image style={styles.imagePoster}
            source={{ uri: `${Constans.BASE_POSTER_URL}${selectedMovie.poster_path}`, }}
          />}
        <View style={styles.mainDescription}>
          <Text style={styles.descriptionText}>Overview : {selectedMovie.overview}</Text>
          <Text style={styles.vote}>Vote Count : {selectedMovie.vote_count}</Text>
          <TouchableOpacity
            style={styles.buttonFav}
            onPress={() => {
              movieInFav === false ? dispatch(moviesActions.addToFavMovies(selectedMovie)) :
                dispatch(moviesActions.removeFromFavMovies(favWithoutMovie));
            }}>
            <Image style={styles.image} source={movieInFav === false ? Images.star : Images.starYellow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePoster: {
    width: '100%',
    height: 400,
  },
  buttonFav: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  textButtonFav: {
    display: 'flex',
    color: '#2d5991',
    fontWeight: 'bold',
    fontSize: 20,
  },
  descriptionText: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  image: {
    marginLeft: 10,
    display: 'flex',
    width: 25,
    height: 25,
  },
  mainDescription: {
    marginVertical: 10,
    alignItems: 'center'
  },
  vote: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 35,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#2d5991',
    textAlign: 'center'
  }
});

export default MovieDetailsScreen;
