<template>
  <section>
    <div class="navigation_wrapper">
      <Navigation />
      <h1>Dictionary <br># CZ - EN</h1>
    </div>
    <div class="dictionary_content">
      <Language />
      <div class="word_hotlist-wrapper">
        <Word 
          v-for="wordData in dictionaryWord"
          v-bind:key="wordData.id"
          v-bind:wordData="wordData"
        />
      </div>
    </div>
    <Addword />
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
      dictionaryJson: []
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
    dictionaryWord: function() {
      return this.dictionaryJson.filter(word => word.dictionary === true);
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
}
</script>

<style lang="scss" scoped>
section {
  .dictionary_content {
    margin: 50px 0rem;
  }
}
</style>