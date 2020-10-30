<template>
  <div id="app">
    <MessagePopup />
    <router-view />
  </div>
</template>

<script>
import MessagePopup from "@/components/MessagePopup.vue";

export default {
  name: "App",
  components: {
    MessagePopup
  }
};
</script>

<style lang="scss">
#app {
  padding: 1rem;

  @include screen-is(lg) {
    padding: 0;
  }
}
</style>
