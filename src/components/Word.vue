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
        <div class="requests">
          <h1 class="delete" v-on:click="deleteWord(wordData._id)">Delete</h1>
          <Editword v-bind:editingWord="wordData" v-on:closeDetails="openDetails()"
          v-on:fetchWordsAgain="$emit('fetchWordsAgain')"/>
          <Moveword v-bind:movingWord="wordData" v-on:closeDetails="openDetails()" 
          v-on:fetchWordsAgain="$emit('fetchWordsAgain')"/>
          <!--Here fetchData() doesn't exist so we emit the event again (2 times in total). From Moveword to Word to Home/Dictionary.-->
        </div>
        <div class="word_details-words">
          <h1>CZ: {{ wordData.word }}</h1>
          <h1>EN: {{ wordData.translation }}</h1>
          <h1>NL: {{ wordData.nederlands }}</h1>
        </div>
        <div class="word_details-other">
          <h1 class="category">Category: {{ wordData.category }}</h1>
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
import Editword from "@/components/Editword.vue";
import Moveword from "@/components/Moveword.vue";

export default {
  name: "Word",
  props: ["wordData"],
  data: function() {
    return {
      worddetailsopen: false,
      input_word: "",
      input_translation: "",
      input_nederlands: "",
      select_category: "",
      word_delete: "",
      error: ""
    };
  },
  components: {
    Editword,
    Moveword
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
      this.$store.dispatch("triggerMessage", response);
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
      border-radius: 2px;
      height: auto;
    }
  }
  .word_wrapper > * {
    padding: 0.8rem 0.5rem;
  }
  .word_details-wrapper {
    width: 70%;
    height: 100%;
    position: fixed;
    z-index: 10;
    top: 0rem;
    left: -75%;
    transition: left 0.2s ease-in;
    background-color: white;
    box-shadow: 10px 0 5px -5px $shadow;

    &.open {
      left: 0;
    }
    .word_details-around {
      display: flex;
      flex-flow: column wrap;
      height: 100%;
      padding: 0.5rem;

      .requests {
        margin-top: 100px;
        padding-bottom: 1.5rem;
        // display: flex;
        // flex-flow: row nowrap;
        // justify-content: space-between;
        // align-items: flex-end;
        cursor: pointer;
      }
      .requests > * {
        padding: 0rem 0rem 1.5rem 0rem;
      }

      .delete {
        color: $red;
      }

      .word_details-words {
        display: flex;
        flex-flow: column nowrap;
        padding-bottom: 1.5rem;
      }
      .word_details-words > * {
        padding: 0rem 0rem 1.5rem 0rem;
        display: flex;
        flex-flow: row nowrap;
      }

      .word_details-other {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        padding-bottom: 1.5rem;
      }
    }

    .word_details-close {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      z-index: 2;
      position: absolute;
      background-color: $light-blue;
      border: 1px solid $light-blue;
      box-shadow: 0 0 5px $shadow;

      .word_details-close-span {
        background-color: white;
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
