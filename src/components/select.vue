<template>
<div>
    <div class="select" @click.prevent="visOptions = !visOptions">        
        {{this.selected}}
        <img :src="`${svgDown}`" alt="select drop down"/>
    </div>    
    <div class="select__options" v-show="visOptions">
        <div class="prepage-type"
            v-for="option in options"
            :key="option.value"
            @click="optionSelect(option)"
        >
            {{option.name}} 
        </div>
    </div>
</div>
</template>

<script>
import svgDown from '../assets/Down.svg'

    export default {
        name: "Select",
        props: {
            options: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                svgDown: svgDown,
                selected: '10 Per Page',
                visOptions: false,
            }
        },
        methods: {
            optionSelect(option){
                this.title = option.name;
                this.$emit('selectedOptions', option.value);
                this.visOptions = !this.visOptions;
            }
        }
    }
</script>

<style lang="scss" scoped>

.select {
        display: flex;
        position: relative;
        align-items: center;
        width: 116px;
        height: 32px;
        border: 1px solid #D5DAE0;
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

        &__options {
            display: block;
            width: 116px;
            background-color: #F2F2F2;
            position: absolute;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
            border-radius: 2px;
            font-size: 14px;

            .prepage-type {
                height: 32px;
                background-color: #F2F2F2;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                &:hover {
                    background-color: #cecece;
                }
            }  
        }
}    

</style>