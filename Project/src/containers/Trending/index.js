import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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