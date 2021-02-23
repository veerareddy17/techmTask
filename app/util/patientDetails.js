import React from 'react';
import {View, Text, TextInput, Button} from 'react-native'
const PatinetDetailes = () => {
    return (
        <View style={{ height: 220, marginRight: 10, marginLeft: 10, borderColor: 'gary', borderRadius: 5, borderWidth: 1, marginTop: 2 }}>
            <Text style={{ height: 20, color: 'black', marginTop: 10, marginLeft: 10 }}>Birth Date</Text>
            <TextInput style={{ borderColor: 'gary', borderRadius: 5, borderWidth: 1, height: 40, marginLeft: 10, marginRight: 10 }}
                placeholder='choose date'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 70, marginTop: 20 }}>
                <View style={{ height: 50, flex: 0.5 }}>
                    <Text style={{ marginLeft: 10, marginBottom: 2 }}>Age</Text>
                    <TextInput style={{ borderColor: 'gary', borderRadius: 5, borderWidth: 1, height: 40, marginLeft: 10, marginRight: 10 }}
                        placeholder='age'
                    />
                </View>
                <View style={{ height: 50, flex: 0.5 }}>
                    <Text style={{ marginLeft: 10, marginBottom: 2 }}>Gender</Text>
                    <TextInput style={{ borderColor: 'gary', borderRadius: 5, borderWidth: 1, height: 40, marginLeft: 10, marginRight: 10 }}
                        placeholder='gender'
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button title='Clear search' />
                <Button title='Search' />
            </View>
        </View>
    )
}

export default PatinetDetailes;