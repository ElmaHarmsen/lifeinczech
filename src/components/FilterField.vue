<template>
  <section>
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
      <div class="filter_close" v-on:click="$emit('close-filter')">
        <img src="../assets/close-24px.svg" alt="" />
      </div>
    </div>
  </section>
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
