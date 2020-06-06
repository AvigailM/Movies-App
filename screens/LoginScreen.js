import React, { useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as Images from '../res/images'
import { StackActions } from '@react-navigation/native';
import StyledButton from '../components/StyledButton'
import GoogleFaceBookLogin from '../components/GoogleFaceBookLogin'


const LoginScreen = ({ navigation }) => {

    const selectedToken = useSelector(state => state.auth.token);
    const selectedName = useSelector(state => state.auth.name);
    const selectedImageUri = useSelector(state => state.auth.imageUri);
    const selectedImgHeight = useSelector(state => state.auth.imgHeight);
    const selectedImgWidth = useSelector(state => state.auth.imgWidth);
    const selectedAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    const [login, setLogin] = useState(false);
    const [imgUri, setImgUri] = useState('');
    const [imgHeight, setImgHeight] = useState('');
    const [imgWidth, setImgWidth] = useState('');
    const [name, setName] = useState('Stranger');


    return (
        <View style={styles.mainView}>
            <View style={styles.centerViewTextImg}>
                <Text style={styles.textWelcome}>Welcome {selectedName !== '' ? selectedName : name}!</Text>
                {(imgUri !== '' || selectedImageUri != '') ?
                    <Image source={{ uri: selectedImageUri !== '' ? selectedImageUri : imgUri }} style={{ height: selectedImageUri !== '' ? selectedImgHeight : imgHeight, width: selectedImageUri !== '' ? selectedImgWidth : imgWidth }} />
                    :
                    <Image style={{ width: 200, height: 200 }} source={Images.person} />
                }
                <View style={{ marginTop: 30 }}>
                    {(selectedToken !== '' || login) ?
                        <StyledButton text="Go To Movies List" pressFunction={
                            () => navigation.dispatch(StackActions.replace('Movies'))}
                        />
                        :
                        <Text style={styles.textInstruction}>Please log in to continue to the awesomnes</Text>
                    }
                </View>
            </View>

            <GoogleFaceBookLogin
                selectedToken={selectedToken}
                selectedName={selectedName}
                selectedImageUri={selectedImageUri}
                selectedImgHeight={selectedImgHeight}
                selectedImgWidth={selectedImgWidth}
                selectedAutoLogin={selectedAutoLogin}
                login={login}
                setLogin={setLogin}
                imgUri={imgUri}
                setImgUri={setImgUri}
                imgHeight={imgHeight}
                setImgHeight={setImgHeight}
                imgWidth={imgWidth}
                setImgWidth={setImgWidth}
                name={name}
                setName={setName}
            />

        </View>
    );
};


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    centerViewTextImg: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWelcome: {
        fontSize: 24,
        paddingBottom: 20,
    },
    centerView: {
        flex: 0.2,
        marginBottom: Platform.OS === 'ios' ? 200 : 100
    },
    textInstruction: {
        padding: 20,
        display: 'flex',
        fontSize: 15,
    },
});

export default LoginScreen;
