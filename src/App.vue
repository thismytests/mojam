<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TodoListContainer msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from 'vue-property-decorator';

    // containers
    import TodoListContainer from './containers/TodoListContainer/TodoListContainer.vue';

    @Component({
        components: {
            TodoListContainer,
        },
    })
    export default class App extends Vue {
    }
</script>

<!--Common styles-->
<style src="./mainstyles.css"></style>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
