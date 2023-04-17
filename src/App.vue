<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
    
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Detail,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("home/CategoryList");
  },
};
</script>

<style>
</style>
