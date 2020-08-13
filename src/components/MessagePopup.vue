<template>
  <section v-if="isPopupShown">
    <h1>{{ popupText }}</h1>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
//Maps the getters into computed properties

export default {
  name: "MessagePopup",
  computed: {
    ...mapGetters(["isPopupShown", "popupText"])
  }
};
</script>
<style lang="scss" scoped>
section {
  width: calc(100% - 1rem);
  height: calc(50px + 1rem);
  top: 0rem;
  right: 0.5rem;
  position: absolute;
  z-index: 3;
  background-color: white;
  // box-shadow: 0px 10px 5px -5px $shadow;
  box-shadow: 0 0 5px $shadow;

  h1 {
    color: blue;
    padding: 0.5rem;
  }
}
</style>
