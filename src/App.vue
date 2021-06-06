<template>
  <div id="app">
    <MainPage/>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainPage from "@/components/MainMenu";

export default {
  name: 'App',
  components: {MainPage}
}
</script>
