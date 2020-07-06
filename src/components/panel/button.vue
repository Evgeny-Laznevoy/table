<template>
    <button class="button">{{this.title_button}}</button>
</template>

<script>
    export default {
        name: 'button',
        data() {
            return {
                title: ''
            }
        },
        props: {
            title_button: {
                type: String,
                default: () => {
                    return 'Product(100g serving)'
                }
            }
        },
    }
</script>

<style lang="scss">

    .button {
        width: auto;
        background: #F2F2F2;
        height: 32px;
        font-size: 14px;
        // border: 1px solid #C6CBD4;
        border: none;
        box-sizing: border-box;
        padding: 5px;
        background: #00A11E;
        border-radius: 2px;
        color: #FFFFFF;
        margin-left: 4px;
    }

    .button:first-child{
        margin-left: 8px;
    }

</style>