import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import * as Constans from '../res/constans'
import AsyncStorage from '@react-native-community/async-storage'

const GoogleFaceBookLogin = props => {

    // save data in Async Storge
    const saveData = async (tokenData, nameData, imgUriData, imgHeight, imgWidth) => {
        try {
            await AsyncStorage.setItem(Constans.STORAGE_KEY, JSON.stringify({
                token: tokenData,
                name: nameData,
                imageUri: imgUriData,
                imgHeight: imgHeight,
                imgWidth: imgWidth
            }))
            //alert('Data successfully saved')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    //Google SignIn.
    const _signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            let nameT = userInfo.user.name
            let imgUrlT = userInfo.user.photo

            props.setName(nameT)
            if (imgUrlT !== null && imgUrlT !== '') {
                props.setImgUri(imgUrlT)
                props.setImgHeight(200)
                props.setImgWidth(200)
            }
            props.setLogin(true)
            if (!props.selectedAutoLogin) {
                saveData('12345', nameT, imgUrlT ? imgUrlT : props.selectedImageUri, props.imgUrlT ? 200 : props.selectedImageUri, imgUrlT ? 200 : props.selectedImageUri)
            }

        } catch (error) {
            alert(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    //Create response callback to Facebook SignIn.
    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            let nameData = result.name
            let imageUriData = result.picture?.data?.url
            let imageHeightData = result.picture?.data?.height
            let imgWidthData = result.picture?.data?.width
            props.setName(nameData)
            props.setImgWidth(imgWidthData)
            props.setImgHeight(imageHeightData)
            props.setImgUri(imageUriData)
            props.setLogin(true)
            if (!props.selectedAutoLogin) {
                saveData('12345', nameData, imageUriData, imageHeightData, imgWidthData)
            }
        }
    }

    return (
        (props.selectedToken === '' && !props.login) && <View style={styles.buttomViewMain}>
            <View style={styles.buttomView}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => {
                        _signInGoogle()
                    }}
                    disabled={false} />

                <View style={styles.buttomViewFacebook}>
                    <LoginButton
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            const infoRequest = new GraphRequest(
                                                '/me?fields=name,picture.type(large)',
                                                null,
                                                this._responseInfoCallback
                                            );
                                            // Start the graph request.
                                            new GraphRequestManager().addRequest(infoRequest).start();
                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => {}//console.log("logout.")
                        } />
                </View>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    buttomViewMain: {
        justifyContent: 'center',
        flex: 0.2,
    },
    buttomView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttomViewFacebook: {
        display: 'flex', 
        justifyContent: 'center'
    },
});

export default GoogleFaceBookLogin;