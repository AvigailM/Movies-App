import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import MoviesScreen from '../screens/MoviesScreen';
import FavoriteMoviesScreen from '../screens/FavoriteMoviesScreen';
import LoginScreen from '../screens/LoginScreen'
import AsyncStorage from '@react-native-community/async-storage'
import * as authActions from '../store/actions/auth';
import * as Constans from '../res/constans'
import { GoogleSignin } from '@react-native-community/google-signin';

const AppNavigator = props => {
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure();
    let promise = getSafeItem(Constans.STORAGE_KEY)
    promise.then(jsonValue => {
      if (jsonValue !== null) {
        const transformedData = JSON.parse(jsonValue)
        const { token, name, imageUri, imgHeight, imgWidth } = transformedData;
        dispatch(authActions.authenticate(token, name, imageUri, imgHeight, imgWidth));
      }
      setLoading(false);
    }, error => {
      alert("problem is ", error)
      setLoading(false);
    } // doesn't run
    ).catch(err => setLoading(false));
  }, []);

  const getSafeItem = async (key) => {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject('Invalid key');
      }
      AsyncStorage.getItem(key).then((value) => {
        resolve(value);
      }, () => {// Couldn't read row 0, col 0 from CursorWindow
        resolve(null); // Force not to break
      }).catch(err => {
        setLoading(false)
        alert(err)
        resolve(null)
      }
      );
    }).catch(err => setLoading(false));
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="Movie Details" component={MovieDetailsScreen} />
        <Stack.Screen name="Favorite Movies" component={FavoriteMoviesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;


