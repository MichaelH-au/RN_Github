import React, {Component} from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeSpan from './TImeSpan'

export const timeSpans = [new TimeSpan('Today', 'since=daily'), new TimeSpan('Weekly', 'since=weekly'), new TimeSpan('Monthly', 'since=monthly'), ]
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
    }
    show() {
        this.setState({
            visible:true
        })
    }
    dismiss() {
        this.setState({
            visible:false
        })
    }

    render() {
        const {onClose, onSelect} = this.props
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => onClose}

            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.dismiss()}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                        {timeSpans.map((item, i, arr) => {
                            return <TouchableOpacity
                                key={i}
                                onPress={() => onSelect(arr[i])}
                                underlayColor='transparent'
                            >
                                <View style={styles.text_container}>
                                    <Text style={styles.text}>{arr[i].showText}</Text>
                                </View>
                                    {i !=timeSpans.length - 1
                                        ? <View style={styles.underline}></View>
                                        : null
                                    }
                            </TouchableOpacity>
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex:1,
        alignItems: 'center'
    },
    arrow: {
        marginTop:40,
        color: 'white',
        padding:0,
        margin:-15
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight:3,
    },
    text_container: {
        flexDirection:'row',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize:16,
        fontWeight: '400',
        padding: 8,
        paddingLeft:26,
        paddingRight:26
    },
    underline:{
        height:0.3,
        backgroundColor: 'darkgray'
    }
})

export default Index;