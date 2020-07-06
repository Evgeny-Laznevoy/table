<template>
    <div class="table">
        <div class="table__header">
            <input type="checkbox" id="checkbox-id">
            <label for="checkbox-id"></label>
            <div class="product" @click.prevent="productSort">
                Product (100g serving)
                <img v-show="ArrowUpVisibe" :src="`${svgArrowUp}`" alt="icon_arrow_up"/>
                <img v-show="ArrowDownVisibe" :src="`${svgArrowDown}`" alt="icon_arrow_down"/>
            </div>
            <div class="product">
                Calories
            </div>
            <div class="product">
                Fat (g)
            </div>
            <div class="product">
                Carbs (g)
            </div>
            <div class="product">
                Protein (g)
            </div>
            <div class="product">
                Iron (%)
            </div>
            <button class="delete-all">
                <img :src="`${svgTrash}`" alt="icon_trash"/>
                delete
            </button>  
        </div>
        
        <!-- <div class="table__main">

        </div> -->
        <TableRow v-for="(row, i) in products_data" :key="`row${i}`" :row_data="row"/>
    
        <!-- <table>
            <thead>
                <tr>
                    <input type="checkbox">
                    <th>Product (100g serving)</th>
                    <th>Calories</th>
                    <th>Fat (g)</th>
                    <th>Carbs (g)</th>
                    <th>Protein(g)</th>
                    <th>Iron(%)</th>
                </tr>
            </thead>
        </table> -->
        <!-- <div class="table__header">
            <input type="checkbox">
            <p>Product(100g serving)</p>
            <p>Calories</p>
            <p>Fat(g)</p>
            <p>Carbs(g)</p>
            <p>Protein(g)</p>
            <p>Iron(%)</p>   
        </div> -->
        <!-- <div class="table__body"> -->
            
        <!-- </div> -->
    </div>
</template>

<script>
import TableRow from '../table/table-row'
import svgTrash from '../../assets/Trash.svg'
import svgArrowUp from '../../assets/upArrow.svg'
import svgArrowDown from '../../assets/downArrow.svg'

    export default {
        name: 'table',
        components:{
            TableRow
        },
        props:{
            products_data:{
                type: Array,
                default: () => {
                    return []
                } 
            }
        },
        data() {
            return {
                svgTrash: svgTrash,
                svgArrowUp: svgArrowUp,
                svgArrowDown: svgArrowDown,
                ArrowUpVisibe: false,
                ArrowDownVisibe: false
            }
        },
        methods: {
            productSort(){
                if (!this.ArrowUpVisibe && !this.ArrowDownVisibe) {
                    this.ArrowUpVisibe = true                    
                } else if (this.ArrowUpVisibe) { 
                    this.ArrowUpVisibe = false
                    this.ArrowDownVisibe = true
                } else if (this.ArrowDownVisibe) {
                    this.ArrowUpVisibe = true
                    this.ArrowDownVisibe = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .table{
        background: #FFFFFF;
        border-bottom: solid 2px #EDEDED;
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
                background: #00A11E;
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
                background: #FFFFFF;
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