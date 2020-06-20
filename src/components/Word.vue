<template>
  <section>
    <div v-on:click="fetchData()" class="word_wrapper" name="word_delete">
      <h3>{{ wordData.word }}</h3>
      <h2>{{ wordData.translation}}</h2>
      <h3>{{ wordData.pronunciation}}</h3>
    </div>
  </section>
</template>

<script>
export default {
  name: "Word",
  props: ["wordData"],
  data: function() {
    return {
      word_delete: "",
      error: ""
    }
  },
  methods: {
    async fetchData() {
      const deleteWord = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz",  
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            word: this.input_word,
            translation: this.input_translation,
            pronunciation: this.input_pronunciation,
            // hotlist: this.inHotlist,
            // dictionary: this.inDictionary,
            category: "test"
          })
        }     
      );
      const response = await deleteWord.json();
      if (response) { //If the place exists in the response and it's true
        this.$router.push("Success!"); //Takes you to the correct page
      }
      else {
        this.error = "Fail!";
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .word_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100%;
    gap: 0.5rem;
    margin: 1.5rem 0rem;
    width: 100%;

    h2, h3 {
      border: 1px solid blue;
      height: auto;
    }
  }
  .word_wrapper > * {
    padding: 0.8rem 0.5rem;
  }
}
</style>