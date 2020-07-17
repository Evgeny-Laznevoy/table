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
          <td v-show="visProduct">
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
              <div class="td-wrap">
                {{ row.iron }}
                <div class="delete" 
                  @click.prevent="openDelPopup(row.id)"
                  >
                  <img :src="`${svgTrash}`" alt="icon_trash"/>
                  delete
                </div> 
                <div class="delete__popup" v-show="selectDelElement == row.id && visDelPopup">
                    <div class="text">
                        Are you sure you want to delete item?
                    </div>
                    <div class="group-button">
                      <!-- <Button :title_button="cancelTitle" @click.prevent="openDelPopup(row.id)"/> -->
                      <button class="button" @click.prevent="openDelPopup(row.id)">Cancel</button>
                      <button class="button button--green" @click.prevent="openDelPopup(row.id)">Confirm</button>
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

export default {
  name: "table",
  components: {
    // Button,
  },
  props: {
    products_data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    visProduct: {
        type: Boolean,
        default: () => {
            return true
        }
    }
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
    };
  },
  computed: {
    ...mapGetters(["TITLE_FILTER"]),
  },
  methods: {
    openDelPopup(id){
      this.selectDelElement = id; 
      this.visDelPopup = !this.visDelPopup;
    },
    closeDelPopup(){
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
    // border-radius: 4px;
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
          &:nth-child(2n+ 2) {
                td, .td-wrap {
                    background: #F8F9FA;

                    .delete {
                      background: #F8F9FA;
                        img {
                          background: #F8F9FA;
                        }
                    }
                    
                }
              }

          &:hover {
                  td, .td-wrap {
                    // background: rgba(0, 161, 30, 0.07);
                    background: #d7ffe6;

                    .delete {
                      visibility: visible;
                      background: #d7ffe6;
                        img {
                          background: #d7ffe6;
                        }
                    }

                    &:nth-child(2){
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
        line-height: 24px;
        background: #ffffff;
        // cursor: pointer;

        .delete {
          visibility:hidden;
          background: #ffffff;
          display: flex;
          color: #5B5E77;
          cursor: pointer;
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
            background: #FFFFFF;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
            border-radius: 4px;
            visibility: visible;
            z-index: 5;

            .text {
              display: flex;
              justify-content: center;
              margin-top: 16px;
              background: #FFFFFF;
            }
            .group-button {
              display: flex;
              margin: 8px 43px 0 43px;
              justify-content: space-between;
              background: #FFFFFF;

              .button {
                width: 78px;
                background: #FFFFFF;
                height: 32px;
                font-size: 14px;
                border: none;
                box-sizing: border-box;
                // padding: 5px;
                outline: none;
                color: #000000;
                margin: 0;
                cursor: pointer;
                border: 1px solid #C6CBD4;
                border-radius: 4px;

                &--green {
                  background: #00A11E;

                  &:hover {
                    background: lighten($color: #00A11E, $amount: 4%);
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
