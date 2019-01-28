import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'

class Index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Propular</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})
export default Index;