<template>
  <section>
    <div
      v-on:click="openDetails()"
      class="word_wrapper"
      v-bind:class="{ close: worddetailsopen }"
    >
      <Language />
      <div class="word_words-around">
        <div class="word_wrapper-words">
          <h2>{{ wordData.word }}</h2>
          <h2>{{ wordData.translation }}</h2>
          <h2>{{ wordData.nederlands }}</h2>
        </div>
        <div class="word_words-category">
          <h2>{{ wordData.category }}</h2>
        </div>
      </div>
    </div>
    <transition name="bounce">
      <div
        class="word_details"
        v-if="worddetailsopen"
        v-bind:class="{ open: worddetailsopen }"
      >
        <div class="requests">
          <img
            src="../assets/delete-24px.svg"
            class="delete"
            v-on:click="deleteWord(wordData._id)"
          />
          <Editword
            v-bind:editingWord="wordData"
            v-on:closeDetails="openDetails()"
            v-on:fetch-words-again="$emit('fetch-words-again')"
          />
          <Moveword
            v-bind:movingWord="wordData"
            v-on:closeDetails="openDetails()"
            v-on:fetch-words-again="$emit('fetch-words-again')"
          />
        </div>
      </div>
    </transition>
  </section>
</template>
<!--Here fetchData() doesn't exist so we emit the event again (2 times in total). From Moveword to Word to Home/Dictionary.-->

<script>
import Language from "@/components/Language.vue";
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
    Language,
    Editword,
    Moveword
  },
  methods: {
    openDetails() {
      this.worddetailsopen = !this.worddetailsopen;
      if (!this.worddetailsopen) {
        //If there is no clicked word, there is no worddetailsopen, and we remove the blurred class.
        document
          .querySelectorAll(".word_wrapper")
          .forEach(word => word.classList.remove("word_blurred"));
      } else {
        //If there is a word wich has the details. we add the blurred class to all of them. Exept the one that is clicked which overrides the blur.
        document
          .querySelectorAll(".word_wrapper")
          .forEach(word => word.classList.add("word_blurred"));
      }
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
      this.$emit("fetch-words-again");
      this.$store.dispatch("triggerMessage", response);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .word_wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    margin: 1.5rem 0rem;
    width: 100%;
    border-radius: 2px;
    box-shadow: 0 0 5px $shadow;
    background-color: $darker;

    .word_words-around {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .word_wrapper-words {
        display: flex;
        flex-flow: column wrap;
        justify-content: space-evenly;

        h2 {
          height: auto;
          padding: 0.8rem 0.5rem;
        }
      }
      .word_words-category {
        align-self: end;

        h2 {
          color: $light-blue;
          padding: 0.8rem 0.5rem;
        }
      }
    }
  }
  .word_blurred {
    filter: blur(3px);
  }
  .word_details {
    transition: opacity 0.2s ease-in;

    .requests {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      cursor: pointer;

      .delete {
        height: 50px;
        width: 50px;
        border-radius: 2px;
        box-shadow: 0 0 5px $shadow;
      }
    }
    .requests > * {
      margin: 0rem 0.5rem;
    }
    &.bounce-enter-active,
    &.bounce-leave-active {
      opacity: 1;
    }
    &.bounce-enter,
    &.bounce-leave-to {
      opacity: 0;
    }
  }
}
</style>
