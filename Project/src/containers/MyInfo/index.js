import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MyInfo</Text>
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