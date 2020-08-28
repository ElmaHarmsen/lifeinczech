<template>
  <section id="home">
    <div class="page_header">
      <Navigation v-bind:activeLink="$options.name" />
      <h1 class="page_header-title">
        Hotlist <br />
        @ Home
      </h1>
    </div>
    <div v-if="loading" class="loading">
      <h1>Loading ...</h1>
    </div>
    <div v-else class="hotlist_content">
      <Word
        v-for="wordData in hotlistWord"
        v-bind:key="wordData.id"
        v-bind:wordData="wordData"
        v-on:fetch-words-again="fetchData()"
      />
      <!--"fetchData()" means that there is a parameter being used within the (). Otherwise it's just "fetchData" or "fetchData()".-->
      <!--What it does is fetching the data again, so it 'refreshes' the list.-->
    </div>
    <Apps v-on:fetch-words-again="fetchData()" />
    <!--Here the apps asks the Hotlist to fetch the list with words again.-->
  </section>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Word from "@/components/Word.vue";
import Apps from "@/components/Apps.vue";

export default {
  name: "Hotlist",
  data: function() {
    return {
      loading: true,
      hotlistJson: []
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
