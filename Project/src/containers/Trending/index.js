import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation'
import {createAppContainer} from 'react-navigation'
import {connect}from 'react-redux'
import {getTrending} from "../../store/trendings/actions";
import {loadMoreTredings} from "../../store/trendings/actions";
import NavigationUtil from '../../navigators/NavigationUtil'
// import PopularItem from '../../components/popularItem'
import PopularItem from '../../components/trendingItem'
import NavBar from '../../components/NavBar'
import TrendingDialog, {timeSpans} from '../../components/TrendingDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const PAGE_SIZE = 10
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames : ['All', 'Java', 'JavaScript', 'PHP'],
            timeSpan:timeSpans[0]
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
                screen: props => <PopularPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        })
        return tabs
    }
    renderTitleView() {
        return <View>
            <TouchableOpacity
                underlayColor = 'transparent'
                onPress={() => this.dialog.show()}
            >
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400'
                    }}>
                        Trending {this.state.timeSpan.showText}
                    </Text>
                    <MaterialIcons
                        name = {'arrow-drop-down'}
                        size={22}
                        style={{color:'white'}}
                    />
                </View>

            </TouchableOpacity>
        </View>
    }
    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan:tab
        })
    }
    renderTrendingDialog() {
        return <TrendingDialog
            ref = {dialog => this.dialog = dialog}
            onSelect = {tab => this.onSelectTimeSpan(tab)}
        />
    }
    createTopNav() {
        let TabNavigator = null
        if (!this.TabNavigator) {
            TabNavigator = createMaterialTopTabNavigator(this._genTabs(),{
                tabBarOptions:{
                    //tabBar style
                    tabStyle:styles.tabStyle,
                    upperCaseLabel:false,
                    scrollEnabled:true,
                    style:{
                        //change background color
                        backgroundColor: '#678',
                        height:30
                    },
                    //underline style
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle

                }
            })
            TabNavigator = createAppContainer(TabNavigator)
            this.TabNavigator = TabNavigator
            return TabNavigator
        } else {
            return this.TabNavigator
        }

    }
    render() {
        let statusBar = {
            backgroundColor:'#678',
            barStyle:'light-content'
        }
        let navBar = <NavBar
            // title = {'Trending'}
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor:'#678'}}
        />

        const NavigatorContainer = this.createTopNav()
        return (
            <View style={{flex:1,paddingTop:0}}>
                {navBar}
                <NavigatorContainer/>
                {this.renderTrendingDialog()}
            </View>
        );
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.timeSpan = this.props.timeSpan.searchText
    }

    componentDidMount(){
        this.props.getTrending(this.props.tabLabel, PAGE_SIZE, this.timeSpan)
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
        let store = projects[tabLabel]?projects[tabLabel]:{items:[],isLoading:true};

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
                    keyExtractor={item => '' + item.fullName}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={'red'}
                            colors={['red']}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.props.getTrending(this.props.tabLabel, PAGE_SIZE, this.timeSpan)}
                            tintColor={'red'}
                        />
                    }
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.props.loadMoreTredings(tabLabel,++store.pageIndex,PAGE_SIZE ,store.allProjects)
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
    projects:state.trending
})

const actionCreator = {
    getTrending,
    loadMoreTredings
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
        // minWidth:30,  //may cause problem when first loading on android
        padding: 0
    },
    indicatorStyle:{
        height:2,
        backgroundColor:'white'
    },
    labelStyle:{
        fontSize:13,
        // marginTop:6,
        // marginBottom:6
        margin:0
    }
})
export default Index;