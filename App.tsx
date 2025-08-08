import React from 'react';
import { SafeAreaView, Text, StatusBar, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.helloText}>Hello, World!</Text>
 <Text style={styles.helloText}>Desktop Application</Text>
    </SafeAreaView>
  );
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
