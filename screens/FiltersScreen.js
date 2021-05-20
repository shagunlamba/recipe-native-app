import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';


const FilterSwitch = (props) =>{
    return (
        <View style={styles.filterContainer}>
                <Text style={styles.filterHeading}>{props.label}</Text>
                <Switch 
                    value={props.state} 
                    onValueChange={props.onChange}
                    trackColor={{true: Colors.primaryColor}}
                    thumbColor={Platform.OS==='android'? Colors.primaryColor: ''}
                />
        </View>

    )
}

const FiltersScreen = (props) => {

    const { navigation } = props;

    const [isGlutenFree, setGlutenFree]= useState(false);
    const [isLactoseFree, setLactoseFree]= useState(false);
    const [isVegan, setVegan]=useState(false);
    const [isVeg, setVeg] = useState(false);

    const saveFilters = useCallback(()=>{
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            isVeg: isVeg
        }
        console.log("Here",appliedFilters);
    },[isGlutenFree, isLactoseFree, isVegan, isVeg]);

    useEffect(()=>{
        props.navigation.setParams({
            save: saveFilters
        });
    },[saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch 
                label="Gluten-free"
                state={isGlutenFree}
                onChange={(newValue)=>{setGlutenFree(newValue)}}
            />
            <FilterSwitch 
                label="Lactose-free"
                state={isLactoseFree}
                onChange={(newValue)=>{setLactoseFree(newValue)}}
            />
            <FilterSwitch 
                label="Vegeterian"
                state={isVegan}
                onChange={(newValue)=>{setVegan(newValue)}}
            />
            <FilterSwitch 
                label="Vegan"
                state={isVeg}
                onChange={(newValue)=>{setVeg(newValue)}}
            />
        </View>
    )
}

export default FiltersScreen;


FiltersScreen.navigationOptions = (navData)=> {

    return {
        headerTitle: 'Filter Meals',
        headerLeft: ()=> (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Menu" 
                iconName="ios-menu" 
                onPress={()=>{
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Save" 
                iconName="ios-save" 
                onPress={
                    navData.navigation.getParam('save')
                }
            />
        </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        margin: 20,
        textAlign: 'center',
        fontSize: 22
    },
    filterHeading: {
        fontFamily: 'open-sans-bold'
    }
});