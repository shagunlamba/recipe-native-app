import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialStore = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}

const mealsReducer = (state=initialStore, action)=>{
    switch(action.type){
        case TOGGLE_FAVORITE: 
            const existingMeal = state.favoriteMeals.find((meal)=>{
                if(meal.id === action.mealID)
                   {
                      return meal;
                   } 
            });
            if(existingMeal){
                console.log("HERE1");
                const updatedFavMeals = [...state.favoriteMeals];
                const existingIndex= updatedFavMeals.indexOf(existingMeal);
                updatedFavMeals.splice(existingIndex,1);
                console.log("The updated meals", updatedFavMeals);
                return {
                    ...state,
                    favoriteMeals: updatedFavMeals
                }
            }
            else{
                console.log("HERE2");
                const updatedFavMeals = [...state.favoriteMeals];
                const foundMeal = state.meals.find(meal=>{
                    if(meal.id === action.mealID)
                       {
                           return meal;
                       } 
                })
                updatedFavMeals.push(foundMeal);
                return {
                    ...state,
                    favoriteMeals: updatedFavMeals
                }
            }
        case SET_FILTERS: 
            const appliedFilters = action.filters;
            const filteredMeals = state.meals.filter((meal)=>{
                if(appliedFilters.glutenFree && !meal.isGlutenFree){
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                    return false;
                }
                if(appliedFilters.isVeg && !meal.isVegeterian){
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan){
                    return false;
                }
                return true;
            });
            return {
                ...state,
                filteredMeals: filteredMeals
            }
        default:
            return state;
    }
}

export default mealsReducer;