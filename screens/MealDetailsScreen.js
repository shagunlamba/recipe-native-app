import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';



const ListItem = props => {
    return <View style={styles.listItem}> 
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailsScreen = (props) => {

    const allMeals = useSelector((state)=>{
        return state.meals.meals;
    })

    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = allMeals.find((meal)=>{
        if(meal.id===mealId)
            return meal;
    });

    const currentMealIsFav = useSelector((state)=>{
        return state.meals.favoriteMeals.some((meal)=>{
            if(meal.id=== mealId)
                return true;
        })
    })

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(()=>{
        console.log("Marked as Fav");
        dispatch(toggleFavorite(mealId));
    },[dispatch, mealId]);

    useEffect(()=>{
        props.navigation.setParams({
            toggleFav: toggleFavoriteHandler
        });
    },[toggleFavoriteHandler]);

    
    useEffect(()=>{
        props.navigation.setParams({
            isFav: currentMealIsFav
        });
    },[currentMealIsFav]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                            <DefaultText>{selectedMeal.duration} mins</DefaultText>
                            <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                            <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
                {
                    selectedMeal.ingredients.map((element)=>{
                        return <ListItem key={element}>{element}</ListItem>
                    })
                }
            <Text style={styles.title}>Steps</Text>
                {
                    selectedMeal.steps.map((element)=>{
                        return <ListItem key={element}>{element}</ListItem>
                    })
                }
        </ScrollView>
    )
}

export default MealDetailsScreen;


MealDetailsScreen.navigationOptions = (navigationData)=> {

    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    // console.log("The mealId", mealId);
    // const selectedMeal = MEALS.find((meal)=>{
    //     if(meal.id===mealId)
    //         return meal;
    // });
    // console.log("The selected meal", selectedMeal);
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');

    return {
        headerBackTitle: 'Back',
        headerTitle: mealTitle,
        headerRight: ()=> (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Favorite" 
                iconName={ isFav? "ios-star": "ios-star-outline"}
                onPress={toggleFavorite}
                />
        </HeaderButtons>
        )
    };
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});