<template>
  <section>
    <page-header />
    <!-- <div v-if="loading" class="loading">
      <img class="spinner" src="../assets/spinner.gif" alt="" />
    </div>
    <div v-else class="dictionary_content">
      <Word
        v-for="wordData in dictionaryWord"
        v-bind:key="wordData.id"
        v-bind:wordData="wordData"
        v-on:fetch-words-again="fetchData()"
      />
    </div> -->
    <div class="dictionary_content">
      <div
        v-for="category in allWord"
        v-bind:key="category.id"
        class="category_wrapper"
      >
        <h1>{{ category.category }}</h1>
      </div>
    </div>
    <Apps v-on:fetch-words-again="fetchData()" />
    <!--Here the apps asks the Dictionary to fetch the list with words again.-->
  </section>
</template>

<script>
// import Navigation from "@/components/Navigation.vue";
// import Word from "@/components/Word.vue";
import Apps from "@/components/Apps.vue";
import PageHeader from "../components/PageHeader.vue";

export default {
  name: "Dictionary",
  data: function() {
    return {
      loading: true,
      dictionaryJson: []
    };
  },
  components: {
    // Navigation,
    // Word,
    Apps,
    PageHeader
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
    },
    allWord: function() {
      return Object.values(
        this.dictionaryJson.reduce(
          (accumulator, currentValue) =>
            Object.assign(accumulator, {
              [currentValue.category]: currentValue
            }),
          {}
        )
      );
    }
  },
  methods: {
    async fetchData() {
      const dictionary = await fetch(
        `${process.env.VUE_APP_API_URL}/dictionarycz`
      );
      this.dictionaryJson = await dictionary.json();
    }
  }
};
</script>

<style lang="scss" scoped>
.dictionary_content {
  margin: 100px 0rem 70px 0rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  gap: 2rem;

  @include screen-is(lg) {
    width: 55%;
    margin: 150px auto 70px auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2.5rem;
  }

  .category_wrapper {
    background-color: $background;
    border: 4px solid $dark;
    border-radius: 20px;
    cursor: pointer;

    @include screen-is(lg) {
      margin: 0rem;
    }

    h1 {
      padding: 2rem 0.5rem;
    }
  }
}
</style>
