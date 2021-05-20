import React from 'react';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';
import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealScreen = (props) => {

    const catID = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catID) >=0
    );

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
        headerTitle: selectedCategory.title
    }
}

