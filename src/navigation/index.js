import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home';
import ImageDetails from '../screens/imageDetails';

const MainNav = createStackNavigator();

export default () => (
  <NavigationContainer>
    <MainNav.Navigator>
      <MainNav.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <MainNav.Screen
        name="image-details"
        component={ImageDetails}
        options={{headerShown: false}}
      />
    </MainNav.Navigator>
  </NavigationContainer>
);
