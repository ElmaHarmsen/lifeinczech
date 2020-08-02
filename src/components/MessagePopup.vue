<template>
  <section v-if="isPopupShown">
    <h1>{{ popupText }}</h1>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
//Maps the getters into computed properties

export default {
  name: "MessagePopup",
  computed: {
    ...mapGetters(["isPopupShown", "popupText"])
  }
}
</script>
<style lang="scss" scoped>
section {
  top: 1.5rem;
  right: 1.5rem;
  position: absolute;
  h1 {
    color: $light-blue;
  }
}
</style>