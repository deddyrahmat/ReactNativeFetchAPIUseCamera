/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import SplashScreen from 'react-native-splash-screen'

// component
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Snap from './src/screens/Snap';

const Stack = createStackNavigator();

import {
  StyleSheet
} from 'react-native';

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator> 

      <Stack.Screen name="HomeScreen" component={Home} options={{title: "Home",           headerStyle: {
            backgroundColor: '#03045e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      <Stack.Screen name="DetailScreen" component={Detail} options={{title: "Detail User", headerStyle: {
            backgroundColor: '#03045e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      <Stack.Screen name="SnapScreen" component={Snap} options={{title: "Snap Pic", headerStyle: {
            backgroundColor: '#03045e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
