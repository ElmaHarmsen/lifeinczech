<template>
  <section>
    <Navigation />
    <div class="header_page-title">
      <!--will dynamically change depending on the page-->
      <!-- <h1>Hotlist</h1>
      <h1>CZ - EN</h1> -->
    </div>
  </section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "Header",
  components: {
    Navigation
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 100%;
  gap: 1rem;

  .header_page-title {
    height: 50px;
  }
}
</style>
