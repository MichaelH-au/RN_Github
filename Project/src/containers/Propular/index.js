import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import {connect}from 'react-redux'
import {getProject} from "../../store/projects/actions";
import {loadMoreProjects} from "../../store/projects/actions";
import NavigationUtil from '../../navigators/NavigationUtil'
import PopularItem from '../../components/popularItem'
import NavBar from '../../components/NavBar'

const PAGE_SIZE = 10
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames : ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP']
        }
    }

    /**
     * generate tabBar items
     * @private
     */
    _genTabs(){
        const tabs = {};
        this.state.tabNames.forEach((item, index)=> {
            // alert(this.props.getProject)
            tabs[`tab${index}`] = {
                screen: props => <PopularPage {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        })
        return tabs
    }
    render() {
        let statusBar = {
            backgroundColor:'#678',
            barStyle:'light-content'
        }
        let navBar = <NavBar
            title = {'Hot'}
            statusBar={statusBar}
            style={{backgroundColor:'#678'}}
        />
        const TabNavigator = createMaterialTopTabNavigator(this._genTabs(),{
            tabBarOptions:{
                //tabBar style
                tabStyle:styles.tabStyle,
                upperCaseLabel:false,
                scrollEnabled:true,
                style:{
                    //change background color
                    backgroundColor: '#678'
                },
                //underline style
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle

            }
        })
        const NavigatorContainer = createAppContainer(TabNavigator)
        return (
            <View style={{flex:1,paddingTop:0}}>
                {navBar}
                <NavigatorContainer/>
            </View>
        );
    }
}

class PopularTab extends Component {
    componentDidMount(){
        this.props.getProject(this.props.tabLabel, PAGE_SIZE)
    }
    renderItem(data){
        const item = data.item
        return (
            <View style={{marginBottom: 10}}>
                {/*<Text style={{backgroundColor:'#faa'}}>{JSON.stringify(item)}</Text>*/}
                <PopularItem item={item} onSelect={()=>{}}/>
            </View>
        )
    }
    render() {
        const {tabLabel} = this.props;
        // let tabLabel = this.props.tabLabel
        const {projects} = this.props;
        let store = projects[tabLabel]?projects[tabLabel]:{items:[],isLoading:false};

        return (
            <View style={styles.container}>
                {/*<Text onPress={()=>{*/}
                    {/*NavigationUtil.redirectPage({*/}
                        {/*navigation:this.props.navigation*/}
                    {/*},'DetailPage')*/}
                {/*}}>Redirect to Detail</Text>*/}
                {/*<Text>{this.props.tabLabel}</Text>*/}
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.id}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={'red'}
                            colors={['red']}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.props.getProject(this.props.tabLabel)}
                            tintColor={'red'}
                        />
                    }
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.props.loadMoreProjects(tabLabel,++store.pageIndex,PAGE_SIZE ,store.allProjects)
                                this.canLoadMore = false
                            }
                        }, 100)
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin = {() => {
                        this.canLoadMore = true
                    }}
                />
                {store.loadFinished
                    ?<Text>No more project</Text>
                    :null
                }
                {this.canLoadMore
                    ?<Text> project</Text>
                        :<Text>no project</Text>
                }
            </View>
        );
    }
}
const mapStateToProps = state => ({
    projects:state.project
})

const actionCreator = {
    getProject,
    loadMoreProjects
}
const PopularPage = connect(mapStateToProps, actionCreator)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle:{
        minWidth:30,
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6
    }
})
export default Index;