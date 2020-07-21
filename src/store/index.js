import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    title_filter: [
      {
        id: 1,
        name: "product",
        title: "Product (100g serving)",
        color: false,
        visibility: true,
      },
      {
        id: 2,
        name: "calories",
        title: "Calories",
        color: false,
        visibility: true,
      },
      {
        id: 3,
        name: "fat",
        title: "Fat (g)",
        color: false,
        visibility: true,
      },
      {
        id: 4,
        name: "carbs",
        title: "Carbs (g)",
        color: false,
        visibility: true,
      },
      {
        id: 5,
        name: "protein",
        title: "Protein (%)",
        color: false,
        visibility: true,
      },
      {
        id: 6,
        name: "iron",
        title: "Iron (%)",
        color: false,
        visibility: true,
      },
    ],
    sortBy: "name",
    sortDirection: "ASC",
  },
  mutations: {
    SET_VISIBILITY_COLUMNS(state, column){
      state.title_filter.forEach(function(item){
        if (item.id == column) {
          item.visibility = !item.visibility;
        }
      })
    },
    SET_VISIBILITY_COLUMNS_ALL(state, column) {
      // console.log(column);
      state.title_filter.forEach(function(item){
        item.visibility = column;
      })
    },
    SET_PRODUCTS_TO_STATE(state, products) {
      state.products = products;
    },
    REMOVE_PRODUCT(state, index) {
      state.products = state.products.filter((item) => item.id !== index);
    },
    EDIT_VISIBILITY_COLUMNS(state, payload) {
      state.title_filter.find((item) =>
        item.name == payload
          ? (item.visibility = !item.visibility)
          : item.visibility
      );
    },
    SORT_PRODUCTS(state) {
      state.products.sort(
        function(a, b) {
          if (state.sortDirection == "ASC") {
            return a.product == b.product ? 0 : a.product > b.product ? 1 : -1;
          }

          if (state.sortDirection == "DESC") {
            return a.product == b.product ? 0 : a.product < b.product ? 1 : -1;
          }
        }.bind(state)
      );
    },
    SET_COLOR_TITLE_FILTER(state, payload) {
      state.title_filter.forEach(function(item) {
        if (item.id == payload) {
          item.color = true;
        } else {
          item.color = false;
        }
      });
    },
    SORT_BY_NUMBER(state, payload) {
      switch (payload) {
        case "product":
          break;
        case "calories":
          state.products.sort(
            function(a, b) {
              if (state.sortDirection == "ASC") {
                return a.calories < b.calories ? 1 : -1;
              } else {
                return a.calories > b.calories ? 1 : -1;
              }
            }.bind(state)
          );
          break;
        case "fat":
          state.products.sort(
            function(a, b) {
              if (state.sortDirection == "ASC") {
                return a.fat < b.fat ? 1 : -1;
              } else {
                return a.fat > b.fat ? 1 : -1;
              }
            }.bind(state)
          );
          break;
        case "carbs":
          state.products.sort(
            function(a, b) {
              if (state.sortDirection == "ASC") {
                return a.carbs < b.carbs ? 1 : -1;
              } else {
                return a.carbs > b.carbs ? 1 : -1;
              }
            }.bind(state)
          );
          break;
        case "protein":
          state.products.sort(
            function(a, b) {
              if (state.sortDirection == "ASC") {
                return a.protein < b.protein ? 1 : -1;
              } else {
                return a.protein > b.protein ? 1 : -1;
              }
            }.bind(state)
          );
          break;
        case "iron":
          state.products.sort(
            function(a, b) {
              if (state.sortDirection == "ASC") {
                return a.iron < b.iron ? 1 : -1;
              } else {
                return a.iron > b.iron ? 1 : -1;
              }
            }.bind(state)
          );
          break;
        default:
          break;
      }
    },
  },
  actions: {
    GET_PRODUCTS_FROM_API({ commit }) {
      return axios
        .get("http://localhost:3000/products")
        .then((res) => {
          commit("SET_PRODUCTS_TO_STATE", res.data);
        })
        .catch((error) => {
          return error;
        });
    },
    SORT_PRODUCTS_TO_STATE({ commit }, payload) {
      if (payload == this.state.sortBy) {
        if (this.state.sortDirection == "ASC") {
          this.state.sortDirection = "DESC";
        } else {
          this.state.sortDirection = "ASC";
        }
      }

      if (payload != this.state.sortBy) {
        this.state.sortBy = payload;
        this.state.sortDirection = "ASC";
      }

      if (this.state.sortBy == "product") {
        commit("SORT_PRODUCTS");
      } else {
        commit("SORT_BY_NUMBER", this.state.sortBy);
      }
    },
    EDIT_COLOR_TITLE_FILTER({ commit }, payload) {
      commit("SET_COLOR_TITLE_FILTER", payload);
    },
    SET_VISIBILITY_COLUMNS({ commit }, payload) {
      commit("EDIT_VISIBILITY_COLUMNS", payload);
    },
    DELETE_PRODUCT({ commit }, payload) {
      commit("REMOVE_PRODUCT", payload);
    },
    CHANGE_VISIBILITY_COLUMNS_ALL({ commit }, payload) {
      commit("SET_VISIBILITY_COLUMNS_ALL", payload);
    },
    CHANGE_VISIBILITY_COLUMNS({ commit }, payload){
      commit("SET_VISIBILITY_COLUMNS", payload);
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    TITLE_FILTER(state) {
      return state.title_filter;
    },
  },
  modules: {},
});
