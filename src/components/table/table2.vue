<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>
            <div class="th-wrap">
              <input type="checkbox" />
            </div>
          </th>
          <th
            v-for="item in TITLE_FILTER"
            :key="item.id"
            @click.prevent="productSort(item)"
            v-show="item.visibility"
          >
            <div class="th-wrap">
              {{ item.title }}
              <div class="img-Arrow">
                <img
                  v-if="sortBy == item.name"
                  :src="
                    `${sortDirection == sortUp ? svgArrowUp : svgArrowDown}`
                  "
                  alt="select drop down"
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in products_data" :key="`row${row.id}`" :row_data="row">
          <td>
            <div class="td-wrap">
              <input type="checkbox" />
            </div>
          </td>
          <td>
            <div class="td-wrap">{{ row.product }}</div>
          </td>
          <td>
            <div class="td-wrap">{{ row.calories }}</div>
          </td>
          <td>
            <div class="td-wrap">{{ row.fat }}</div>
          </td>
          <td>
            <div class="td-wrap">{{ row.carbs }}</div>
          </td>
          <td>
            <div class="td-wrap">{{ row.protein }}</div>
          </td>
          <td>
            <div class="td-wrap">{{ row.iron }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import svgArrowUp from "../../assets/upArrow.svg";
import svgArrowDown from "../../assets/downArrow.svg";
export default {
  name: "table",
  components: {},
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
      svgArrowUp: svgArrowUp,
      svgArrowDown: svgArrowDown,
      sortBy: "name",
      sortDirection: " ",
      sortUp: "ASC",
      sortDown: "DESC",
    };
  },
  computed: {
    ...mapGetters(["TITLE_FILTER"]),
  },
  methods: {
    productSort(by) {
      if (by.name != this.sortBy) {
        this.sortDirection = "ASC";
        this.sortBy = by.name;
      }

      if (by.name == this.sortBy) {
        if (this.sortDirection == this.sortUp) {
          this.sortDirection = this.sortDown;
        } else {
          this.sortDirection = this.sortUp;
        }
      }

      this.$store.dispatch("SORT_PRODUCTS_TO_STATE", by.name);
      this.$store.dispatch("EDIT_COLOR_TITLE_FILTER", by.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  max-width: 1200px;

  .table {
    width: 100%;
    border-radius: 4px;
    background: #ffffff;

    thead {
      border-spacing: 0;

      tr {
        th {
          background: #ffffff;
          padding: 0px 27px 0px 30px;
          border-bottom: solid 1px #ededed;
          &:first-child {
            padding: 20px 0 20px 37px;
          }
          &:last-child {
            width: 20%;
          }
        }
      }

      .th-wrap {
        display: flex;
        align-items: center;
        justify-self: center;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        background: #ffffff;
        cursor: pointer;
        .img-Arrow {
          width: 24px;
          height: 24px;
          background: #ffffff;
          content: "";
          img {
            background: #ffffff;
          }
        }
      }
      // &.checkbox {
      //     height: auto;
      // }
    }

    tbody {
      border-spacing: 0;
      td {
        background: #ffffff;
        padding: 18px 27px 18px 30px;
        //   border-bottom: solid 1px #ededed;
          &:first-child {
            padding: 16px 0 16px 37px;
          }
          &:last-child {
            width: 23%;
          }
      }

      .td-wrap {
        display: flex;
        align-items: center;
        justify-self: center;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        background: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
