import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { Image, ScrollView, Text, View, StyleSheet, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; 
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())}
});


/**const MenuIcon = (props) => {
    return(
        <Icon 
            name='menu' 
            size={24}
            color='white'
            onPress={ () => props.navigation.toggleDrawer() }
        />
    );
}*/

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                source = {require('./images/logo.png')}
                style = {styles.drawerImage} />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
        </View>
        <DrawerItemList {...props} />
    </ScrollView>
)

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                    name='menu' 
                    size={50}
                    color='white'
                    onPress={ () => navigation.toggleDrawer() }
                />)
                
                })}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
        initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                        name='menu' 
                        size={50}
                        color='white'
                        onPress={() => navigation.toggleDrawer() }
                    />)
                })}
            />
                        
        </HomeNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
        initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact Us"
                component={Contact}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                        name='menu' 
                        size={50}
                        color='white'
                        onPress={ () => navigation.toggleDrawer() }
                    />)
                })}
            />
                        
        </ContactNavigator.Navigator>
    );
}

const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen() {
    return(
        <AboutNavigator.Navigator
        initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <AboutNavigator.Screen
                name="About Us"
                component={About}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                        name='menu' 
                        size={50}
                        color='white'
                        onPress={ () => navigation.toggleDrawer() }
                    />)
                })}
            />
                        
        </AboutNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen() {
    return(
        <ReservationNavigator.Navigator
        initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ReservationNavigator.Screen
                name="Reserve Table"
                component={Reservation}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                        name='menu' 
                        size={50}
                        color='white'
                        onPress={ () => navigation.toggleDrawer() }
                    />)
                })}
            />
                        
        </ReservationNavigator.Navigator>
    );
}

const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen() {
    return(
        <FavoritesNavigator.Navigator
        initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <FavoritesNavigator.Screen
                name="My Favorites"
                component={Favorites}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                        name='menu' 
                        size={50}
                        color='white'
                        onPress={ () => navigation.toggleDrawer() }
                    />)
                })}
            />
                        
        </FavoritesNavigator.Navigator>
    );
}

const LoginNavigator = createStackNavigator();

function LoginNavigatorScreen() {
    return(
        <LoginNavigator.Navigator
        initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={({navigation}) => ({
                    headerLeft: () => (<Icon
                        name='menu' 
                        size={50}
                        color='white'
                        onPress={ () => navigation.toggleDrawer() }
                    />)
                })}
            />
                        
        </LoginNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(

        <MainNavigator.Navigator initialRouteName="Home" drawerStyle ={{backgroundColor: '#D1C4E9'}} 
        drawerContent = {props => <CustomDrawerContentComponent {...props} />} >
          <MainNavigator.Screen name="Login" component={LoginNavigatorScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }} />
        <MainNavigator.Screen name="Home" component={HomeNavigatorScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }} />
          <MainNavigator.Screen name="About Us" component={AboutNavigatorScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }} />
          <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen}
          options={{
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }} />
          <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen}
          options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
            <MainNavigator.Screen name="My Favorites" component={FavoritesNavigatorScreen}
          options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
            <MainNavigator.Screen name="Reserve Table" component={ReservationNavigatorScreen}
          options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='cutlery'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }} />
        </MainNavigator.Navigator>

    );
}

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: null,
            isConnected: null
        }
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type, ToastAndroid.LONG);
            this.setState({type: connectionInfo.type});
        });

        this.netinfoUnsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
    } 

    componentWillUnmount() {
        if (this.netinfoUnsubscribe) {
            this.netinfoUnsubscribe();
            this.netinfoUnsubscribe = null;
          }
    }

    handleConnectivityChange = (connectionInfo) => {
        if(connectionInfo.type !== this.state.type){
            this.setState({type : connectionInfo.type});
            this.setState({isConnected : connectionInfo.isConnected});
            switch (this.state.type) {
                case 'none':
                    ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                    break;
                case 'wifi':
                    ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                    break;
                case 'cellular':
                    ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                    break;
                case 'unknown':
                    ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                    break;
                default:
                    break;
            }
        }
        else{
            null;
        }
    }

    render()    {
        return(
            
        //<View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <NavigationContainer>
            <MainNavigatorDrawer />           
        </NavigationContainer>
        //</View>  
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      top: 10
    },
    drawerImage: {
      top: 10,
      margin: 10,
      width: 80,
      height: 60,
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Main);