<template>
  <section>
    <div @click="toggleWordForm()" class="editword_btn">
      <svg
        class="editword_edit"
        height="50"
        viewBox="0 0 24 24"
        width="50"
        fill="#16345C"
      >
        <path d="M0 0h24v24H0V0z" fill="#f6b22b" />
        <path
          d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        />
      </svg>
      <h1>Edit</h1>
    </div>
    <transition name="bounce">
      <div class="editword_form-wrapper" v-show="wordFormOpened">
        <div class="editword_form">
          <h1>
            Edit word<br />
            <small>{{ editingWord.translation }}</small>
          </h1>
          <!-- <div class="editword_pre-inputs">
          <h2>{{ editingWord.word }}</h2>
          <h2>{{ editingWord.translation }}</h2>
          <h2>{{ editingWord.nederlands }}</h2>
        </div> -->
          <div class="editword_inputs">
            <input
              class="inputs_field"
              placeholder="Čeština"
              id="word"
              v-model="editWordTo"
              type="text"
              name="input_word"
              value="Word"
            />
            <input
              class="inputs_field"
              placeholder="English"
              id="translation"
              v-model="editTranslationTo"
              type="text"
              name="input_translation"
              value="Translation"
            />
            <input
              class="inputs_field"
              placeholder="Nederlands"
              id="nederlands"
              v-model="editNederlandsTo"
              type="text"
              name="input_nederlands"
              value="Nederlands"
            />
            <label for="category_select" class="category_select-label"
              >Category</label
            >
            <select
              v-model="editCategoryTo"
              class="category_select"
              name="select_category"
            >
              <option value="" disabled>Choose</option>
              <option>Animals</option>
              <option>Meals</option>
              <option>Objects</option>
              <option>Politeness</option>
            </select>
          </div>
          <input
            v-on:click="editWord(editingWord._id), close()"
            class="inputs_button"
            type="submit"
            name="form_submit"
            v-bind:value="`Save and Edit`"
          />
        </div>
        <div class="editword_close" v-on:click="close()">
          <img src="../assets/close-24px.svg" alt="" />
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "Editword",
  props: ["editingWord"],
  data: function() {
    return {
      wordFormOpened: false,
      input_word: "",
      input_translation: "",
      input_nederlands: "",
      select_category: "",
      form_submit: "",
      editWordTo: "",
      editTranslationTo: "",
      editNederlandsTo: "",
      editCategoryTo: ""
    };
  },
  methods: {
    toggleWordForm() {
      this.wordFormOpened = !this.wordFormOpened;
    },
    close() {
      this.wordFormOpened = false;
    },
    async editWord(id) {
      const editWord = await fetch(
        `${process.env.VUE_APP_API_URL}/dictionarycz`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id,
            editedWord: {
              word: this.editWordTo,
              translation: this.editTranslationTo,
              nederlands: this.editNederlandsTo,
              hotlist: this.editingWord.hotlist,
              dictionary: this.editingWord.dictionary,
              category: this.editCategoryTo
            }
          })
        }
      );
      const response = await editWord.text();
      console.log(response);
      this.$emit("closeDetails");
      this.$emit("fetch-words-again");
      this.$store.dispatch("triggerMessage", response);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .editword_btn {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    svg {
      border-radius: 2px;
      transition: 0.2s ease-in;
    }
    svg:hover {
      fill: $white;
    }

    h1 {
      padding: 0rem 1.5rem;
    }
  }
  .editword_form-wrapper {
    z-index: 5;

    &.bounce-enter-active,
    &.bounce-leave-active {
      transition: all 0.2s ease;
    }
    &.bounce-enter,
    &.bounce-leave-to {
      transform: translatex(-100%);

      @include screen-is(lg) {
        transform: translateY(100%);
      }
    }
    &.bounce-enter-to {
      transform: translateX(0%);

      @include screen-is(lg) {
        transform: translateY(0%);
      }
    }

    .editword_pre-inputs > * {
      padding: 0.8rem 0.5rem;
    }
    .inputs_button {
      background-color: $white;
      color: $paars;
    }
  }
}
</style>
