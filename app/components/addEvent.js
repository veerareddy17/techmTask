import React from 'react';
import { View, TextInput, Modal, Text, StyleSheet } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNCalendarEvents from "react-native-calendar-events";

const utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
};
let currentDate;
class AddEventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDatePickerVisible: false,
            date: new Date(),
            title: '',
            startDate: '',
            endDate: '',
            type: ''
        }
    }

    addToCalendar = () => {
        const { title, startDate, endDate } = this.state;
        if (title && startDate && endDate === '') { return }
        const eventConfig = {
            title,
            startDate,
            endDate,
            navigationBarIOS: {
                tintColor: 'orange',
                backgroundColor: 'green',
                titleColor: 'blue',
            },
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then((eventInfo) => {
                console.log('added event', JSON.stringify(eventInfo));
            })
            .catch((error) => {
                // handle error such as when user rejected permissions
                console.log('add event error', error);
            });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    onChange = (selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        if (this.state.type === "start") {
            this.setState({ startDate: currentDate })
        } else {
            this.setState({ endDate: currentDate })
        }
    };

    onChangeText = (text) => {
        this.setState({ title: text })
    }

    onHandleStart = (startDate) => {
        this.setState({ type: startDate, isDatePickerVisible: true })
    }

    onHandleEnd = (endDate) => {
        this.setState({ type: endDate, isDatePickerVisible: true })
    }

    onHandlePicker = () =>{
        this.hideDatePicker();
    }

    render() {
        const { startDate, endDate } = this.state;
        const selectedFromDate = startDate !== '' ? moment(startDate).format("dddd Do MMMM YYYY") : ''
        const selectedToDate = endDate !== '' ? moment(endDate).format("dddd Do MMMM YYYY") : ''

        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.inputConatainer}
                    placeholder='title'
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.title}
                />
                <TouchableOpacity style={styles.startDate}
                    onPress={() => this.onHandleStart('start')}>
                    <Text>{`start date: ${selectedFromDate}`}</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.startDate}
                    onPress={() => this.onHandleEnd('end')}>
                    <Text>{`end date: ${selectedToDate}`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.addToCalendar()} >
                    <Text style={{ fontWeight: 'bold', color: 'red' }}>Add</Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isDatePickerVisible}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={{
                                margin: 20,
                                backgroundColor: "white",
                                borderRadius: 20,
                                padding: 35,
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5
                            }}>
                                <DateTimePicker
                                    style={{ height: 200, width: 300 }}
                                    value={this.state.date}
                                    mode='datetime'
                                    is24Hour={true}
                                    display='spinner'
                                    onChange={(event, date) => this.onChange(date)}
                                />
                                <TouchableOpacity style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onHandlePicker()} >
                                    <Text style={{ fontWeight: 'bold' }}>close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputConatainer: {
        height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginRight: 10, marginLeft: 10, marginTop: 10
    },
    startDate: {
        height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginRight: 10, marginLeft: 10, marginTop: 10
    }
})

export default AddEventScreen;