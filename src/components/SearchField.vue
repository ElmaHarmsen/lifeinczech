<template>
  <div class="search_input">
    <input
      v-model="searchQuery"
      v-on:submit="performSearch()"
      type="text"
      placeholder="Search for words"
      id="the-search"
    />
    <div>
      <div class="search_submit" v-on:click="performSearch()">
        <img src="../assets/send-24px.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  data: function() {
    return {
      searchQuery: "" //Whatever is in the input field is here.
    };
  },
  methods: {
    performSearch() {
      //For people who try to mess up the system, there is this security below:
      if (
        !this.searchQuery ||
        !this.searchQuery.trim() ||
        this.searchQuery.match(/[^A-Za-z0-9 ]+/)
      ) {
        //trim() cuts out all the white spaces, and the match only allows for letters a to z and numbers 0 to 9 and spaces if there is smth else aswell.
        return;
      }
      this.$router.push({
        path: "/search",
        query: { word: this.searchQuery.trim() }
      });
      //This redirects you using th path to the SearchResult view. query is the thing behind the ?. word is how we called the query. searchQuery is what we typed in the field.
    }
  }
};
</script>

<style lang="scss" scoped></style>
