import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api';
//home模块的小仓库
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，就写对象，服务器返回数组，就写数组。【根据接口返回值初始化的】
    categoryList: [],
    //轮播图的数据
    bannerList:[],
    // floor组件的数据
    floorlist:[]
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList(context){
        let result = await reqCategoryList();
        if(result.code == 200){
            context.commit("CATEGORYLIST",result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList(context){
        let result = await reqGetBannerList();
        if(result.code == 200) {
            context.commit('GETBANNERLIST',result.data);
        }
    },
    //获取floor数据
    async getFloorList(context){
        let result = await reqFloorList();
        if(result.code == 200){
            context.commit('GETFLOORLIST',result.data);
        }
    }
};
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorlist){
        state.floorlist = floorlist;
    }

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}