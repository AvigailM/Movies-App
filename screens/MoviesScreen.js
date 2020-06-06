import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as moviesActions from '../store/actions/movies';
import ListOfItems from '../components/ListOfItems'
import {useRoute} from '@react-navigation/native';

const MoviesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const moviesData = useSelector(state => state.movies.movies);
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(moviesActions.fetchMovies()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <View style={styles.main}>
      <ListOfItems
        sendPage={route.name}
        isLoading={isLoading}
        listData={moviesData}
        noDataMessege={"No movies found"}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default MoviesScreen;
