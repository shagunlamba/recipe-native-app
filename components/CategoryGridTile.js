import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback, Touchable, TouchableNativeFeedbackBase } from 'react-native';

const CategoryGridTile = (props) => {

    let TouchableCmp = TouchableOpacity;

    if(Platform.OS=== 'android' && Platform.Version>=21){
        TouchableCmp= TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp 
                    onPress={props.onSelect}
                    style={{flex: 1}}
                >
                    <View style={{...styles.container, ...props.styles}}>
                        <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                    </View>
            </TouchableCmp>
        </View>
    )
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10, 
        overflow: Platform.OS === 'android' && Platform.Version>=21? 'hidden': 'visible',
        elevation: 5
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        elevation: 3,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right'
    }
  });
  