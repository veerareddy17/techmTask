import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/home';
import AddMemberScreen from '../components/addMember';
import AddEventScreen from '../components/addEvent'
import UserDetailes from '../components/userDetailes'
const Stack = createStackNavigator();


const navigationContainer = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AddMember" component={AddMemberScreen} />
            <Stack.Screen name="AddEvent" component={AddEventScreen} />
            <Stack.Screen name="UserDetailes" component={UserDetailes} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}
export default navigationContainer;