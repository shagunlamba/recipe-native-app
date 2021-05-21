import React from 'react';
import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';



const CategoryMealScreen = (props) => {

    const catID = props.navigation.getParam('categoryId');

    const availableMeals = useSelector((state)=>{
        return state.meals.filteredMeals;
    })

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catID) >=0
    );
    

    if(displayedMeals.length===0){
        return (
        <View style={styles.content}>
            <DefaultText>No Meals Found! Maybe check your filters</DefaultText>
        </View>
        );
    }

    return (
       <MealList 
            listData={displayedMeals} 
            navigation={props.navigation} 
        />
    );
}

export default CategoryMealScreen;

CategoryMealScreen.navigationOptions = (navigationData)=> {
    const catID = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat=> cat.id===catID);
    return {
        headerTitle: selectedCategory.title,
        headerBackTitle: 'Home'
    }
}




const styles = StyleSheet.create({
   content: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   }
});