import Vue from 'vue'

//创建store状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
//每当初始化项目的时候，就先从localstorage中取一下数据
let car = window.JSON.parse(localStorage.getItem('cart') || '[]')
const store = new Vuex.Store({
    state:{
        //在cart中应该把每个商品存储为一个对象{id,count}
        cart:car //购物车数组
    },
    mutations:{
        addToCar(state,goods){
            //将商品添加到购物车
            //如果购物车中之前曾经有这条商品，则只更新数量，如果曾经没有，则直接push
            // state.cart.push(goods)
            let flag=false
            state.cart.some(item=>{
                if(item.id==goods.id){
                    item.count+=goods.count;
                    flag=true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goods)
            }

            //为了持久化存储购物车的数据，可以把购物车的商品序列化出来存储到localstorage中
            localStorage.setItem('cart',window.JSON.stringify(state.cart));
        }
    },
    getters:{
        totalcount(state){
            //徽标中商品数量
            let c=0
            state.cart.forEach(item=>c+=item.count)
            return c;
        },
        idstr(state){
            //获取购物车中所有商品的Id字符串
            let arr=[]
            state.cart.forEach(item=>arr.push(item.id))
            return arr.join(',')
        },
        countObj(state){
            //获取购物车中商品的Id和商品数量的键值对对应关系
            let o = {}
            state.cart.forEach(item=>o[item.id] = item.count)
            // console.log(o)
            return o

            // {
            //     88:3
            //     89:5
            // }
        }
    },

})

export default store