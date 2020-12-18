<template>
  <transition name="bounce">
    <div class="message_display" v-if="isPopupShown">
      <h1>{{ popupText }}</h1>
    </div>
  </transition>
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
.message_display {
  height: 50px !important;
  border-radius: 2px;
  background-color: $yellow;
  border-bottom: none !important;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;

  @include screen-is(lg) {
    top: 0rem;
  }

  h1 {
    color: $dark;
    font-weight: bolder;
    padding: 0.5rem;

    @include screen-is(lg) {
      padding: 0rem 0.5rem;
    }
  }

  &.bounce-enter-active,
  &.bounce-leave-active {
    transition: all 0.3s ease;
  }
  &.bounce-enter,
  &.bounce-leave-to {
    transform: translateY(-100%);
  }
  &.bounce-enter-to {
    transform: translateY(0%);
  }
}
</style>
