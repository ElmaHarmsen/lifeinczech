<template>
  <section>
    <div class="navigation_wrapper">
      <Navigation />
      <h1>Dictionary <br /># CZ - EN - NL</h1>
    </div>
    <div v-if="loading" class="loading">
      <h1>Loading ...</h1>
    </div>
    <div v-else class="dictionary_content">
      <Language />
      <div class="word_hotlist-wrapper">
        <Word
          v-for="wordData in dictionaryWord"
          v-bind:key="wordData.id"
          v-bind:wordData="wordData"
          v-on:fetchWordsAgain="fetchData()"
        />
      </div>
    </div>
    <Addword v-on:fetchWordsAgain="fetchData()" /> <!--Here the addWord form asks the Dictionary to fetch the list with words again.-->
  </section>
</template>

<script>
import Navigation from "@/components/Header.vue";
import Language from "@/components/Language.vue";
import Word from "@/components/Word.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Dictionary",
  data: function() {
    return {
      loading: true,
      dictionaryJson: []
    };
  },
  components: {
    Navigation,
    Language,
    Word,
    Addword
  },
  created: async function() {
    await this.fetchData();
    this.loading = false;
  },
  computed: {
    dictionaryWord: function() {
      return this.dictionaryJson
        .filter(word => word.dictionary === true)
        .slice()
        .reverse();
    }
  },
  methods: {
    async fetchData() {
      const dictionary = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz"
      );
      this.dictionaryJson = await dictionary.json();
    }
  }
};
</script>

<style lang="scss" scoped>
section {
}
</style>
