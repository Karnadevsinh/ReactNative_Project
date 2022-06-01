import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MEDIA_LIBRARY from 'expo-media-library';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import { NavigationContainer } from '@react-navigation/native';


class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
         SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if(userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
                />
        )
    };

    handleLogin = async() => {
        console.log(JSON.stringify(this.state));
        
        if (this.state.remember) {
            await SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password})
                )
                    .catch((error) => console.log('Could not save user info', error));
        }
        else {
            await SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Input 
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        />
                    <Input 
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        />
                    <CheckBox 
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                        />
                    <View style={styles.formButton}>
                        <Button 
                            onPress={() => this.handleLogin()}
                            title=' Login'
                            icon={
                            <Icon 
                                name='sign-in' 
                                type='font-awesome' 
                                size={24}
                                color='white' />
                            }
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                        />
                    </View>
                    <View style={styles.formButton}>
                        <Button 
                            onPress={() => this.props.navigation.navigate('Register')}
                            title=' Register'
                            icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome' 
                                size={24}
                                color='blue' />
                            }
                            titleStyle={{ color: 'blue' }}
                            buttonStyle={{ backgroundColor: "" }}
                        />
                    </View>
                </View>
            </ScrollView>
            
        );
    }


}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                this.processImage( capturedImage.uri );
            }
        }
    }

    getImageFromGallery = async () => {
        const { status } = await MEDIA_LIBRARY.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                });
              if (!result.cancelled) {
                this.processImage( result.uri );
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: { width: 400 } }
            ],
            { format: 'png' }
        );
        this.setState({ imageUrl: processedImage.uri })
    }

    static navigationOptions = {
        title: 'Register'
    };

    handleRegister = async() => {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            await SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password})
                )
                    .catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                            />
                        <Button 
                            title='Camera'
                            onPress={this.getImageFromCamera}
                            />
                        <Button 
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                            />
                    </View>
                    <Input 
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        />
                    <Input 
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        />
                    <Input 
                        placeholder="First Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        />
                    <Input 
                        placeholder="Last Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        />
                    <Input 
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        />
                    <CheckBox 
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                        />
                    <View style={styles.formButton}>
                        <Button 
                            onPress={() => this.handleRegister()}
                            title=' Register'
                            icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome' 
                                size={24}
                                color='white' />
                            }
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                            />
                    </View>
                </View>
            </ScrollView>
            
        );
    }
}

const tabNavigator = createBottomTabNavigator();

function Login() {
    return(
        <NavigationContainer independent={true}>
            <tabNavigator.Navigator
                initialRouteName='Login'
                tabBarOptions={{
                    activeBackgroundColor: '#9575CD',
                    inactiveBackgroundColor: '#D1C4E9',
                    activeTintColor: '#ffffff',
                    inactiveTintColor: 'gray'
                }}>
                <tabNavigator.Screen 
                name='Login' 
                component={LoginTab}
                options={{
                    title: 'Login',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                          name='sign-in'
                          type='font-awesome'            
                          size={24}
                          iconStyle={{ color: tintColor }}
                        />
                      )
                }}
                />
                <tabNavigator.Screen 
                    name='Register' 
                    component={RegisterTab}
                    options={{
                        title: 'Register',
                        tabBarIcon:({ tintColor }) => (
                            <Icon
                              name='user-plus'
                              type='font-awesome'            
                              size={24}
                              iconStyle={{ color: tintColor }}
                            />
                          )
                    }}
                />
            </tabNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around'
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 0
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60,
        marginTop: 20
    }
});

export default Login;