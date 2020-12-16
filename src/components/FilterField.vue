<template>
  <transition name="bounce">
    <div class="filter_input">
      <select v-model="filter_category" class="filter_select" id="the-filter">
        <option value="" disabled>Filter by category</option>
        <option>Animals</option>
        <option>Meals</option>
        <option>Objects</option>
        <option>Politeness</option>
      </select>
      <div class="filter_submit">
        <img src="../assets/unfold_more-24px.svg" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "FilterField",
  data: function() {
    return {
      filter_category: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.filter_input {
  &.bounce-enter-active,
  &.bounce-leave-active {
    transition: all 0.2s ease;
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
