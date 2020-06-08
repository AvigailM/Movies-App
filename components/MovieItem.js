import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Card from './Card';
import StyledButton from './StyledButton'
import * as Constans from '../res/constans'


const OrderItem = ({ sendPage ,title, id, imageUrl, navigation }) => {
  const basePosterUrl = `${Constans.BASE_POSTER_URL}${imageUrl}`

  return (
    <Card style={styles.moviesDitMainCard}>
      <View style={styles.moviesDitMainContiner}>
        <View style={styles.mainViews}>
          <View style={styles.titleText}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {imageUrl &&
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: basePosterUrl }} />
            </View>
          }
          <View style={styles.buttonContainer}>
            {sendPage==='Movies'&&<StyledButton margin={5} fontSize={'10'} borderRadius={5} text="Details" pressFunction={() => {
                navigation.navigate('Movie Details', {
                  movieId: { id },
                });
              }} />}
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  moviesDitMainCard: {
    height: 300,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    marginLeft: 55,
    marginRight: 55,
    flex: 1,
  },
  moviesDitMainContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mainViews: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    height: '100%'
  },
  titleText: {
    height: '20%',
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex'
  },
  details: {
    justifyContent: "flex-end",
    // height: '17%',
    padding: 10
  },
  detailItems: {
    width: '100%'
  },
  buttonContainer: {
    marginTop: 5,
    height: '15%',
  },
  image: {
    width: '100%',
    height: '100%',
  },

});

export default OrderItem;
