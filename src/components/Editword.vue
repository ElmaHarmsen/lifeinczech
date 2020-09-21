<template>
  <section>
    <div
      v-on:click="openEditWordForm()"
      class="editword_btn"
      v-bind:class="{ close: editwordformopen }"
    >
      <img src="../assets/create-24px.svg" class="editword_edit" />
    </div>
    <div
      class="editword_form-wrapper"
      v-bind:class="{ open: editwordformopen }"
    >
      <div class="editword_form">
        <h1>Edit this word</h1>
        <div class="editword_pre-inputs">
          <h2>{{ editingWord.word }}</h2>
          <h2>{{ editingWord.translation }}</h2>
          <h2>{{ editingWord.nederlands }}</h2>
        </div>
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
          v-on:click="editWord(editingWord._id), openEditWordForm()"
          class="inputs_button"
          type="submit"
          name="form_submit"
          v-bind:value="`Save and Edit`"
        />
      </div>
      <div class="editword_close" v-on:click="openEditWordForm()">
        <img src="../assets/close-24px.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Editword",
  props: ["editingWord"],
  data: function() {
    return {
      editwordformopen: false,
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
    openEditWordForm() {
      this.editwordformopen = !this.editwordformopen;
    },
    async editWord(id) {
      const editWord = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz",
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
    .editword_edit {
      border-radius: 2px;
      border-bottom: 4px solid $shadow;
    }
  }
  .editword_form-wrapper {
    z-index: 5;

    .editword_pre-inputs > * {
      padding: 0.8rem 0.5rem;
    }
    .inputs_button {
      background-color: $light-blue;
    }
  }
}
</style>
