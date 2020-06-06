import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ListOfItems from '../components/ListOfItems';
import { useRoute } from '@react-navigation/native';

const FavoriteMoviesScreen = ({ navigation }) => {
  const route = useRoute();
  const selectedFavMovies = useSelector(state => state.movies.favoriteMovies);

  return (
    <View style={styles.main}>
      <ListOfItems
        sendPage={route.name}
        isLoading={false}
        listData={selectedFavMovies}
        noDataMessege={"No Favorite Movies Found, Please Add 1"}
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

export default FavoriteMoviesScreen;
