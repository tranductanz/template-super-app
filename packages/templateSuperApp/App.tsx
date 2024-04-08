import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './app/navigator/appNavigator';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/rootStore/store';
const App = () => {

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default App