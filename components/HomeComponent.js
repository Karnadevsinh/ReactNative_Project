import React, { Component } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props) {
    const item = props.item;

    if (props.isLoading) {
        return(
            <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {
        if (item != null) {
            return(
                <Card>
                    
                    <Card.Image source = {{ uri:baseUrl + item.image }}>
                        <Text style={{textAlign: "center", margin: 15,paddingTop: 25}}> 
                            <Card.Title style={{color: "white"}}>{item.name}</Card.Title>
                        </Text>
                        <Text style={{textAlign: "center", color: "white"}}>
                        {item.designation}
                        </Text>
                    </Card.Image>
                    
                    <Text style={{margin: 10, textAlign: "justify"}}>
                        {item.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(
                <View></View>
            );
        }
    }

    
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }


    static navigationOptions = {
        title: 'Home'
    };

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                useNativeDriver: true,
                easing: Easing.linear
            }
        ).start(() => this.animate());
    }

    render() {

        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        return(
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>

                <Animated.View style={{width: '100%', transform: [{ translateX: xpos1}]}}>
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess} />
                </Animated.View>
                <Animated.View style={{width: '100%', transform: [{ translateX: xpos2}]}}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} />
                </Animated.View>
                <Animated.View style={{width: '100%', transform: [{ translateX: xpos3}]}}>
                    <RenderItem item={this.props.leaders.leaders.filter((leaders) => leaders.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess} />
                </Animated.View>

            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);