/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {LogBox} from 'react-native';
import Routes from './src/navigation/routes';

import {Provider as PaperProvider} from 'react-native-paper';
// import { ThemeProvider } from '@theme/themeContext';
// import { MenuProvider } from 'react-native-popup-menu';

// import { NetworkProvider, useNetwork } from '@utils/NetworkProvider';
// import NoInternetModal from '@utils/NoInternetModal';

// This will ignore all log notifications on the device screen
// LogBox.ignoreAllLogs();

const App: React.FC = () => {
  // const { isConnected } = useNetwork();

  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
};

export default App;
