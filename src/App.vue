<template>
  <div class="app">
    <div class="header">
      <div class="header__logo">
        {{ this.logo }}
      </div>
      <div class="header__panel">
        <div class="filter">
          <h1 class="filter__title">
            Sorting by:
          </h1>
          <div class="filter__button">
            <Button
              v-for="(item, i) in TITLE_FILTER"
              :key="`title${i}`"
              :title_button="item"
              :active="item.color"
            />
          </div>
        </div>
        <div class="navigation">
          <Button :title_button="`Delete ` + `(${1})`" />
          <div class="prepage-dropdown-filters-block">
            <Select
              :options="optionsPrePage"
              @selectedOptions="selectedOptions"
            />
            <!-- <button class="prepage-dropdown-filters-block__btn">
                {{this.productsPerPage}} Per Page
                <img :src="`${svgDown}`" alt=""/>
              </button> -->
            <!-- <div class="prepage-dropdown-filters-block__popup"> -->
            <!-- <div class="prepage-type">
                    <input type="checkbox">
                    10 Per Page
                    </div>
                  <div class="prepage-type">
                    <input type="checkbox">
                    15 Per Page
                  </div>
                  <div class="prepage-type">
                    <input type="checkbox">
                    20 Per Page
                  </div> -->
            <!-- </div> -->
          </div>
          <div class="pagination">
            <button class="btn" @click.prevent="paginationLeft()">
              <img :src="`${svgLeft}`" alt="Pagination left" />
            </button>
            <div class="pagination__info">
              {{ `${this.from}-${this.to} of ${this.PRODUCTS.length}` }}
            </div>
            <button class="btn" @click.prevent="paginationRight()">
              <img :src="`${svgRight}`" alt="Pagination right" />
            </button>
          </div>
          <div class="column-select">
            <div class="column-dropdown-filters-blok" @click.prevent="visOptionsColumn = !visOptionsColumn">
              {{ this.pageNumber }} columns selected
              <img :src="`${svgDown}`" alt="" />
            </div>
            <div class="column-filters" v-show="visOptionsColumn">
              <div class="column-filters__options">
                <div class="column-filters__option">
                  <input type="checkbox" />
                  Select All
                </div>
                <div class="column-filters__option"
                  v-for="(item, i) in TITLE_FILTER"
                  :key="`title${i}`"
                >
                  <input type="checkbox" @click.prevent="selectedColumn(item.name)"/>
                  {{item.title}}
                </div>
                <!-- <div class="column-filters__option">
                  <input type="checkbox" />
                  Select All
                </div>
                <div class="column-filters__option">
                  <input type="checkbox" />
                  Select All
                </div>
                <div class="column-filters__option">
                  <input type="checkbox" />
                  Select All
                </div>
                <div class="column-filters__option">
                  <input type="checkbox" />
                  Select All
                </div>
                <div class="column-filters__option">
                  <input type="checkbox" />
                  Select All
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Table2 :products_data="paginatedProducts" :visProduct="visProduct"/>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import Table from "./components/table/table";
import Table2 from "./components/table/table2";
import Button from "./components/panel/button";
import svgDown from "./assets/Down.svg";
import Select from "./components/select";
import svgRight from "./assets/Right.svg";
import svgLeft from "./assets/Left.svg";

export default {
  name: "app",
  components: {
    Table2,
    Button,
    Select,
  },
  // created(){
  //     this.GET_PRODUCTS_FROM_API();
  // },
  data() {
    return {
      logo: "Table UI",
      svgRight: svgRight,
      svgLeft: svgLeft,
      svgDown: svgDown,
      // pagination: "1-10 of 25",
      productsPerPage: 10,
      pageNumber: 1,
      from: 0,
      to: 0,
      visOptionsColumn: false,
      optionsPrePage: [
        { name: "10 Per Page", value: 10 },
        { name: "15 Per Page", value: 15 },
        { name: "20 Per Page", value: 20 },
      ],
      visProduct: true,
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "TITLE_FILTER"]),
    pages() {
      return Math.ceil(this.PRODUCTS.length / 10);
    },
    paginatedProducts() {
      let from = (this.pageNumber - 1) * this.productsPerPage;
      let to = from + this.productsPerPage;
      return this.PRODUCTS.slice(from, to);
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API"]),
    paginationRight() {
      this.pageNumber == this.pages ? this.pageNumber : (this.pageNumber += 1);
    },
    paginationLeft() {
      this.pageNumber > 1 ? (this.pageNumber -= 1) : this.pageNumber;
    },
    getRangeString() {
      this.to = this.pageNumber + (this.productsPerPage - 1);
      this.from = this.from + this.productsPerPage;
    },
    selectedOptions(option) {
      this.productsPerPage = option;
    },
    selectedColumn(id) {
      this.visProduct = !this.visProduct;
      this.$store.dispatch('SET_VISIBILITY_COLUMNS', id);
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
    this.getRangeString();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  background: #f2f2f2;
}

.body {
  // margin: 0 auto;
  // padding: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;

  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
}

.header {
  display: flex;
  flex-direction: column;
  // font-family: Source Sans Pro;
  // text-align: left;
  // justify-content: left;
  // height: 40px;
  // width: 112px;
  &__logo {
    margin-top: 30px;
    padding-bottom: 15px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    border-bottom: solid 2px #ededed;
  }

  &__panel {
    width: 100%;
    padding: 20px 0;
    display: inline-flex;

    .filter {
      width: 50%;
      display: flex;
      align-items: center;

      &__title {
        // font-family: Source Sans Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
      }

      &__button {
        // margin-left: 8px;
      }
    }

    .navigation {
      width: 50%;
      display: flex;
      justify-content: flex-end;

      .prepage-dropdown-filters-block {
        //     &__btn {
        //         display: flex;
        //         position: relative;
        //         align-items: center;
        //         width: auto;
        //         height: 32px;
        //         border: 1px solid #D5DAE0;
        //         box-sizing: border-box;
        //         border-radius: 2px;
        //         margin-left: 12px;
        //         padding-left: 12px;
        //     }

        //     &__popup {
        //         display: block;
        //         width: auto;
        //         background-color: #ffffff;
        //         position: absolute;
        //         margin-top: 10px;
        //         box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        //         border-radius: 4px;
        //         margin-left: 12px;
        //         padding: 0px 20px 12px 20px;
        //         font-size: 14px;

        //         .prepage-type {
        //           margin-top: 12px;
        //           background-color: #ffffff;
        //           display: flex;
        //           align-items: center;

        //           input {
        //             margin-right: 12px;
        //           }
        //         }
        //     }
      }

      .column-select {
        .column-dropdown-filters-blok {
          display: flex;
          position: relative;
          align-items: center;
          height: 32px;
          border: 1px solid #d5dae0;
          box-sizing: border-box;
          border-radius: 2px;
          padding-left: 12px;
          cursor: pointer;
          font-size: 14px;

          &:hover {
            img {
              background: #cecece;
            }
            background: #cecece;
          }
        }

        .column-filters {
          display: block;
          position: absolute;
          width: 210px;
          height: 250px;
          margin-top: 14px;
          background: #ffffff;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
          border-radius: 4px;

          &__options {
            display: block;
            overflow: auto;
            height: 250px;
            margin: 0px 12px 0 16px;
            background: #ffffff;

            &::-webkit-scrollbar {
              width: 4px;
            }

            &::-webkit-scrollbar-track {
              background: #ffffff;
              margin-top: 16px;
            }

            &::-webkit-scrollbar-thumb {
              background: #d5dae0;
              border-radius: 6px;
              // height: 100px;
            }
          }

          &__option {
            display: flex;
            background: #ffffff;
            margin-top: 16px;
            height: 24px;
            // padding-left: 17px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            align-items: center;

            &:first-child {
              font-weight: 600;
            }
            input {
              margin-right: 13px;
            }
          }
        }
      }

      .pagination {
        display: flex;
        margin: 0 16px;

        .btn {
          width: 32px;
          height: 32px;
          border: 1px solid #d5dae0;
          box-sizing: border-box;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          &:hover {
            img {
              background: #cecece;
            }
            background: #cecece;
          }
        }

        &__info {
          margin: 0 8px;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
        }
      }
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
