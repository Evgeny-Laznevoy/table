import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    title_filter: [
      {
        id: 1,
        name: 'Product (100g serving)'
      },
      {
        id: 2,
        name: 'Calories'
      },
      {
        id: 3,
        name: 'Fat (g)'
      },
      {
        id: 4,
        name: 'Protein (g)'
      },
      {
        id: 5,
        name: 'Iron (%)'
      }
    ]
  },
  mutations: {
      SET_PRODUCTS_TO_STATE(state, products){
        state.products = products
      }
  },
  actions: {
    GET_PRODUCTS_FROM_API({commit}){
      return axios.get('http://localhost:3000/products')
      .then((res) => {
        commit('SET_PRODUCTS_TO_STATE', res.data)
      })
      .catch((error) => {
        console.log(error);
        return error
      })
    }
  },
  getters:{
    PRODUCTS(state){
      return state.products
    },
    TITLE_FILTER(state){
      return state.title_filter
    }
  },
  modules: {
  }
})
