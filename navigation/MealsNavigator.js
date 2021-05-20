import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';


const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealScreen,
    MealDetail: MealDetailScreen
},{
     mode: 'card',
     defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
        },
        headerTintColor: Platform.OS === 'android'? 'white': Colors.primaryColor
    }
}
);




const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
        },
        headerTintColor: Platform.OS === 'android'? 'white': Colors.primaryColor,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});





const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=> {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            }
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=> {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            }
        }
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.accent
    }
});

const FiltersNavigator= createStackNavigator({
    FiltersScreen: FiltersScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android'? Colors.primaryColor: ''
        },
        headerTintColor: Platform.OS === 'android'? 'white': Colors.primaryColor
    }
})


const MainNavigator = createDrawerNavigator({
    MealsFav:  { 
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
},{
    contentOptions: {
        activeTintColor: Colors.accent,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            marginVertical: 10,
            padding: 5
        }
    }
});




export default createAppContainer(MainNavigator);