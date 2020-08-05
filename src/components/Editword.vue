<template>
  <section>
    <div
      v-on:click="openEditWordForm()"
      class="editword_btn"
      v-bind:class="{ close: editwordformopen }"
    >
      <h1 class="editword_edit">Edit</h1>
    </div>
    <div class="editword_form-wrapper" v-bind:class="{ open: editwordformopen }">
      <div class="editword_form">
        <h1>This is the form to edit a word</h1>
        <div class="editword_pre-inputs">
          <h3>{{ editingWord.word }}</h3>
          <h3>{{ editingWord.translation }}</h3>
          <h3>{{ editingWord.nederlands }}</h3>
        </div>
        <div class="editword_inputs">
          <input
            v-model="input_word"
            class="inputs_field"
            placeholder="Čeština"
            type="text"
            name="input_word"
          />
          <input
            v-model="input_translation"
            class="inputs_field"
            placeholder="English"
            type="text"
            name="input_translation"
          />
          <input
            v-model="input_nederlands"
            class="inputs_field"
            placeholder="Nederlands"
            type="text"
            name="input_nederlands"
          />          
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
      form_submit: "",
    }
  },
  methods: {
    openEditWordForm() {
      this.editwordformopen = !this.editwordformopen;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .editword_btn {
    .editword_edit {
      color: $orange;
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
        }      
      }
    }
    .editword_close {
      bottom: 1.5rem;
      right: 1.5rem;
      position: absolute;
      background-color: blue;
      border: 1px solid blue;
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;

      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-content: center;
      width: 48px;
      height: 48px;

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