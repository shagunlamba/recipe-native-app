import React from 'react';

import MealList from '../components/MealList';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { View , StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = (props) => {

    const favMeals = useSelector((state)=>{
        return state.meals.favoriteMeals
    });

    if(!favMeals || favMeals.length===0 ){
        return <View style={styles.content}>
            <DefaultText>No Meals Found. Please start adding some!</DefaultText>
        </View>
    }

    return (
           <MealList 
                listData={favMeals} 
                navigation={props.navigation} 
            />
    )
}

export default FavoritesScreen;

const styles = StyleSheet.create({
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
})


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
