import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Image, StyleSheet, Modal, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    }
} 

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if ( dx < -200 ){
            return true;
        }
        else{
            return false;
        }
    };

    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if ( dx > 200 ){
            return true;
        }
        else{
            return false;
        }
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ],
                    {cancelable: false}
                );

            else {
                if (recognizeComment(gestureState)) {
                    props.toggleModal();
                }
            }
                
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    }

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
               ref={this.handleViewRef}
               {...panResponder.panHandlers} >
                <Card>
                    <Card.Image source={{uri: baseUrl + dish.image }}>
                        <Text style={{textAlign: "center", margin: 15, paddingTop: 35}}> 
                            <Card.Title style={{color: "white"}}>{dish.name}</Card.Title>
                        </Text>
                    </Card.Image>
                    
                    <Text style={{margin: 10, textAlign: "justify"}}>
                        {dish.description}
                    </Text>
                    <View style={styles.Row}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress() } 
                        />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.toggleModal()}
                        />
                    <Icon 
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>
                </Card>
        </Animatable.View>
        );
    }
    else {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    style={{ alignItems: "flex-start" }}
                    readonly
                    imageSize={20}
                    startingValue={item.rating}
                    />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
        
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: "",
            comment: "",
            rating: null,
            showModal: false
        }
    }


    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
      }

    ratingCompleted = rating => {
    this.setState({ rating });
    };

    handleAuthorInput = author => {
    this.setState({ author });
    };

    handleCommentInput = comment => {
    this.setState({ comment });
    };

    resetForm() {
    this.setState({
        guests: 1,
        smoking: false,
        date: "",
        showModal: false
    });
    }

    handleComment() {
    const { rating, author, comment } = this.state;
    const dishId = this.props.route.params.dishId;

    this.toggleModal();
    this.props.postComment(dishId, rating, author, comment);
    }

    render() {

        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                toggleModal={this.toggleModal} />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => {this.toggleModal()}}
                onRequestClose={() => {this.toggleModal()}}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            ratingCount={5}
                            startingValue={5}
                            imageSize={50}
                            onFinishRating={this.ratingCompleted}
                            />
                        <View style={styles.input}>
                            <Input 
                            placeholder='Author'
                            onChangeText={this.handleAuthorInput}
                            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                            />
                            <Input
                            placeholder='Comment'
                            onChangeText={this.handleCommentInput}
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                            onPress={() => {
                                this.handleComment();
                                this.resetForm();
                              }}
                            title='Submit'
                            color='#512DA8' />
                         </View>
                        <View style={styles.button}>
                            <Button
                            onPress={() => {this.toggleModal(); this.resetForm(); }}
                            title='Cancel'
                            color='grey' />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    Row: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    button: {
        margin: 10
    },
    input: {
        margin: 5,
        paddingTop: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);