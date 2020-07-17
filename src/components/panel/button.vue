<template>
    <button class="button disabled" :class="{active:this.active}">
        {{this.title_button.title}}
    </button>
</template>

<script>
    export default {
        name: 'button',
        data() {
            return {
                title: '',
                // productActive: true,
            }
        },
        props: {
            title_button: {
                type: Object
            },
            active: {
                type: Boolean
            }
        }
    }
</script>

<style lang="scss">

    .button {
            width: auto;
            background: #F2F2F2;
            height: 32px;
            font-size: 14px;
            border: none;
            box-sizing: border-box;
            padding: 5px;
            outline: none;
            color: #000000;
            margin-left: 4px;

        &.active {
            background: #00A11E;
            border-radius: 2px;
            border-color: none;
            color: #ffffff;
        }

        // &:disabled {
            
        // }
    }

    .button:first-child{
        margin-left: 8px;
    }

</style>