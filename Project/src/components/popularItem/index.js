import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesom from 'react-native-vector-icons/FontAwesome'
import BaseItem from '../BaseItem'
class Index extends BaseItem {
    render() {
        // const {item} = this.props;
        const {projectModel} = this.props;
        const {item} = projectModel
        console.log(item)
        if (!item || !item.owner) return null
        // let favoriteButton =
        //     <TouchableOpacity
        //         style={{padding:6}}
        //         onPress={()=>{}}
        //         underlayColor={'transparent'}
        //     >
        //         <FontAwesom
        //             name={'star-o'}
        //             size={26}
        //             style={{color:'red'}}
        //         />
        //     </TouchableOpacity>
        return (
            <View>
                <TouchableOpacity
                    onPress={this.props.onSelect}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.full_name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Text>Author:</Text>
                                <Image
                                    style={{height:22,width:22}}
                                    source={{uri:item.owner.avatar_url}}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text>Start:</Text>
                                <Text>{item.stargazers_count}</Text>

                            </View>
                            {/*{favoriteButton}*/}
                            {this._favoriteIcon()}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    row:{
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    itemContainer:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',
        shadowOffset:{width: 0.5, height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        //shadow for Android
        elevation: 2
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    }
})

export default Index;