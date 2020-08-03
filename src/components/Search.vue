<template>
  <section>
    <div
      v-on:click="openSearch()"
      class="search_btn"
      v-bind:class="{ close: searchopen }"
    > 
      <span class="search_circle"></span>
      <span class="search_line"></span>
    </div>
    <div class="search_input" v-bind:class="{ open: searchopen }">
      <input 
        type="text"
        placeholder="Search"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "Search",
  data: function() {
    return {
      searchopen: false
    };
  },
  methods: {
    openSearch() {
      this.searchopen = !this.searchopen;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .search_btn {
    width: 48px;
    height: 48px;
    background-color: white;
    border: 1px solid $orange;
    border-radius: 2px;
    box-shadow: 0 0 5px $shadow;
    cursor: pointer;

    .search_circle {
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: white;
      border: 1.5px solid $orange;
      margin: 0.25rem 0rem 0rem 0.25rem;
    }

    .search_line {
      display: block;
      width: 25px;
      height: 1px;
      background-color: $orange;
      transform: rotate(45deg) translate(19px, -13px);
    }
    &.close {
      display: none;    
    }
  }
  
  .search_input {
    width: 50%;
    height: 50px;
    position: fixed;
    top: 0.5rem;
    right: -55%;
    transition: right 0.2s ease-in;

    &.open {
      right: 0.5rem;
    }

    input {
      width: 90%;
      padding: 0.8rem 0.5rem;
      border: 1px solid $orange;
      border-radius: 2px;
    }
  }
}
</style>