<template>
  <section>
    <div class="search_input">
      <input type="text" placeholder="Search" />
      <div class="search_close" v-on:click="$emit('close-search')">
        <img src="../assets/close-24px.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style lang="scss" scoped>
section {
  .search_btn {
    width: 50px;
    height: 50px;
    box-shadow: 0 0 5px $shadow;

    img {
      border-radius: 2px;
    }
  }
  .search_input {
    display: flex;
    flex-flow: row nowrap;
    background-color: $background;

    input {
      width: calc(100% - 1rem - 50px);
      height: 48px;
      padding: 0rem 0.5rem;
      border: 1px solid #0d8cff;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      box-shadow: 0 0 5px $shadow;

      &:focus {
        border: 1px solid $purple;
      }
    }
    .search_close {
      img {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        box-shadow: 0 0 5px $shadow;
        background-color: $light-blue;
      }
    }
  }
}
</style>

What does the search do: - you open the searchbar and - you type in a word or
category (string) and - the search functionality checks which items match this
and - it fetches the data and - returns a list with matches to the search input.
- using a get request from the database with the query word url
