import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const StyledButton = props => {
    const [press, setPress] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor="#000066"
                activeOpacity={1}
                style={press ? styles.buttonPress : styles.button}
                onHideUnderlay={() => { setPress(false) }}
                onShowUnderlay={() => {setPress(true) }}
                onPress={() => props.pressFunction()}
            >
                <Text style={press ? styles.welcomePress : styles.welcome}>
                    {props.text}
                </Text>
            </TouchableHighlight>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 14,
        textAlign: "center",
        margin: 5,
        color: "#000066"
    },
    welcomePress: {
        fontSize: 14,
        textAlign: "center",
        margin: 5,
        color: "#ffffff"
    },
    button: {
        borderColor: "#000066",
        borderWidth: 1,
        borderRadius: 5
    },
    buttonPress: {
        borderColor: "#000066",
        backgroundColor: "#000066",
        borderWidth: 1,
        borderRadius: 5
    }
});

export default StyledButton;
