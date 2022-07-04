//引入一级路由组件
// import Home from '@/pages/Home/Home.vue'
// import Search from '@/pages/Search/Search.vue'
// import Login from '@/pages/Login/Login.vue'
// import Register from '@/pages/Register/Register.vue'
// import Detail from '@/pages/Detail/Detail.vue'
// import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
// import ShopCart from '@/pages/ShopCart/ShopCart.vue'
// import Trade from '@/pages/Trade/Trade.vue'
// import Pay from '@/pages/Pay/Pay.vue'
// import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue'
// import Center from '@/pages/Center/Center.vue'
// // 引入二级路由组件
// import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue'
// import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder.vue'
/*
当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
// 路由配置信息
export default [
    {
        path:'/center',
        // 路由懒加载
        component: ()=>import('@/pages/Center/Center'),
        meta: { show: true},
        // 二级路由组件
        children: [
            {
                path: "myorder",
                component: ()=>import('@/pages/Center/MyOrder/MyOrder'),
            },
            {
                path: "grouporder",
                component: ()=>import('@/pages/Center/GroupOrder/GroupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path:'/paysuccess',
        component: ()=>import('@/pages/PaySuccess/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay/Pay'),
        meta: { show: true },
        beforeEnter:(to, from , next)=>{
            if(from.path == "/trade"){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: "/trade",
        component: ()=>import('@/pages/Trade/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to,from,next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path == "/shopcart") {
                next();
            }else {
                // 其它的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: ()=>import('@/pages/ShopCart/ShopCart'),
        meta: { show: true}
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component: ()=>import('@/pages/AddCartSuccess/AddCartSuccess'),
        meta: { show: true},

    },
    {
        path:"/detail/:skuid",
        component: ()=>import('@/pages/Detail/Detail'),
        meta: { show: true},

    },
    {
        path: "/home",
        component: ()=>import('@/pages/Home/Home'),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search/Search'),
        meta: { show: true },
        name: 'search',
        // 路由组件能不能传递props数据？
        //布尔值写法(只能传递params参数)
        // props:true,
        //对象写法：额外的给路由组件传递一些props
        // props:{a:1,b:2},
        //函数写法：可以将params参数、query参数，通过props传递给路由组件
        // props: ($route) => {
        //     return { keyword: $route.params.keyword, k: $route.query.k }
        // }
    },
    {
        path: "/login",
        component: ()=>import('@/pages/Login/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register/Register'),
        meta: { show: false }
    },
    //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]