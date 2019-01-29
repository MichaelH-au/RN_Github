import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../../navigators/NavigationUtil'

class Index extends Component {
    componentDidMount() {
        this.timer = setTimeout(()=>{
            this.props.navigation.navigate('HomePage')
            NavigationUtil.resetTohomePage(this.props.navigation)
        },2000)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome assistant</Text>
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