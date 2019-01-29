import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux'
import { changThemeColor } from "../../store/theme/actions";

class Index extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>Trending</Text>
                <Button
                    title='chang color'
                    onPress={()=>{
                        navigation.setParams({
                            theme:{
                                tintColor:'red',
                                updateTime:new Date().getTime()
                            }
                        })
                    }}
                />
                <Button
                    title='chang color redux'
                    onPress={()=>{this.props.changThemeColor('blue')}}
                />
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

const mapStateToProps = state=>({
    theme:state.theme
})

const actionCreators = {changThemeColor}

// const mapDispatchToProps = dispatch => ({
//     onThemeChange: theme => dispatch(changThemeColor(theme))
// })
export default connect(mapStateToProps, actionCreators)(Index);