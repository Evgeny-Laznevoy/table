<template>
  <div class="box">
    <!-- @click.prevent="selectedRow(indexRow)" -->
    <input type="checkbox" 
    :id="`checkbox-id${indexRow}`"
    :checked="checked"
    v-model="rows"
    :value="indexRow"
    @change="selectedRow(indexRow)"
    />
    <label :for="`checkbox-id${indexRow}`"></label>
    <div>{{rows}}</div>
  </div>
</template>

<script>
export default {
  name: "input",
  data() {
    return {
      // rowssss: {
      //   selectedRows: []
      // },
      // checked: false,
      // selectedRow: ''
    };
  },
  props: {
    indexRow: {
      type: String,
      default: () => {
        return "";
      },
    },
    checked: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    rows: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    selectedRow(id){
      // console.log(id);
      this.$emit('selectedRows', id);
      // this.checkedRows.push(id);
      // console.log(this.checkedRows);
    },
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: 14px;
  display: flex;
  align-items: center;
  justify-self: center;
  font-style: normal;
  font-weight: normal;
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
}
</style>
