
import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
const HomeScreen = () => {
    const navigation = useNavigation();
    const stateExample = useSelector(state => state)
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <Button title='Go to Detail' onPress={() => {
                //@ts-ignore
                navigation.navigate('Detail')
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HomeScreen