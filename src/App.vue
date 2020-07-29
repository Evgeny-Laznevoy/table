<template>
  <div class="products-page">
    <div class="products-page__title">
      <h3 class="title">{{ this.logo }}</h3>
    </div>
    <div class="products-page__top-block">
      <div class="left-block">
        <h4 class="left-block__title">
            Sorting by:
          </h4>
          <div class="filter__button">
            <Button
              v-for="(item, i) in TITLE_FILTER"
              :key="`title${i}`"
              :title_button="item"
              :active="item.color"
            />
          </div>
      </div>
      <div class="right-block">
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
          <button
            class="delete-rows"
            :class="{
              active: this.rowsForDelete && this.rowsForDelete.length > 0,
            }"
            :disabled="this.rowsForDelete && this.rowsForDelete.length == 0"
            @click.prevent="deleteSelectedRows"
          >
            {{ `Delete (${this.rowsForDelete.length})` }}
          </button>
      </div>
    </div>
    <div class="products-page__content">
      <div class="products-page__left-block">
        <div class="input-search">
          <input class="input-search__input" placeholder="search" id="before">
          <label :for="`before`"></label>
          <!-- <img :src="`${svgSearch}`" alt="icon_search" /> -->
        </div>
      </div>
      <div class="products-page__list">
        <Table2
            :products_data="paginatedProducts"
            :pageNumber="this.pageNumber"
            @quantityRows="quantityRows"
            :columns="selectedColumns"
        />
      </div>
    </div>
  </div>
  <!-- <div class="products-page">
    <div class="products-page__title">
      <h1 class="title">{{ this.logo }}</h1> -->
  <!-- <span></span> -->
  <!-- <div class="header__logo">
        {{ this.logo }} -->
  <!-- </div> -->
  <!-- <div class="products-page__top-block"> -->
  <!-- <div class="header__panel"> -->
  <!-- <div class="filter">
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
          <button
            class="delete-rows"
            :class="{
              active: this.rowsForDelete && this.rowsForDelete.length > 0,
            }"
            :disabled="this.rowsForDelete && this.rowsForDelete.length == 0"
            @click.prevent="deleteSelectedRows"
          >
            {{ `Delete (${this.rowsForDelete.length})` }}
          </button>
          <div class="prepage-dropdown-filters-block">
            <Select
              :options="optionsPrePage"
              @selectedOptions="selectedOptions"
            />
          </div>
          <div class="pagination">
            <button
              class="btn"
              :disabled="this.pageNumber && this.pageNumber == 1"
              @click.prevent="paginationLeft()"
            >
              <img :src="`${svgLeft}`" alt="Pagination left" />
            </button>
            <div class="pagination__info">
              {{
                `${curentPageCntStart}-${curentPageCntEnd} of ${this.PRODUCTS.length}`
              }}
            </div>
            <button class="btn" @click.prevent="paginationRight()">
              <img :src="`${svgRight}`" alt="Pagination right" />
            </button>
          </div>
          <div class="column-select">
            <div
              class="column-dropdown-filters-blok"
              @click.prevent="visOptionsColumn = !visOptionsColumn"
            >
              {{ this.selectedColumnsAll.length }} columns selected
              <img :src="`${svgDown}`" alt="" />
            </div>
            <div class="column-filters" v-show="visOptionsColumn">
              <div class="column-filters__options">
                <div class="column-filters__option">
                  <input
                    type="checkbox"
                    :id="`checkboxAllColumn`"
                    :checked="selectAll"
                    @change="selectedAllColumns(selectAll)"
                  />
                  <label :for="`checkboxAllColumn`"></label>
                  Select All
                </div>
                <div
                  class="column-filters__option"
                  v-for="(item, i) in TITLE_FILTER"
                  :key="`title${i}`"
                >
                  <input
                    type="checkbox"
                    :id="`head-checkbox-id${item.id}`"
                    v-model="selectedColumnsAll"
                    :value="item"
                    @change="selectedColumn(item.id)"
                  />
                  <label :for="`head-checkbox-id${item.id}`"></label>
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div> -->
  <!-- </div>
    </div> -->
  <!-- </div>
  <div class="products-page__content">
      <div class="products-page__left-block">
        <div>Text</div>
      </div>
      <Table2
        :products_data="paginatedProducts"
        :pageNumber="this.pageNumber"
        @quantityRows="quantityRows"
        :columns="selectedColumns"
      />
  </div>
    <router-view />
  </div> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Table2 from "./components/table/table2";
import Button from "./components/panel/button";
import svgDown from "./assets/Down.svg";
import svgSearch from "./assets/search.svg";
// import Select from "./components/select";
import svgRight from "./assets/Right.svg";
import svgLeft from "./assets/Left.svg";

export default {
  name: "app",
  components: {
    Table2,
    Button,
    // Select,
  },
  data() {
    return {
      logo: "Table UI",
      svgRight: svgRight,
      svgLeft: svgLeft,
      svgDown: svgDown,
      svgSearch: svgSearch,
      productsPerPage: 10,
      pageNumber: 1,
      from: 0,
      to: 0,
      visOptionsColumn: false,
      optionsPrePage: [
        { text: "10 Per Page", value: 10 },
        { text: "15 Per Page", value: 15 },
        { text: "20 Per Page", value: 20 },
      ],
      list: 1,
      selectedColumns: [],
      selectAll: true,
      selectedColumnsAll: [],
      rowsForDelete: [],
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS", "TITLE_FILTER"]),
    pages() {
      return Math.ceil(this.PRODUCTS.length / this.productsPerPage);
    },
    paginatedProducts() {
      let from = (this.pageNumber - 1) * this.productsPerPage;
      let to = from + this.productsPerPage;
      return this.PRODUCTS.slice(from, to);
    },
    curentPageCntStart() {
      return this.productsPerPage * this.pageNumber - this.productsPerPage + 1;
    },
    curentPageCntEnd() {
      return this.productsPerPage * this.pageNumber;
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API"]),
    deleteSelectedRows() {
      this.$store.dispatch("DELETE_SELECTED_ROWS", this.rowsForDelete);
      this.rowsForDelete = [];
    },
    selectedAllColumns(visColumns) {
      visColumns = !visColumns;
      this.selectAll = !this.selectAll;
      if (!visColumns) {
        this.selectedColumnsAll = [];
      } else {
        this.selectedColumnsAll = this.TITLE_FILTER;
      }
      this.$store.dispatch("CHANGE_VISIBILITY_COLUMNS_ALL", visColumns);
      // this.selectedColumns = this.TITLE_FILTER;
    },
    paginationRight() {
      this.pageNumber == this.pages ? this.pageNumber : (this.pageNumber += 1);
    },
    quantityRows(quantity) {
      this.rowsForDelete = quantity;
    },
    paginationLeft() {
      this.pageNumber > 1 ? (this.pageNumber -= 1) : this.pageNumber;
    },
    getRangeString() {
      this.to = this.pageNumber + (this.productsPerPage - 1);
      this.from = this.from + this.productsPerPage;
    },
    selectedOptions(option) {
      console.log(option);
      this.productsPerPage = option;
    },
    selectedColumn(column) {
      this.$store.dispatch("CHANGE_VISIBILITY_COLUMNS", column);
      this.selectedColumns = this.TITLE_FILTER;
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
    this.getRangeString();
    this.selectedColumns = this.TITLE_FILTER;
    this.selectedColumnsAll = this.TITLE_FILTER;
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
}

.products-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  max-width: 1490px;
  margin: 0 auto;
  // display: flex;
  box-sizing: border-box;
  flex-direction: column;
  background: #f2f2f2;

  &__title {
    padding: 30px 0 15px;
    // margin-top: 30px;
    // padding-bottom: 15px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    border-bottom: solid 2px #ededed;
  }

  &__top-block {
    width: 100%;
    padding: 20px 0;
    display: inline-flex;

    .left-block {
      width: 50%;
      display: flex;
      align-items: center;
    }

    .right-block {
      width: 50%;
      display: flex;
      justify-content: flex-start;

      .delete-rows {
        width: 86px;
        background: #f2f2f2;
        height: 32px;
        font-size: 14px;
        box-sizing: border-box;
        border: 1px solid #c6cbd4;
        box-sizing: border-box;
        border-radius: 2px;
        margin-right: 12px;

        &.active {
          background: lighten($color: #00a11e, $amount: 6%);
          border: none;
          color: #ffffff;

          &:hover {
            background: lighten($color: #00a11e, $amount: 4%);
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
          outline: none;

          &:hover {
            background: lighten($color: #cecece, $amount: 8%);

            img {
              background: lighten($color: #cecece, $amount: 8%);
            }
          }

          &:active {
            background: lighten($color: #cecece, $amount: 6%);

            img {
              background: lighten($color: #cecece, $amount: 6%);
            }
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

  &__content {
    // display: inline-flex;
    // width: 100%;
    display: flex;
  }

  &__left-block {
    width: 270px;
    margin-right: 20px;
    // height: 100%;
    background: #ffffff;
    border-collapse: collapse;

    .input-search {
        // width: 100%;
        // position: relative;
        margin: 10px 15px 8px;
        background: #ffffff;
        border-radius: 8px;
        height: 40px;
        line-height: 40px;

        &__input {
          background: #ececec;
          color: #333;
          border-radius: 8px;
          padding: 0 60px 0 12px;
          border: none;
          outline: none;
          height: 34px;
          font-size: 14px;

        }

        img {
            position: absolute;
            height: 24px;
          }
    }
  }

  &__list {
      width: 1200px;
  }

}

.products-page____content {
  display: flex;
  width: 100%;

  .__left-block {
      width: 270px;
      display: block;
    }

  .__left-block {
    width: 270px;
    background: brown;
  }
}

.header {
  display: flex;
  flex-direction: column;
  max-width: 1200px;

  &__logo {
    margin-top: 30px;
    padding-bottom: 15px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    border-bottom: solid 2px #ededed;
  }

  &__top-block {
    width: 100%;
    padding: 20px 0;
    display: inline-flex;

    .filter {
      width: 50%;
      display: flex;
      align-items: center;

      &__title {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
      }

      &__button {
      }
    }

    .navigation {
      width: 50%;
      // display: flex;
      justify-content: flex-end;

      .delete-rows {
        width: 86px;
        background: #f2f2f2;
        height: 32px;
        font-size: 14px;
        box-sizing: border-box;
        border: 1px solid #c6cbd4;
        box-sizing: border-box;
        border-radius: 2px;
        margin-right: 12px;

        &.active {
          background: lighten($color: #00a11e, $amount: 6%);
          border: none;
          color: #ffffff;

          &:hover {
            background: lighten($color: #00a11e, $amount: 4%);
          }
        }
      }
      .prepage-dropdown-filters-block {
        select {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          // width: 116px;
          height: 32px;
          border: 1px solid #d5dae0;
          box-sizing: border-box;
          border-radius: 2px;
          // padding-left: 12px;
          padding: 0 12px 0 12px;
          cursor: pointer;
          font-size: 14px;

          &:checked {
            background: lighten($color: #cecece, $amount: 8%);
          }

          &:hover {
            background: lighten($color: #cecece, $amount: 8%);
          }

          option {
            background-color: #f2f2f2;

            &:active {
              background: lighten($color: #cecece, $amount: 8%);
            }
          }
        }
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
              background: lighten($color: #cecece, $amount: 8%);
            }
            background: lighten($color: #cecece, $amount: 8%);
          }

          &:active {
            background: lighten($color: #cecece, $amount: 6%);

            img {
              background: lighten($color: #cecece, $amount: 6%);
            }
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
            }
          }

          &__option {
            display: flex;
            background: #ffffff;
            margin-top: 16px;
            height: 24px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            align-items: center;

            &:first-child {
              font-weight: 600;
            }

            input {
              display: none;
            }

            input:checked + label::before {
              content: "\2714";
              background: #00a11e;
              color: #ffffff;
            }

            input:disabled + label:before {
              background: #eee;
              color: #aaa;
            }

            label {
              color: #000;
              cursor: default;
              line-height: 14px;
              font-weight: normal;
              vertical-align: middle;
              background: #f8f9fa;
              margin-right: 12px;
            }

            label::before {
              content: " ";
              color: #000;
              display: inline-block;
              position: relative;
              text-align: center;
              text-indent: 0px;
              width: 14px;
              height: 14px;
              background: #ffffff;
              border: 1px solid #e3e3e3;
              border-image: initial;
              vertical-align: middle;
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
          outline: none;

          &:hover {
            background: lighten($color: #cecece, $amount: 8%);

            img {
              background: lighten($color: #cecece, $amount: 8%);
            }
          }

          &:active {
            background: lighten($color: #cecece, $amount: 6%);

            img {
              background: lighten($color: #cecece, $amount: 6%);
            }
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
