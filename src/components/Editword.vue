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
        <h1>This is the form to edit a word</h1>
        <div class="editword_pre-inputs">
          <h3>{{ editingWord.word }}</h3>
          <h3>{{ editingWord.translation }}</h3>
          <h3>{{ editingWord.nederlands }}</h3>
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
        <span class="editword_close-span"></span>
        <span class="editword_close-span"></span>
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
      box-shadow: 0 0 5px $shadow;
    }
  }

  .editword_form-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0rem;
    left: -100%;
    z-index: 5;
    transition: left 0.2s ease-in;
    background-color: white;

    &.open {
      left: 0;
    }

    .editword_form {
      padding: 0.5rem;

      h1 {
        height: 50px;
      }

      .editword_pre-inputs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 100%;
        gap: 0.5rem;

        h3 {
          border: 1px solid blue;
          border-radius: 2px;
          height: auto;
          min-height: calc(50px - 1.6rem);
        }
      }
      .editword_pre-inputs > * {
        padding: 0.8rem 0.5rem;
      }

      .editword_inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin: 1.5rem 0rem 1.5rem 0rem;

        input {
          grid-column: 1/3;
        }
        .inputs_field {
          width: calc(100% - 1.2rem);
          padding: 0.8rem 0.5rem;
          border: 1px solid blue;
          border-radius: 2px;

          &:focus {
            box-shadow: 0 0 5px $shadow;
          }
        }
        .category_select-label {
          padding: 0.8rem 0.5rem;
          font-size: 18px;
        }
        .category_select {
          -webkit-appearance: none;
          width: 100%;
          padding: 0.8rem 0.25rem;
          background-color: white;
          border: 1px solid blue;
          border-radius: 2px;

          &:focus {
            box-shadow: 0 0 5px $shadow;
          }
        }
      }
    }
    .editword_close {
      bottom: 1.5rem;
      right: 1.5rem;
      position: absolute;
      background-color: $light-blue;
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;

      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-content: center;
      width: 50px;
      height: 50px;

      .editword_close-span {
        background-color: white;
      }
      span:first-of-type {
        transform: rotate(135deg) translate(5px, -5px);
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-2.5px, -4px);
      }
    }
  }
}
</style>
