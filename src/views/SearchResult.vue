<template>
  <section id="searchresult">
    <div class="page_wrapper">
      <div class="page_header-div">
        <img src="../assets/Ducky-3.png" alt="" />
        <h1 class="page_header-h1">"{{ currentQuery }}"</h1>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <img class="spinner" src="../assets/spinner.gif" alt="" />
    </div>
    <div v-else class="searchresult_content">
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
import Word from "@/components/Word.vue";
import Apps from "@/components/Apps.vue";

export default {
  name: "SearchResult",
  data: function() {
    return {
      loading: true,
      currentQuery: "", //This gets replaced by what you filled in in SearchField before.
      searchResultJson: []
    };
  },
  created: async function() {
    if (!this.$route.query.word) {
      this.$router.push("/");
      return;
      //If there is no searchQuery called word you get redirected to Home.
    }
    this.currentQuery = this.$route.query.word; //Otherwise the query gets saved and the api call is made.
    await this.fetchData();
    this.loading = false;
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
    Word,
    Apps
  }
};
</script>
