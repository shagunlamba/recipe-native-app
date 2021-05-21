import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { createStore, combineReducers } from 'redux';
import mealsReducer from './store/reducers/meals';
import { Provider } from 'react-redux';


const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);


enableScreens();


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf')
  });
}


export default function App() {


  const [loading, setLoading]= useState(false);
  if(!loading){
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={()=> setLoading(true)} 
              onError={(err)=>{console.log("The error", err)}}
              />
  }


  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MealsNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
