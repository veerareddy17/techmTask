import React from 'react';
import { View, TextInput, Modal, Text, StyleSheet } from 'react-native';


class UserDetailes extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.route.params.userDetailes)
    }


    render() {
        const userDetailes = this.props.route.params.userDetailes
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.familyName}>
                    <Text style={styles.label}>Family Name</Text>
                    <Text style={styles.text}>{`${userDetailes.name[0].family}`}</Text>
                </View>
                <View style={styles.familyName}>
                    <Text style={styles.label}>Given Name</Text>
                    <Text style={styles.text}>{`${userDetailes.name[0].given[0]}`}</Text>
                </View>
                <View style={styles.familyName}>
                    <Text style={styles.label}>Gender</Text>
                    <Text style={styles.text}>{`${userDetailes.gender}`}</Text>
                </View>
                <View style={styles.familyName}>
                    <Text style={styles.label}>Date Birth</Text>
                    <Text style={styles.text}>{`${userDetailes.birthDate}`}</Text>
                </View>
                <View style={styles.familyName}>
                    <Text style={styles.label}>Identifier</Text>
                    <Text style={styles.text}>{`${userDetailes.id}`}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    familyName: {
        flexDirection: 'row', justifyContent: 'flex-start', height: 50, alignItems: 'center', marginLeft: 20
    },
    label:{
        flex: 0.5
    },
    text: {
        fontWeight:'bold', flex: 0.5
    }

})


export default UserDetailes;