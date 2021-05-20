import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MealItem from './MealItem';

const MealList = (props) => {

    const renderMealItem = (itemData)=>{
        return (
           <MealItem 
                name={itemData.item.name} 
                duration={itemData.item.duration} 
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                imageURL={itemData.item.imageUrl}
                onSelectMeal={()=>{
                    props.navigation.navigate({routeName: 'MealDetail', params: {
                        mealId: itemData.item.id
                    }})
                }}
                />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData} 
                keyExtractor={(item,index)=>item.id}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
     </View>
    )
}

export default MealList;

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});