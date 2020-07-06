<template>
    <div class="table__main" :id="`checkbox-id${row_key}`">
        <input type="checkbox" :id="`checkbox-id${row_key}`">
        <label :for="`checkbox-id${row_key}`"></label>
        <div class="product">{{row_data.product}}</div>
        <div class="product">{{row_data.calories}}</div>
        <div class="product">{{row_data.fat}}</div>
        <div class="product">{{row_data.carbs}}</div>
        <div class="product">{{row_data.protein}}</div>
        <div class="product">{{row_data.iron}}</div>
        <button class="delete-all">
                <img :src="`${svgTrash}`" alt="icon_trash"/>
                delete
        </button> 
    </div>
</template>

<script>
    export default {
        name: 'table-row',
        props:{
            row_data: {
                type: Object,
                default: () => { 
                    return {}
                }
            },
            row_key: {
                type: String,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                
            }
        },
        computed:{

        }
    }
</script>

<style lang="scss" scoped>

    .table__main {
            display: flex;
            text-align: center;
            // justify-content: space-between;
            align-items: center;
            font-size: 14px;
            height: 57px;

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
                margin: 0 30px 0 36px;
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

            .product {
                margin-right: 10px;
                width: 190px;
                text-align: left;
            }

            .product:last-child {
                width: 250px;
            }

            .delete-all {
                display: flex;
                margin-right: 30px;
                align-items: center;
                border: none;
                font-size: 14px;
                padding: 0 10px;
                img {
                    width: 32px;
                }
            }    
    }



    // .body__row{
    //     display: flex;
    //     text-align: left;
    //     justify-content: space-around;

        

    //     &:hover {
    //             cursor: pointer;
    //             background: rgba(0, 161, 30, 0.07);
    //             .row{

    //                 &__product {
    //                     font-weight: bold;
    //                 }
                    
    //             }
    //         }

            
    // }
    // // .body{
    // //     display: flex;
        
    // //     // text-align: left;
    // // }

    // .row{  
    //         flex-basis: 16%;
    //         text-align: left;
    //         padding: 12px 12px 12px 5px;

    //         // input{
    //         //     flex-basis: 8%;
    //         // }
    //     }

</style>