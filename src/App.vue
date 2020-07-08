<template>
  <div class="app">
    <div class="header">
      <div class="header__logo">
        {{this.logo}}
      </div>
      <div class="header__panel">
        <div class="filter">
            <h1 class="filter__title">
              Sorting by:
            </h1>
            <div class="filter__button">
              <Button v-for="(item, i) in TITLE_FILTER" 
                  :key="`title${i}`"
                  :title_button="item"
              />
            </div>
        </div>
        <div class="navigation">
            <Button :title_button="`Delete `+`(${1})`"/>
            <button class="perpage">
              {{this.namberPage}} Per Page
              <img :src="`${svgDown}`" alt=""/>
            </button>
            <div class="pagination">
              <button class="btn">
                <img :src="`${svgLeft}`" alt="Pagination left"/>
              </button>
              <div class="pagination__info">
                {{this.pagination}}
              </div>
              <button class="btn">
                <img :src="`${svgRight}`" alt="Pagination right"/>
              </button>
            </div>
            <button class="perpage">
              {{this.namberPage}} columns selected
              <img :src="`${svgDown}`" alt=""/>
            </button>
        </div>
      </div>
    </div>  
    <Table :products_data="PRODUCTS" />
    <router-view/>  
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import Table from './components/table/table'
import Button from './components/panel/button'
import svgDown from './assets/Down.svg'
import svgRight from './assets/Right.svg'
import svgLeft from './assets/Left.svg'

  export default {
    name: 'app',
    components: {
      Table,
      Button,
    },
    // created(){
    //     this.GET_PRODUCTS_FROM_API();
    // },
    data() {
      return {
        logo: 'Table UI',
        namberPage: 1,
        svgDown: svgDown,
        svgRight: svgRight,
        svgLeft: svgLeft,
        pagination: '1-10 of 25'
      }
    },
    computed:{
      ...mapGetters([
        'PRODUCTS',
        'TITLE_FILTER'
        ])
    },
    methods:{
      ...mapActions(['GET_PRODUCTS_FROM_API'])
    },
    mounted(){
      this.GET_PRODUCTS_FROM_API();
    }
  }
</script>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  background: #F2F2F2;
}

.body{
    // margin: 0 auto;
    // padding: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;

  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #F2F2F2;
}


.header {
  display: flex;
  flex-direction: column;
  // font-family: Source Sans Pro;
  // text-align: left;
  // justify-content: left;
  // height: 40px;
  // width: 112px; 
    &__logo {
    margin-top: 30px;
    padding-bottom: 15px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    border-bottom: solid 2px  #EDEDED;
    }

    &__panel {
      width: 100%;
      padding: 20px 0;
      display: inline-flex;

      .filter {
        width: 50%;
        display: flex;
        align-items: center;

        &__title {
          // font-family: Source Sans Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 24px;
          text-align: left;
        }

        &__button {
          // margin-left: 8px;
        }
      }

      .navigation {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        .perpage {
          display: flex;
          align-items: center;
          width: auto;
          height: 32px;
          border: 1px solid #D5DAE0;
          box-sizing: border-box;
          border-radius: 2px;
          margin-left: 12px;
          padding-left: 12px;
        }

        .pagination {
            display: flex;
            margin: 0 16px;

            .btn {
                width: 32px;
                height: 32px;
                border: 1px solid #D5DAE0;
                box-sizing: border-box;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &__info {
              margin: 0 8px;
              display: flex;
              align-items: center;
              font-weight: 600;
              font-size: 14px;
            }
        }
      }

    }

}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
