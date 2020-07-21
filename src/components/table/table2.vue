<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>
            <form class="th-wrap">
              <input
                type="checkbox"
                :id="`selectedAll${pageNumber}`"
                v-model="selectedAllRows"
                :value="pageNumber"
                @change="deleteAllRow(pageNumber)"
              />
              <label :for="`selectedAll${pageNumber}`"></label>
            </form>
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
            <form class="td-wrap">
              <input
                type="checkbox"
                :id="`checkbox-id${row.id}`"
                v-model="selectedRows"
                :value="row"
              />
              <label :for="`checkbox-id${row.id}`"></label>
            </form>
          </td>
          <td v-show="productVis">
            <div class="td-wrap td-wrap--font">{{ row.product }}</div>
          </td>
          <td v-show="caloriesVis">
            <div class="td-wrap">{{ row.calories }}</div>
          </td>
          <td v-show="fatVis">
            <div class="td-wrap">{{ row.fat }}</div>
          </td>
          <td v-show="carbsVis">
            <div class="td-wrap">{{ row.carbs }}</div>
          </td>
          <td v-show="proteinVis">
            <div class="td-wrap">{{ row.protein }}</div>
          </td>
          <td v-show="ironVis">
            <div class="td-wrap">
              {{ row.iron }}
              <div class="delete" @click.prevent="openDelPopup(row.id)">
                <img :src="`${svgTrash}`" alt="icon_trash" />
                delete
              </div>
              <div
                class="delete__popup"
                v-show="selectDelElement == row.id && visDelPopup"
              >
                <div class="text">
                  <p>
                    Are you sure you want to
                    <span class="text__font">delete item?</span>
                  </p>
                </div>
                <div class="group-button">
                  <button class="button" @click.prevent="openDelPopup(row.id)">
                    Cancel
                  </button>
                  <button
                    class="button button--green"
                    @click.prevent="deleteProduct(row.id)"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
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
import svgTrash from "../../assets/Trash.svg";
// import Button from "../panel/button";
// import Input from "./input";

export default {
  name: "table",
  components: {
  },
  props: {
    products_data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pageNumber: {
      type: Number,
      default: () => {
        return 1;
      },
    },
    columns: {
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
      svgTrash: svgTrash,
      sortBy: "name",
      sortDirection: " ",
      sortUp: "ASC",
      sortDown: "DESC",
      visDelPopup: false,
      selectDelElement: 0,
      cancelTitle: "Cancel",
      selectedAllRow: false,
      selectedRows: [],
      selectedAllRows: [],
      activeInput: false,
      checkedAllRows: false,
      checkedRow: false,
      previousPage: 0,
      productVis: false,
      caloriesVis: false,
      fatVis: false,
      carbsVis: false,
      proteinVis: false,
      ironVis: false,
      colum: [],
    };
  },
  computed: {
    ...mapGetters(["TITLE_FILTER"]),
  },
  created() {
    this.getVisColumns();
  },
  watch: {
    selectedRows: {
      deep: true,

      handler() {
        this.$emit("quantityRows", this.selectedRows);
      },
    },
    columns: {
      deep: true,
      handler() {
        this.getVisColumns();
      },
    },
  },
  methods: {
    getVisColumns() {
      this.columns.forEach((element) => {
        if (element.name == "product") {
          this.productVis = element.visibility;
        } else if (element.name == "calories") {
          this.caloriesVis = element.visibility;
        } else if (element.name == "fat") {
          this.fatVis = element.visibility;
        } else if (element.name == "carbs") {
          this.carbsVis = element.visibility;
        } else if (element.name == "protein") {
          this.proteinVis = element.visibility;
        } else if (element.name == "iron") {
          this.ironVis = element.visibility;
        }
      });
    },
    deleteAllRow(pageNumber) {
      let itemPage = this.selectedAllRows.find((item) => item == pageNumber);

      if (itemPage == pageNumber) {
        this.selectedRows = this.selectedRows.concat(this.products_data);
      } else {
        this.selectedRows = this.selectedRows.filter(
          (el) => !this.products_data.includes(el)
        );
      }
    },
    deleteProduct(id) {
      this.visDelPopup = !this.visDelPopup;
      this.$store.dispatch("DELETE_PRODUCT", id);
    },
    openDelPopup(id) {
      this.selectDelElement = id;
      this.visDelPopup = !this.visDelPopup;
    },
    closeDelPopup() {
      this.selectDelElement = 0;
      this.visDelPopup = !this.visDelPopup;
    },
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
    background: #ffffff;
    border-collapse: collapse;

    thead {
      border-spacing: 0;

      tr {
        th {
          background: #ffffff;
          padding: 0px 27px 0px 30px;
          border-bottom: solid 1px #ededed;
          &:first-child {
            padding: 22px 0 22px 37px;
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
          // padding: 10px 0;
          vertical-align: middle;
          background: #f8f9fa;
        }

        label::before {
          content: " ";
          color: #000;
          display: inline-block;
          // margin: 0 30px 0 36px;
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

      tr {
        cursor: pointer;
        &:nth-child(2n + 2) {
          td,
          .td-wrap {
            background: #f8f9fa;

            .delete {
              background: #f8f9fa;
              img {
                background: #f8f9fa;
              }
            }
          }
        }

        &:hover {
          td,
          .td-wrap {
            // background: rgba(0, 161, 30, 0.07);
            background: #d7ffe6;

            &--font {
              font-weight: 600;
            }

            .delete {
              visibility: visible;
              background: #d7ffe6;
              img {
                background: #d7ffe6;
              }
            }

            &:nth-child(2) {
              font-weight: 600;
            }
          }
        }
        td {
          background: #ffffff;
          padding: 12px 27px 12px 30px;
          &:first-child {
            padding: 14px 0 14px 37px;
          }
          &:last-child {
            width: 23%;
            .td-wrap {
              display: flex;
              justify-content: space-between;
              z-index: 1;
            }
          }
        }
      }

      .td-wrap {
        display: flex;
        align-items: center;
        justify-self: center;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        // line-height: 24px;
        background: #ffffff;
        // cursor: pointer;

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
          // padding: 10px 0;
          vertical-align: middle;
          background: #f8f9fa;
        }

        label::before {
          content: " ";
          color: #000;
          display: inline-block;
          // margin: 0 30px 0 36px;
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

        .delete {
          visibility: hidden;
          background: #ffffff;
          display: flex;
          color: #5b5e77;
          cursor: pointer;
          align-items: center;
          // position: relative;
          img {
            width: 24px;
            background: #ffffff;
          }
        }

        .delete__popup {
          display: block;
          position: absolute;
          // padding: 16px;
          margin-top: 65px;
          margin-left: 50px;
          width: 254px;
          height: 96px;
          background: #ffffff;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
          border-radius: 4px;
          visibility: visible;
          z-index: 5;

          .text {
            display: flex;
            justify-content: center;
            margin-top: 16px;
            background: #ffffff;
            p {
              background: #ffffff;
            }

            &__font {
              background: #ffffff;
              font-weight: 600;
            }
          }
          .group-button {
            display: flex;
            margin: 8px 43px 0 43px;
            justify-content: space-between;
            background: #ffffff;

            .button {
              width: 78px;
              background: #ffffff;
              height: 32px;
              font-size: 14px;
              border: none;
              box-sizing: border-box;
              // padding: 5px;
              outline: none;
              color: #000000;
              margin: 0;
              cursor: pointer;
              border: 1px solid #c6cbd4;
              border-radius: 4px;

              &--green {
                background: #00a11e;

                &:hover {
                  background: lighten($color: #00a11e, $amount: 4%);
                }

                &:active {
                  background: lighten($color: #4dd599, $amount: 6%);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
