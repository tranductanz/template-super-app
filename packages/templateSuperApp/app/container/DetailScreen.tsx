import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text>DetailScreen</Text>
            <Button title='Back to HomeScreen' onPress={() => {
                navigation.goBack()
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
export default DetailScreen