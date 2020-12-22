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
      </div>
    </div>
    <transition name="bounce">
      <div
        class="word_details"
        v-if="worddetailsopen"
        v-bind:class="{ open: worddetailsopen }"
      >
        <small class="word_details-word">{{ wordData.translation }}</small>
        <div class="requests">
          <div>
            <svg
              class="delete"
              v-on:click="deleteWord(wordData._id)"
              height="50"
              viewBox="0 0 24 24"
              width="50"
              fill="#16345C"
            >
              <path d="M0 0h24v24H0V0z" fill="#f6b22b" />
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
              />
            </svg>
            <h1>Delete</h1>
          </div>
          <transition name="component-fade" mode="out-in">
            <Editword
              v-bind:editingWord="wordData"
              v-on:closeDetails="openDetails()"
              v-on:fetch-words-again="$emit('fetch-words-again')"
            />
          </transition>
          <transition name="component-fade" mode="out-in">
            <Moveword
              v-bind:movingWord="wordData"
              v-on:closeDetails="openDetails()"
              v-on:fetch-words-again="$emit('fetch-words-again')"
            />
          </transition>
          <small class="word_details-word-lg">{{ wordData.translation }}</small>
          <div class="word_details-close" v-on:click="openDetails()">
            <img src="../assets/close-24px.svg" alt="" />
          </div>
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
    width: calc(100% - 8px);
    border-radius: 20px;
    background-color: $background;
    border: 4px solid $dark;
    transition: all 0.1s ease-in;

    // &.close {
    //   border: 4px solid $white;
    // }

    @include screen-is(lg) {
      margin: 0rem;
    }

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
          padding: 1rem 0.5rem;

          @include screen-is(lg) {
            padding: 1.2rem 0.5rem;
          }
        }
      }
    }
  }
  .word_wrapper:hover {
    background-color: $dark-opacity;
  }
  .word_details {
    width: calc(100% - 2rem);
    height: auto;
    position: fixed;
    z-index: 4;
    bottom: 0;
    left: 0;
    padding: 0.5rem 1rem;
    background-color: $background;
    border-top: 4px solid $dark;
    transition: all 0.2s ease-in;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;

    @include screen-is(lg) {
      bottom: unset;
      top: 0;
      width: calc(55%);
      left: 22.5%;
      padding: 0rem;
      border-top: none;
      border-bottom: 4px solid $dark;
    }
    .word_details-word {
      text-align: center;
      grid-column: span 2;
      padding-top: 1rem;

      @include screen-is(lg) {
        display: none;
      }
    }
    .requests {
      grid-column: span 2;
      grid-row-start: 2;

      @include screen-is(lg) {
        display: flex;
        align-items: center;
      }

      svg {
        transition: 0.2s ease-in;
      }
      svg:hover {
        fill: $white;
      }

      .delete {
        height: 50px;
        width: 50px;
        border-radius: 2px;
      }
    }
    .requests > * {
      margin: 1rem 1.5rem;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      cursor: pointer;

      h1 {
        padding: 0rem 1.5rem;
      }

      @include screen-is(lg) {
        margin: 1rem 0.5rem;
      }
    }
    .word_details-word-lg {
      display: none;

      @include screen-is(lg) {
        display: block;
      }
    }
    .word_details-close {
      position: absolute;
      bottom: 0.5rem;
      right: 1rem;

      @include screen-is(lg) {
        top: 1rem;
        right: 0rem;
      }
    }
    &.bounce-enter-active,
    &.bounce-leave-active {
      transition: all 0.3s ease;
    }
    &.bounce-enter,
    &.bounce-leave-to {
      transform: translateY(100%);

      @include screen-is(lg) {
        transform: translateY(-100%);
      }
    }
    &.bounce-enter-to {
      transform: translateY(0%);
    }
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
