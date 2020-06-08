import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as moviesActions from '../store/actions/movies';
import ListOfItems from '../components/ListOfItems'
import { useRoute } from '@react-navigation/native';

const MoviesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const moviesData = useSelector(state => state.movies.movies);
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(moviesActions.fetchMovies()).then(() => {
      setError(false)
    }).catch(() => {
      setError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [dispatch,setIsLoading]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
      </View>
    );
  }

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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MoviesScreen;