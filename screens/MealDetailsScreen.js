import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
    return <View style={styles.listItem}> 
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailsScreen = (props) => {

    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find((meal)=>{
        if(meal.id===mealId)
            return meal;
    });

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

    const mealId = navigationData.navigation.getParam('mealId');
    console.log("The mealId", mealId);
    const selectedMeal = MEALS.find((meal)=>{
        if(meal.id===mealId)
            return meal;
    });
    console.log("The selected meal", selectedMeal);
    return {
        headerTitle: selectedMeal.name,
        headerRight: ()=> (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Favorite" 
                iconName="ios-star" 
                onPress={console.log("Mark as Favorite!")}
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