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
    height: 50px !important;
    border-radius: 2px;
    background-color: $blue;
    border-bottom: 4px solid $dark;
    display: flex;
    flex-flow: row;
    align-items: center;

    @include screen-is(lg) {
      top: 0rem;
    }

    h1 {
      color: white;
      padding: 0.5rem;

      @include screen-is(lg) {
        padding: 0rem 0.5rem;
      }
    }
  }
}
</style>
