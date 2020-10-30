<template>
  <section id="searchresult">
    <div class="page_header">
      <!-- <Navigation /> -->
      <div class="page_header-title">
        <img class="page_header-img" src="../assets/SmallDucky.png" alt="" />
        <h1>
          Elma's Ducky
        </h1>
        <h1>Search result(s) for "{{ currentQuery }}"</h1>
      </div>
    </div>
    <div class="searchresult_content">
      <div class="searchresult_words" v-if="searchResultJson.length">
        <!-- It the length of the result is not 0 -->
        <Word
          v-for="wordData in searchResultJson"
          v-bind:key="wordData._id"
          v-bind:wordData="wordData"
        />
      </div>
      <h1 v-else>No results for your query</h1>
    </div>
    <Apps v-on:fetch-words-again="fetchData()" />
  </section>
</template>

<script>
// import Navigation from "@/components/Navigation.vue";
import Word from "@/components/Word.vue";
import Apps from "@/components/Apps.vue";

export default {
  name: "SearchResult",
  data: function() {
    return {
      currentQuery: "", //This gets replaced by what you filled in in SearchField before.
      searchResultJson: []
    };
  },
  methods: {
    async fetchData() {
      const rawResponse = await fetch(
        `https://dictionary--api.herokuapp.com/api/search?word=${this.currentQuery}`
      );
      if (rawResponse.status === 404) {
        // If the response is "not found", we show the message coming from the API
        this.$store.dispatch("triggerMessage", await rawResponse.text());
        return;
      }
      const resultJson = await rawResponse.json();
      this.searchResultJson = resultJson.result; //Because in resultJson there is result and message, and we only want the result here.
      this.$store.dispatch("triggerMessage", resultJson.message);
    }
  },
  components: {
    // Navigation,
    Word,
    Apps
  },
  created: async function() {
    if (!this.$route.query.word) {
      this.$router.push("/");
      return;
      //If there is no searchQuery called word you get redirected to Home.
    }
    this.currentQuery = this.$route.query.word; //Otherwise the query gets saved and the api call is made.
    await this.fetchData();
  }
};
</script>
