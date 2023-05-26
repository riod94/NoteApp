import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {MainScreen, NoteScreen} from '../screens';
import theme from '../styles/theme';

const {Navigator, Screen} = createNativeStackNavigator();

const MainNavigator = () => (
  <Navigator initialRouteName="Main">
    <Screen name="Main" component={MainScreen} options={{headerShown: false}} />
    <Screen name="Note" component={NoteScreen} options={{headerShown: false}} />
  </Navigator>
);

function AppNavigator() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary[500]}
      />
      <NavigationContainer independent={true}>
        <MainNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default AppNavigator;
