import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Picker, Modal, Alert  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-elements';
//import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            AC: false,
            date: new Date(),
            time: new Date(),
            show: false,
            mode: "date",
            showModal: false
        }
    }

    static navigationOption = {
        title: 'Reserve Table'
    }

    toggleModal () {
        this.setState({ showModal: !this.state.showModal });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\n' + 'AC: ' + (this.state.AC ? 'Yes' : 'No') + '\n' + 'Date and Time: ' + this.state.date.toDateString() + ' ' + this.state.time.toLocaleTimeString('en-IN'),
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotifications(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm(); 
                    }
                }
            ],
            {cancelable: false}
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            AC: false,
            date: new Date(),
            time: new Date(),
            mode: "date",
            showModal: false
        });
    }

    async  obtainNotificationPermission() {
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if ( status !== 'granted' ) {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permissions not granted to show notifications')
            }
        }
        return status;
    }

    async obtainCalendarPermission() {
        const {status} = await Permissions.getAsync(Permissions.CALENDAR);
        if ( status !== 'granted' ) {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permissions not granted for Calendar')
            }
        }
        return status;
    }

    async  presentLocalNotifications(date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
      }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        const defaultCalendarSource =
        Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };

        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Con Fusion Table Reservation',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
          });
          console.log(`Your new calendar ID is: ${newCalendarID}`);

          Calendar.createEventAsync(newCalendarID, {
              title: 'Con Fusion Table Reservation',
              startDate: Date.parse(date),
              endDate: Date.parse(date) +  + (2*60*60*1000),
              timeZone: 'Asia/Homg_Kong',
              location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
          })
    }

    

    render() {
        const showDatepicker = () => {
            this.setState({show: true});
        };

        

        return(
            <Animatable.View animation="zoomIn">
                <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number Of Guests</Text>
                    <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})} 
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>AC/Non-AC?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.AC}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ AC: value})}
                        >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <Text style={styles.formItem} onPress={showDatepicker}>
                        {this.state.date.toDateString()} {this.state.time.toLocaleTimeString('en-IN')}
                    </Text>
                    {this.state.show && (
                        <DateTimePicker
                        value={this.state.date}
                        mode={this.state.mode}
                        display="default"
                        minimumDate={new Date()}
                        onChange={(selected, value) => {
                            if (value !== undefined) {
                            this.setState({
                                show: this.state.mode === "time" ? false : true,
                                mode: "time",
                                date: new Date(selected.nativeEvent.timestamp),
                                time: new Date(selected.nativeEvent.timestamp),
                            });
                            } else {
                            this.setState({ show: false });
                            }
                        }}
                        />
                    )}
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve' 
                        color='#512DA8'
                        onPress={() => { this.handleReservation()}}
                        accessibilityLabel='Learn more about this purple button'
                        />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal();}}
                    onRequestClose={() => {this.toggleModal();}}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style={styles.modalText}>AC: {this.state.AC ? 'Yes' : 'No'}</Text>
                            <Text style={styles.modalText}>Date and Time: {this.state.date.toDateString()} {this.state.time.toLocaleTimeString('en-IN')}</Text>
                            <Button 
                                onPress={() => {this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title='Close'
                                />
                        </View>
                </Modal>
                </ScrollView>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "#512DA8",
        textAlign: "center",
        color: "white",
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;