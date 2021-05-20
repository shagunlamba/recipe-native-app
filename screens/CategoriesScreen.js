import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';


const CategoriesScreen = (props) => {

    const renderGridItem = (itemData)=> {
        return (
            <CategoryGridTile 
              title={itemData.item.title}
              color={itemData.item.color}
              styles={{backgroundColor: itemData.item.color}}
              onSelect={()=>{
                    props.navigation.navigate({routeName: 'CategoryMeals', params: {
                        categoryId: itemData.item.id
                    }})
              }
              }
            />
        )
    }



    return (
        <View style={styles.screen}>
            <FlatList 
                keyExtractor={(item,index)=> item.id} 
                data={CATEGORIES} 
                numColumns={2} 
                renderItem={renderGridItem} 
            />
        </View>
    )
}

CategoriesScreen.navigationOptions = (navData)=>{
    return {
        headerTitle: 'Meal Categories',
        headerLeft: ()=> (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Menu" 
                iconName="ios-menu" 
                onPress={()=>{
                    navData.navigation.toggleDrawer()
                }}
                />
        </HeaderButtons>
        )
    }
}

export default CategoriesScreen;


const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'pink'
    }
});