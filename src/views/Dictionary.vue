<template>
  <section>
    <div class="page_header">
      <Navigation v-bind:activeLink="$options.name" />
      <h1 class="page_header-title">
        Dictionary <br />
        # CZ - EN - NL
      </h1>
    </div>
    <div v-if="loading" class="loading">
      <h1>Loading ...</h1>
    </div>
    <div v-else class="dictionary_content">
      <Word
        v-for="wordData in dictionaryWord"
        v-bind:key="wordData.id"
        v-bind:wordData="wordData"
        v-on:fetch-words-again="fetchData()"
      />
    </div>
    <Apps v-on:fetch-words-again="fetchData()" />
    <!--Here the apps asks the Dictionary to fetch the list with words again.-->
  </section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Word from "@/components/Word.vue";
import Apps from "@/components/Apps.vue";

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
    Word,
    Apps
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
