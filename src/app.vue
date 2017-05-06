<template>
<div class="app">
    <img src="./assets/logo.png">
    <hello></hello>
</div>
</template>

<script>
import Hello from './components/hello.vue'

export default {
    name: 'app',
    components: {
        Hello
    }
}
</script>

<style  lang="less">
.app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
