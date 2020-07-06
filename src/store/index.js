import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    title_filter: [
      'Product (100g serving)',
      'Calories',
      'Fat (g)',
      'Carbs (g)',
      'Protein (g)',
      'Iron (%)'
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
