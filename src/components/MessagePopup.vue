<template>
  <section>
    <div class="message_display" v-if="isPopupShown">
      <h1>{{ popupText }}</h1>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex"; //Maps the getters into computed properties

export default {
  name: "MessagePopup",
  computed: {
    ...mapGetters(["isPopupShown", "popupText"])
  }
};
</script>
<style lang="scss" scoped>
section {
  .message_display {
    top: 0.5rem;
    border-radius: 2px;
    box-shadow: 0 0 5px $shadow;
    background-color: $darker;

    h1 {
      color: white;
      padding: 0.5rem;
    }
  }
}
</style>
