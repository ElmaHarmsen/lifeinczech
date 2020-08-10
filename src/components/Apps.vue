<template>
  <section>
    <div 
      v-on:click="openApps()"
      class="apps_btn"
      v-bind:class="{ close: appsopen }"
    >
      <img class="apps_btn-icon" src="../assets/apps-24px.svg" alt="">
    </div>
    <div class="apps_wrapper" v-bind:class="{ open: appsopen }">
      <div class="apps_search">
        <img class="apps_search-icon" src="../assets/search-24px.svg" alt="">
      </div>
      <div class="apps_filter">
        <img class="apps_filter-icon" src="../assets/filter_alt-24px.svg" alt="">
      </div>
      <div class="apps_add">
        <Addword />
      </div>
    </div>
  </section>
</template>

<script>
import Addword from "@/components/Addword.vue";

export default {
  name: "Apps",
  data: function() {
    return  {
      appsopen: false
    }
  },
  components: {
    Addword
  },
  methods: {
    openApps() {
      this.appsopen = !this.appsopen;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .apps_btn {
    bottom: 1.5rem;
    right: 1.5rem;
    position: fixed;
    z-index: 3;

    .apps_btn-icon {
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;
    }
  }
  .apps_wrapper {
    width: 50px;
    height: calc(200px + 3.5rem);
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    opacity: 0;
    transition: opacity 0.2s ease-in;
    // background-color: $light-blue;
    // box-shadow: 0 0 5px $shadow;

    &.open {
      opacity: 1;
    }

    .apps_filter-icon, .apps_search-icon {
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;
    }
  }
  .apps_wrapper > * {
    padding: 0.5rem 0rem;
  }
}
</style>