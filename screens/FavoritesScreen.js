import React from 'react';

import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = (props) => {

    const favMeals = MEALS.filter(meal=>{
        if(meal.id==='m1' || meal.id==='m2')
            return meal;
    });

    console.log("favMeals", favMeals);

    return (
           <MealList 
                listData={favMeals} 
                navigation={props.navigation} 
            />
    )
}

export default FavoritesScreen;


FavoritesScreen.navigationOptions = (navData)=> {
    return {
        headerTitle: 'Your favorites',
        headerLeft: ()=> (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Menu" 
                iconName="ios-menu" 
                onPress={()=>{
                    navData.navigation.toggleDrawer()
                }}
                />
        </HeaderButtons>)
    }
}
