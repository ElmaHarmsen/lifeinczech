<template>
  <section>
    <div
      v-on:click="openDetails()"
      class="word_wrapper"
      v-bind:class="{ close: worddetailsopen }"
    >
      <Language />
      <div class="word_wrapper-words">
        <h3>{{ wordData.word }}</h3>
        <h3>{{ wordData.translation }}</h3>
        <h3>{{ wordData.nederlands }}</h3>
      </div>
      <!-- <img src="../assets/expand_more-24px.svg" class="expand" alt=""> -->
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
            v-on:fetchWordsAgain="$emit('fetchWordsAgain')"
          />
          <Moveword
            v-bind:movingWord="wordData"
            v-on:closeDetails="openDetails()"
            v-on:fetchWordsAgain="$emit('fetchWordsAgain')"
          />
        </div>
      </div>
    </transition>
    <!-- <div class="word_details-wrapper" v-bind:class="{ open: worddetailsopen }">
      <div class="word_details-around">
        <div class="requests">
          <img src="../assets/delete-24px.svg" class="delete" v-on:click="deleteWord(wordData._id)">
          <Editword v-bind:editingWord="wordData" v-on:closeDetails="openDetails()"
            v-on:fetchWordsAgain="$emit('fetchWordsAgain')"/>
          <Moveword v-bind:movingWord="wordData" v-on:closeDetails="openDetails()" 
            v-on:fetchWordsAgain="$emit('fetchWordsAgain')"/>
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
    </div> -->
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
      console.log(response); //Either SYSTEM FAIL or YOU MANAGED
      this.$emit("fetchWordsAgain");
      this.$store.dispatch("triggerMessage", response);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .word_wrapper {
    display: flex;
    flex-flow: row nowrap;
    margin: 1.5rem 0rem;
    width: 100%;
    border-radius: 2px;
    box-shadow: 0 0 5px $shadow;

    .word_wrapper-words {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-evenly;

      h3 {
        height: auto;
        padding: 0.8rem 0.5rem;
      }
    }
  }
  .word_blurred {
    filter: blur(3px);
  }

  .word_details {
    // margin-top: -200px;
    // right: 1.5rem;
    // position: absolute;
    transition: opacity 0.2s ease-in;

    .requests {
      display: flex;
      flex-flow: row nowrap;
      // justify-content: space-around;
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

    // &.bounce-enter-active {
    //   opacity: 1;
    // }
    // &.bounce-leave-active {
    //   opacity: 0;
    // }

    // &.open {
    //   display: block;
    // }
  }

  // .word_details-wrapper {
  //   width: 70%;
  //   height: 100%;
  //   position: fixed;
  //   z-index: 10;
  //   top: 0rem;
  //   left: -75%;
  //   transition: left 0.2s ease-in;
  //   background-color: white;
  //   box-shadow: 10px 0 5px -5px $shadow;

  //   &.open {
  //     left: 0;
  //   }
  //   .word_details-around {
  //     display: flex;
  //     flex-flow: column wrap;
  //     height: 100%;
  //     padding: 0.5rem;

  //     .requests {
  //       margin-top: 100px;
  //       padding-bottom: 1.5rem;
  //       // display: flex;
  //       // flex-flow: row nowrap;
  //       // justify-content: space-between;
  //       // align-items: flex-end;
  //       cursor: pointer;

  //       .delete {
  //         height: 50px;
  //         border-radius: 2px;
  //         box-shadow: 0 0 5px $shadow;
  //       }
  //     }
  //     .requests > * {
  //       padding: 0rem 0rem 1.5rem 0rem;
  //     }

  //     .word_details-words {
  //       display: flex;
  //       flex-flow: column nowrap;
  //       padding-bottom: 1.5rem;
  //     }
  //     .word_details-words > * {
  //       padding: 0rem 0rem 1.5rem 0rem;
  //       display: flex;
  //       flex-flow: row nowrap;
  //     }

  //     .word_details-other {
  //       width: 100%;
  //       display: flex;
  //       flex-flow: column nowrap;
  //       justify-content: space-between;
  //       padding-bottom: 1.5rem;
  //     }
  //   }

  //   .word_details-close {
  //     position: absolute;
  //     top: 0.5rem;
  //     left: 0.5rem;
  //     z-index: 2;
  //     position: absolute;
  //     background-color: $light-blue;
  //     border: 1px solid $light-blue;
  //     box-shadow: 0 0 5px $shadow;

  //     .word_details-close-span {
  //       background-color: white;
  //     }
  //     span:first-of-type {
  //       transform: rotate(-45deg) translate(-5px, 5px);
  //     }
  //     span:last-of-type {
  //       transform: rotate(45deg) translate(-2.5px, -5px);
  //     }
  //   }
  // }
}
</style>
