<template>
  <section>
    <div
      v-on:click="openDetails()"
      class="word_wrapper"
      v-bind:class="{ close: worddetailsopen }"
    >
      <h3>{{ wordData.word }}</h3>
      <h2>{{ wordData.translation }}</h2>
      <h3>{{ wordData.nederlands }}</h3>
    </div>
    <div class="word_details-wrapper" v-bind:class="{ open: worddetailsopen }">
      <div class="word_details-around">
        <div class="word_details-words">
          <h3>{{ wordData.word }}</h3>
          <h2>{{ wordData.translation }}</h2>
          <h3>{{ wordData.nederlands }}</h3>
        </div>
        <div class="word_details-other">
          <h1 class="category">Category: {{ wordData.category }}</h1>
          <h1 class="delete" v-on:click="deleteWord(wordData._id)">Delete word</h1>
        </div>
      </div>
      <div v-on:click="openDetails()" class="word_details-close">
        <span class="word_details-close-span"></span>
        <span class="word_details-close-span"></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Word",
  props: ["wordData"],
  data: function() {
    return {
      worddetailsopen: false,
      input_word: "",
      input_translation: "",
      input_nederlands: "",
      word_delete: "",
      error: ""
    };
  },
  methods: {
    openDetails() {
      this.worddetailsopen = !this.worddetailsopen;
    },
    async deleteWord(id) {
      this.openDetails(); //This closes the popup
      const deleteWord = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id
          })
        }
      );
      const response = await deleteWord.text();
      console.log(response);//Either SYSTEM FAIL or YOU MANAGED
      this.$emit("fetchWordsAgain");
    }
  }
};
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

    h2,
    h3 {
      border: 1px solid blue;
      height: auto;
    }
  }
  .word_wrapper > * {
    padding: 0.8rem 0.5rem;
  }
  .word_details-wrapper {
    width: calc(100% - 3rem);
    height: 20%;
    position: fixed;
    top: -22%;
    left: 1.5rem;
    z-index: 2;
    transition: top 0.2s ease-in;
    background-color: white;
    border: 1px solid blue;

    &.open {
      top: -0.1%;
    }
    .word_details-around {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      height: 80%;
      padding: 0.5rem;

      .word_details-words {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
      }
      .word_details-other {
        height: 50px;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        position: absolute;
        bottom: 0.5rem;

        .delete {
          color: red;
        }
      }
    }

    .word_details-close {
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      z-index: 2;
      background-color: white;
      border: 1px solid blue;

      .word_details-close-span {
        background-color: blue;
      }
      span:first-of-type {
        transform: rotate(-45deg) translate(-5px, 5px);
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-2.5px, -5px);
      }
    }
  }
}
</style>
