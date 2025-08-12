import React from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet} from 'react-native';
import InitialScreen from './src/views/InitialScreen';
import SecretPhrase from './src/views/SecretPhrase';
import ConfirmSecretPhrase from './src/views/ConfirmSecretPhrase';

const App = () => {
  return <ConfirmSecretPhrase />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helloText: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
