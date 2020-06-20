<template>
  <section id="home">
    <div class="navigation_wrapper">
      <Navigation />
      <h1>Hotlist <br> @ Home</h1>
    </div>
    <div class="hotlist_content">
      <Language />
      <div class="word_hotlist-wrapper">
        <Word 
          v-for="wordData in hotlistWord"
          v-bind:key="wordData.id"
          v-bind:wordData="wordData"
        />
      </div>
    </div>
    <Addword />
  </section>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import Language from "@/components/Language.vue";
import Word from "@/components/Word.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Home",
  data: function() {
    return {
      hotlistJson: []
    }
  },
  components: {
    Navigation,
    Language,
    Word,
    Addword
  },
  created: async function() {
    await this.fetchData();
  },
  computed: {
    hotlistWord: function() {
      return this.hotlistJson.filter(word => word.hotlist === true).slice().reverse();
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
  .hotlist_content {
    margin: 50px 0rem;
  }
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