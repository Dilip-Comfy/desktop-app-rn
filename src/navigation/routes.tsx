import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialScreen from '../views/InitialScreen';
import SecretPhrase from '../views/SecretPhrase';
import ConfirmSecretPhrase from '../views/ConfirmSecretPhrase';
import Dashboard from '../views/Dashboard';
import ImportSecretPhrase from '../views/ImportSecretPhrase';
import SetPasswordScreen from '../views/SetPasswordScreen';
import VerifyPassword from '../views/VerifyPassword';

// Authorization
// import SplashScreen from '@views/SplashScreen';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="InitialScreen"
        screenOptions={{animation: 'ios_from_right'}}>
        {/* General */}
        <>
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SecretPhrase"
            component={SecretPhrase}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ConfirmSecretPhrase"
            component={ConfirmSecretPhrase}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ImportSecretPhrase"
            component={ImportSecretPhrase}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SetPasswordScreen"
            component={SetPasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerifyPassword"
            component={VerifyPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
