import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addMembers } from '../redux/Actions/memberActions';
import Toast from 'react-native-easy-toast';
import AsyncStorage from '@react-native-community/async-storage';

class AddMemberScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txt1: '',
            txt2: '',
            txt3: '',
            txt4: '',
            txt5: '',
        }
    }

    onChangeText = (text, type) => {
        console.log('eeee', text, type);
        switch (type) {
            case 'Name':
                this.setState({ txt1: text })
                break;
            case 'Age':
                this.setState({ txt2: text })
                break;
            case 'Email':
                this.setState({ txt3: text })
                break;
            case 'Company':
                this.setState({ txt4: text })
                break;
            case 'Phone':
                this.setState({ txt5: text })
                break;
            default:
                break;
        }
    }

    addMember = async () => {
        const { txt1, txt2, txt3, txt4, txt5 } = this.state;
        if (txt1 && txt2 && txt3 && txt4 && txt5 !== '') {
            let newMember;
            let indexId;
            if (this.props.event.members) {
                indexId = this.props.event.members.length + 1
                newMember = [...this.props.event.members, { name: txt1, age: txt2, email: txt3, company: txt4, phone: txt5, id: indexId }]
            } else {
                newMember = [{ name: txt1, age: txt2, email: txt3, company: txt4, phone: txt5, id: 1 }]
            }
            await this.props.addMembers(newMember);
            const addmember = { name: txt1, age: txt2, email: txt3, company: txt4, phone: txt5, id:  indexId ? indexId : 1}
            await this.storeData(addmember);
            this.toast.show('Member Added!', 500, () => {
                this.props.navigation.goBack();
            });
        }
    }

    storeData = async (newMember) => {
        try {
            const data = await this.getData();
            if (data) {
                const newObject = await data.concat(newMember)
                await AsyncStorage.setItem('@members', JSON.stringify(newObject))
            } else {
                await AsyncStorage.setItem('@members', JSON.stringify([newMember]));
            }

        } catch (error) {
            // saving error
        }
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@members')
            return jsonValue != null ? await JSON.parse(jsonValue) : null;
        } catch (err) {
            // error reading value
        }
    }

    render() {
        const { txt1, txt2, txt3, txt4, txt5 } = this.state
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <Toast
                    ref={(toast) => this.toast = toast}
                    position='top'
                    textStyle={{ color: 'white' }}
                />
                <TextInput
                    style={styles.inputConatainer}
                    onChangeText={(text) => this.onChangeText(text, 'Name')}
                    placeholder='Name'
                    value={txt1}
                />
                <TextInput
                    style={styles.inputConatainer}
                    onChangeText={text => this.onChangeText(text, 'Age')}
                    placeholder='Age'
                    value={txt2}
                />
                <TextInput
                    style={styles.inputConatainer}
                    onChangeText={text => this.onChangeText(text, 'Email')}
                    placeholder='Email'
                    value={txt3}
                />
                <TextInput
                    style={styles.inputConatainer}
                    onChangeText={text => this.onChangeText(text, 'Company')}
                    placeholder='Company'
                    value={txt4}
                />
                <TextInput
                    style={styles.inputConatainer}
                    onChangeText={text => this.onChangeText(text, 'Phone')}
                    placeholder='Phone'
                    value={txt5}
                />
                <TouchableOpacity style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.addMember()} >
                    <Text style={{ fontWeight: 'bold' }}>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputConatainer: {
        height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginRight: 10, marginLeft: 10, marginTop: 10
    }
})

const mapStateToProps = (state) => ({
    event: state.members,
});
const mapDispatchToProps = (dispatch) => ({
    addMembers: bindActionCreators(addMembers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberScreen);
