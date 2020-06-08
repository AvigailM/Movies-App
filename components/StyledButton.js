import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
 import * as Colors from '../res/colors'

const StyledButton = props => {
    const [press, setPress] = useState(false);
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor={Colors.BUTTON_COLOR}
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
        color: Colors.BUTTON_COLOR
    },
    welcomePress: {
        fontSize: 14,
        textAlign: "center",
        margin: 5,
        color: "#ffffff"
    },
    button: {
        borderColor: Colors.BUTTON_COLOR,
        borderWidth: 1,
        borderRadius: 5
    },
    buttonPress: {
        borderColor: Colors.BUTTON_COLOR,
        backgroundColor: Colors.BUTTON_COLOR,
        borderWidth: 1,
        borderRadius: 5
    }
});

export default StyledButton;