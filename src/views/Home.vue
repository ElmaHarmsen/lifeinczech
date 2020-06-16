<template>
  <section id="home">
    <Header />
    <div class="hotlist_content">
      <h1>This is the Hotlist CZ - EN!</h1>
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
import Header from "@/components/Header.vue";
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
    Header,
    Word,
    Addword
  },
  created: async function() {
    await this.fetchData();
  },
  computed: {
    hotlistWord: function() {
      return this.hotlistJson.filter(word => word.hotlist === true);
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