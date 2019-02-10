import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavBar from '../../components/NavBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Index extends Component {
    getRightButton() {
        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity
                onPress = {() => {

                }}
            >
                <View style={{padding:5, marginRight:8}}>
                    <Feather
                        name={'search'}
                        size = {24}
                        style={{color:'white'}}
                    />
                </View>
            </TouchableOpacity>


        </View>
    }
    getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding:8,paddingLeft:12}}
            onPress = {callBack}
        >
            <Ionicons
                name = {'ios-arrow-back'}
                size = {26}
                style={{color:'white'}}
            />
        </TouchableOpacity>
    }
    render() {
        let statusBar = {
            backgroundColor:'#678',
            barStyle:'light-content'
        }
        let navBar = <NavBar
            title = {'My Info'}
            statusBar={statusBar}
            style={{backgroundColor:'#678'}}
            rightButton = {this.getRightButton()}
            leftButton = {this.getLeftButton()}
        />
        return (
            <View style={styles.container}>
                {navBar}
                {/*<Text>MyInfo</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})
export default Index;