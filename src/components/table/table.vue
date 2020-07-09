<template>
  <div class="table">
    <div class="table__header">
      <input type="checkbox" id="checkbox-id" />
      <label for="checkbox-id"></label>
      <!-- <div
        class="product"
        :id="title.id"
        v-for="title in TITLE_FILTER"
        :key="title.id"
        @click.prevent="productSort"
      >
        {{ title.name }}
        <img
          v-show="ArrowUpVisibe"
          :src="`${svgArrowUp}`"
          alt="icon_arrow_up"
          :id="title.id"
        />
        <img
          v-show="ArrowDownVisibe"
          :src="`${svgArrowDown}`"
          alt="icon_arrow_down"
          :id="title.id"
        />
      </div> -->
      <div
        class="product"
        :id="item.id"
        v-for="item in TITLE_FILTER"
        :key="item.id"
        @click.prevent="productSort(item)"
      >
        {{ item.title }}
        <!-- <img
          v-show="ArrowUpVisibe"
          :src="`${svgArrowUp}`"
          alt="icon_arrow_up"
          :id="title.id"
        />
        <img
          v-show="ArrowDownVisibe"
          :src="`${svgArrowDown}`"
          alt="icon_arrow_down"
          :id="title.id"
        /> -->
      </div>
      <button class="delete-all">
        <img :src="`${svgTrash}`" alt="icon_trash" />
        delete
      </button>
      <!-- 
      get rid of duplicates, implement in component
       -->
    </div>
    <TableRow
      v-for="row in products_data"
      :key="`row${row.id}`"
      :row_data="row"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableRow from "../table/table-row";
import svgTrash from "../../assets/Trash.svg";
import svgArrowUp from "../../assets/upArrow.svg";
import svgArrowDown from "../../assets/downArrow.svg";

export default {
  name: "table",
  components: {
    TableRow,
  },
  props: {
    products_data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      svgTrash: svgTrash,
      svgArrowUp: svgArrowUp,
      svgArrowDown: svgArrowDown,
      ArrowUpVisibe: false,
      ArrowDownVisibe: false,
      sortBy: "name",
      sortDirection: "ASC",
      search: "",
    };
  },
  computed: {
    ...mapGetters(["TITLE_FILTER"]),
  },
  methods: {
    productSort(by) {
      this.$store.dispatch('SORT_PRODUCTS_TO_STATE', by.name);
      this.$store.dispatch('EDIT_COLOR_TITLE_FILTER', by.id);
      
      // if ( by == this.sortBy ) {
      //   if (this.sortDirection == 'ASC') {
      //     this.sortDirection ='DESC';
      //   } else {
      //     this.sortDirection = 'ASC';
      //   }       
      // }

      // if ( by != this.sortBy ) {
      //   this.sortDirection = 'ASC';
      //   this.sortBy = by;  
      // }

      // switch (this.sortBy) {
      //   case 1:
      //     this.sortProductsByName();
      //   break;
      //   case 2:
      //     this.sortProductsByCalories();
      //   break;
      //   case 3:
      //     this.sortProductsByFat();
      //   break;
      //   case 4:
      //     this.sortProductsByCarbs();
      //   break;
      //   case 5:
      //     this.sortProductsByIron();
      //   break;
      //   default:
      //     break;
      // }
      // if (!this.ArrowUpVisibe && !this.ArrowDownVisibe) {
      //   this.ArrowUpVisibe = true;
      // } else if (this.ArrowUpVisibe) {
      //   this.ArrowUpVisibe = false;
      //   this.ArrowDownVisibe = true;
      // } else if (this.ArrowDownVisibe) {
      //   this.ArrowUpVisibe = true;
      //   this.ArrowDownVisibe = false;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  background: #ffffff;
  border-bottom: solid 2px #ededed;
  &__header {
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    height: 57px;

    // &:last-child {
    //     color: coral;
    // }

    input {
      display: none;
      margin: 0 30px 0 36px;
    }

    input:checked + label::before {
      content: "\f00c";
      background: #00a11e;
    }

    input:disabled + label:before {
      background: #eee;
      color: #aaa;
    }

    label {
      color: #000;
      cursor: default;
      line-height: 15px;
      font-weight: normal;
      padding: 10px 0;
      vertical-align: middle;
    }

    label::before {
      content: " ";
      color: #000;
      display: inline-block;
      margin: 0 0 0 36px;
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

    // .product:nth-child(1n + 1) {
    //     color: coral;
    // }

    .product {
      // position: relative;
      display: flex;
      margin-right: 10px;
      width: auto;
      text-align: left;
      align-items: center;
      // vertical-align: middle;
      // justify-content: center;
      // img {
      //     // display: flex;
      //     // display: none;
      //     // justify-content: flex-end;
      //     // position: absolute;
      //     // margin-left: 140px;
      // }

      //     &:last-child {
      //     color: coral;
      // }

      // &:first-child {
      //     color: coral;
      // }
    }

    // .product:active:cli {

    // }

    .delete-all {
      display: flex;
      margin-right: 30px;
      align-items: center;
      border: none;
      font-size: 14px;

      img {
        width: 32px;
      }
    }
  }
  // width: 100%;
  // font-size: 14px;
  // margin: 0;
  // padding: 0;
  // table {
  //     background-color: #FFFFFF;
  //     width: 100%;
  //     justify-content: space-between;
  // }

  // tr {
  //     text-align: left;
  // }

  // input {
  //     margin: 22px 36px;
  // }
  // display: flex;
  // justify-content: space-around;
  // &__header{
  //     display: flex;
  //     justify-content: space-around;
  //     text-align: left;
  //     align-items: center;
  //     font-size: 1.06rem;
  //     // margin-top: 16px;
  //     // padding: 16px 16px 16px 0;
  //     border-bottom: solid 1px  #C6CBD4;
  //     // p {
  //     //     flex-basis: 16%;
  //     // }

  //     input{
  //         display: flex;
  //         align-items: center;
  //     }
  // }

  // &__body{
  //     input {
  //         display: flex;
  //         align-items: center;
  //     }
  // }
}
</style>
