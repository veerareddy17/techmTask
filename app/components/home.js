import React from 'react';
import { View, SafeAreaView, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMembers, removeMember } from '../redux/Actions/memberActions'
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterArray: [
                { label: 'AsendingBy Name', value: 'AsendingBy Name' },
                { label: 'DesendingBy Name', value: 'DesendingBy Name' },
                { label: 'AsendingBy Age', value: 'AsendingBy Age' },
                { label: 'DesendingBy Age', value: 'DesendingBy Age' }
            ],
            filter: '',
        }
        this.controller;
    }

     async componentDidMount() {
        const data = await this.getData();
        if (data) {
            this.props.addMembers(data);
        }
    }
    sortByNameDesendingOrder = (type) => {
        switch (type) {
            case 'AsendingBy Name':
                const asendingByName = this.props.event.members.sort((m1, m2) => m1.name.localeCompare(m2.name));
                this.props.addMembers(asendingByName);
                break;
            case 'DesendingBy Name':
                const desendingByName = this.props.event.members.sort((m1, m2) => m2.name.localeCompare(m1.name));
                this.props.addMembers(desendingByName);
                break;
            case 'AsendingBy Age':
                const asendingByAge = this.props.event.members.sort((m1, m2) => Number(m1.age) - Number(m2.age));
                this.props.addMembers(asendingByAge);
                break;
            case 'DesendingBy Age':
                const desendingByAge = this.props.event.members.sort((m1, m2) => Number(m2.age) - Number(m1.age));
                this.props.addMembers(desendingByAge);
                break;
            default:
                break;
        }
    }

    deleteItemById = async id => {
        const filteredData = this.props.event.members.filter(item => item.id !== id);
        this.props.removeMember(filteredData);
        await this.updateData(id);
    }

    renderItem = ({ item }) => {
        const { name, email, company, age, phone } = item;
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddEvent')}
                onLongPress={() => this.deleteItemById(item.id)}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: '#f9c2ff',
                    marginVertical: 8,
                    marginHorizontal: 16
                }}>
                <Text>{`Name: ${name}`}</Text>
                <Text>{`comapny: ${company}`}</Text>
                <Text>{`email: ${email}`}</Text>
                <Text>{`phone: ${phone}`}</Text>
                <Text>{`age: ${age}`}</Text>
            </TouchableOpacity>
        );
    };

    updateData = async (id) => {
        try {
            let jsonData = await this.getData();
            if (jsonData) {
                const index = jsonData.findIndex(item => item.id === id);
                if (index > -1) {
                    jsonData.splice(index, 1);
                   await AsyncStorage.setItem('@members', JSON.stringify(jsonData));
                }
            }

        } catch (error) {
            // saving error
        }
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@members')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (err) {
            // error reading value
        }
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: '100%', height: 50, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Button title='Add' onPress={() => this.props.navigation.navigate('AddMember')} />
                </View>
                <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <DropDownPicker
                        items={this.state.filterArray}
                        controller={instance => this.controller = instance}
                        onChangeList={(items, callback) => {
                            this.setState({
                                filterArray: items
                            }, callback);
                        }}
                        containerStyle={{ height: 40, width: '100%' }}
                        placeholder='filter'
                        onChangeItem={item => this.sortByNameDesendingOrder(item.value)}
                        dropDownMaxHeight={50}
                    />
                </View>
                <FlatList
                    data={this.props.event.members}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    event: state.members,
});

const mapDispatchToProps = (dispatch) => ({
    addMembers: bindActionCreators(addMembers, dispatch),
    removeMember: bindActionCreators(removeMember, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
