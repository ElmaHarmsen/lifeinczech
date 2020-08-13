<template>
  <section id="home">
    <div class="page_header">
      <Navigation />
      <h1>
        Hotlist <br />
        @ Home
      </h1>
    </div>
    <div v-if="loading" class="loading">
      <h1>Loading ...</h1>
    </div>
    <div v-else class="hotlist_content">
      <div class="word_hotlist-wrapper">
        <Word
          v-for="wordData in hotlistWord"
          v-bind:key="wordData.id"
          v-bind:wordData="wordData"
          v-on:fetchWordsAgain="fetchData()"
        />
        <!--"fetchData()" means that there is a parameter being used within the (). Otherwise it's just "fetchData" or "fetchData()".-->
        <!--What it does is fetching the data again, so it 'refreshes' the list.-->
      </div>
    </div>
    <Apps />
    <!-- <Addword v-on:fetchWordsAgain="fetchData()" /> Here the addWord form asks the Hotlist to fetch the list with words again. -->
  </section>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import Word from "@/components/Word.vue";
// import Addword from "@/components/Addword.vue";
import Apps from "@/components/Apps.vue";

export default {
  name: "Home",
  data: function() {
    return {
      loading: true,
      hotlistJson: []
    };
  },
  components: {
    Navigation,
    Word,
    // Addword,
    Apps
  },
  created: async function() {
    await this.fetchData();
    this.loading = false;
  },
  computed: {
    hotlistWord: function() {
      return this.hotlistJson
        .filter(word => word.hotlist === true)
        .slice()
        .reverse();
    }
  },
  methods: {
    async fetchData() {
      const hotlist = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz"
      );
      this.hotlistJson = await hotlist.json();
    }
  }
};
</script>

<style lang="scss" scoped>
section {
}
</style>

<!-- the components:
- navigation
- title next to navigation menu
- the 3 boxes with the word, translation and pronounciation
- above this the 1st language, 2nd language and " "
- button to add word to a list
- form to add a word to the list
-->

<!-- some things:
- the home page is similar to the collection page in the lego shop
- the list is also similar to this; with "submit" you add it to a "collection" of words already there
-->
