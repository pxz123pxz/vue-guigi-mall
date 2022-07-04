import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid--->生成一个随机字符串(不能再变了)
import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
};
const actions={
    // 获取产品信息的action
    async getGoodInfo(context,skuId){
        let result = await reqGoodsInfo(skuId);
        // console.log(result);
        if(result.code==200){
            context.commit("GETGOODINFO",result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart(context,{skuId, skuNum}){
        // 加入购物车返回解构
        // 加入购物车以后(发请求)，前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其它的数据，只是返回code=200，代表这次操作成功
        // 因为服务器没有返回其余数据，所以不需要进行三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 代表服务器加入购物车成功
        if(result.code==200){
            return "ok"
        }else{
            //代表加入购物车失败 
            return Promise.reject(new Error('faile'));
        }
    }
};
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo;
    }
};
// 简化数据而生
const getters={
    // 路径导航简化的数据
    categoryView(state) {
        // 数据可能没有返回，这时的categoryView为undefined，所以至少让它是一个空对象
        // 当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default{
    state,
    actions,
    mutations,
    getters
}
