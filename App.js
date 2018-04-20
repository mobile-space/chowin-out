import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './app/navigation/RootNavigator';
import AppProvider, { AppContext } from './app/components/AppProvider';

export default class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
