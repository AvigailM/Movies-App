import React from 'react';
import { View , FlatList, ActivityIndicator , Text, StyleSheet } from 'react-native';
import DetailsItem from './MovieItem';

const ListOfItems = ({ sendPage, isLoading, listData, noDataMessege, navigation }) => {

    if (isLoading) {
        return (
            <View style={styles.noDataViews}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (listData.length === 0) {
        return (
            <View style={styles.noDataViews}>
                <Text>{noDataMessege}</Text>
            </View>
        );
    }

    return (
        <View style={styles.main}>
            <FlatList
                data={listData}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) =>
                    <DetailsItem
                        sendPage={sendPage}
                        navigation={navigation}
                        title={item.title}
                        id={item.id}
                        imageUrl={item.backdrop_path}
                    />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    noDataViews: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
});

export default ListOfItems;