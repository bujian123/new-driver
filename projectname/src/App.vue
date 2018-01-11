<template>
  <div id="app">
    <header><a href="#/" class="page-back router-link-active"><i class="mintui mintui-back"></i></a><span>{{header}}</span></header>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                header: this.$route.meta.header
            }
        },
        watch: {
            $route(curVal) {
                this.header = curVal.meta.header;
            }
        },
        methods: {
            GoBack: function() {
                console.log(1234);
            }
        }
    }
</script>

<style>
    body,
    html {
        margin: 0;
        padding: 0;
    }
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    
    header {
        background: #0489ff;
        color: white;
        font-size: 0.65rem;
        height: 1.2rem;
        line-height: 1.3rem;
        position: relative;
    }
    
    header a {
        font-size: 0.6rem;
        position: absolute;
        left: 0.4rem;
        text-decoration: none;
        color: black;
    }
</style>