import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesom from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'
import BaseItem from '../BaseItem'



class Index extends BaseItem {
    render() {
        const {projectModel} = this.props;
        const {item} = projectModel
        // const {item} = this.props;
        if (!item) return null
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
        let description = `<p>${item.description}</p>`
        return (
            <View>
                <TouchableOpacity
                    onPress={this.props.onSelect}
                >
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>{item.fullName}</Text>
                        {/*<Text style={styles.description}>{item.description}{item.meta}</Text>*/}
                        <HTMLView
                            value={description}
                            onLinkPress={(url) => {

                            }}
                            stylesheet={{
                                p: styles.description,
                                a: styles.description,
                            }}
                        />
                        <Text style={styles.description}>{item.meta}</Text>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Text>Author:</Text>
                                {item.contributors.map((result, i, arr) => (
                                    <Image
                                        key={i}
                                        style={{height:22,width:22,margin:2}}
                                        source={{uri:arr[i]}}
                                    />
                                ))}
                            </View>
                            <View style={styles.row}>
                                <Text>Start:</Text>
                                <Text>{item.starCount}</Text>

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