import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import DefaultText from './DefaultText';


const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                            <ImageBackground source={{uri: props.imageURL }} style={styles.bgImage}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title} numberOfLines={1}>
                                        {props.name}
                                    </Text>
                                </View>
                            </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetails}}>
                            <DefaultText>{props.duration} mins</DefaultText>
                            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MealItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealItem: {
        height: 200,
        width: '90%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        marginLeft: Dimensions.get('window').width*0.10/2
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetails: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center'
    }
  });