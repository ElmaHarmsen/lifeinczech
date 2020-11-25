<template>
  <section id="home">
    <page-header />
    <div v-if="loading" class="loading">
      <img class="spinner" src="../assets/spinner.gif" alt="" />
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
// import Navigation from "@/components/Navigation.vue";
import Word from "@/components/Word.vue";
import Apps from "@/components/Apps.vue";
import PageHeader from "../components/PageHeader.vue";

export default {
  name: "Homelist",
  data: function() {
    return {
      loading: true,
      hotlistJson: []
    };
  },
  components: {
    Word,
    Apps,
    PageHeader
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
        `${process.env.VUE_APP_API_URL}/dictionarycz`
      );
      this.hotlistJson = await hotlist.json();
    }
  }
};
</script>
