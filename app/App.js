import React from 'react';
import { View } from 'react-native'
import NavigationContainer from '../app/navigationContainer/stackNavigator';
import { Provider } from 'react-redux';
import {store} from './redux/store'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer />
            </Provider>
        )
    }
}