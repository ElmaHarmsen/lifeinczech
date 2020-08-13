<template>
  <section>
    <div
      v-on:click="openWordForm()"
      class="addword_btn"
      v-bind:class="{ close: wordformopen }"
    >
      <span class="addword_span"></span>
      <span class="addword_span"></span>
      <!-- <img src="../assets/add-24px.svg" alt=""> -->
    </div>
    <div class="addword_form-wrapper" v-bind:class="{ open: wordformopen }">
      <div class="addword_form">
        <h1>This is the form to add a word</h1>
        <div class="addword_inputs">
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
          <label for="category_select" class="category_select-label"
            >Category</label
          >
          <select
            v-model="select_category"
            class="category_select"
            name="select_category"
          >
            <option value="" disabled>Choose</option>
            <option>Animals</option>
            <option>Meals</option>
            <option>Objects</option>
            <option>Politeness</option>
          </select>
          <div class="radio">
            <input
              class="inputs_radio"
              type="radio"
              id="hotlist"
              v-model="addTo"
              value="Hotlist"
            />
            <label for="hotlist">@ Hotlist</label>
          </div>
          <div class="radio dictionary">
            <input
              class="inputs_radio"
              type="radio"
              id="dictionary"
              v-model="addTo"
              value="Dictionary"
            />
            <label for="dictionary">@ Dictionary</label>
          </div>
          <input
            v-on:click="fetchData()"
            class="inputs_button"
            type="submit"
            name="form_submit"
            v-bind:value="`Add this word to ${addTo}`"
          />
        </div>
      </div>
      <div class="addword_pre-inputs">
        <h3>{{ input_word }}</h3>
        <h2>{{ input_translation }}</h2>
        <h3>{{ input_nederlands }}</h3>
      </div>
      <div class="addword_error">{{ error }}</div>
      <div class="addword_close-form" v-on:click="openWordForm()">
        <span class="addword_close-span"></span>
        <span class="addword_close-span"></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Addword",
  data: function() {
    return {
      wordformopen: false,
      input_word: "",
      input_translation: "",
      input_nederlands: "",
      select_category: "",
      form_submit: "",
      addTo: "",
      error: ""
    };
  },
  computed: {
    inHotlist: function() {
      return this.addTo === "Hotlist";
    },
    inDictionary: function() {
      return this.addTo === "Dictionary";
    }
  },
  methods: {
    openWordForm() {
      this.wordformopen = !this.wordformopen;
    },
    async fetchData() {
      const addword = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json" //Just how it is ;)
          },
          body: JSON.stringify({
            word: this.input_word,
            translation: this.input_translation,
            nederlands: this.input_nederlands,
            hotlist: this.inHotlist,
            dictionary: this.inDictionary,
            category: this.select_category
          })
        }
      );
      const response = await addword.json();
      console.log(response);
      if (!response) {
        //If there is no responce there then we set an error and stop the method.
        this.error = "Fail!";
        return;
      }
      this.$store.dispatch("triggerMessage", response.message);
      if (this.$router.currentRoute.path === response.place) {
        //If there is no error, but the path from the API is the same as the one
        //the user is currently on, we just close the drawer and stop the method.
        this.openWordForm();
        this.$emit("fetchWordsAgain");
        return;
      }
      this.$router.push(response.place); //Otherwise this takes you to the correct page.
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .addword_btn {
    background-color: $light-blue;
    border-radius: 2px;
    box-shadow: 0 0 5px $shadow;

    .addword_span {
      background-color: white;
    }
    span:first-of-type {
      transform: rotate(90deg) translate(5px);
    }
    span:last-of-type {
      transform: translate(0px, -5px);
    }
    &.close {
      span:first-of-type {
        transform: rotate(135deg) translate(5px, -5px);
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-2.5px, -4px);
      }
    }
  }

  .addword_form-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0rem;
    left: -100%;
    z-index: 3;
    transition: left 0.2s ease-in;
    background-color: white;

    &.open {
      left: 0;
    }

    .addword_form {
      padding: 0.5rem;

      h1 {
        height: 50px;
      }

      .addword_inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;

        input {
          grid-column: 1/3;
        }
        .radio {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
        }
        .dictionary {
          justify-self: end;
        }
        .inputs_field {
          width: calc(100% - 1.2rem);
          padding: 0.8rem 0.5rem;
          border: 1px solid blue;
          border-radius: 2px;
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
        }
        .inputs_radio {
          -webkit-appearance: none;
          height: 25px;
          width: 25px;
          border: 1px solid blue;
        }
        .inputs_radio:checked {
          background-color: blue;
        }
        label {
          padding: 0rem 0.5rem;
          color: gray;
        }
        .inputs_button {
          padding: 0.8rem 0.5rem;
          font-weight: bold;
          color: white;
          border: 1px solid $purple;
          border-radius: 2px;
          background-color: $purple;
        }
      }
    }
    .addword_pre-inputs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 100%;
      gap: 0.5rem;
      padding: 0.5rem;

      h2,
      h3 {
        border: 1px solid blue;
        border-radius: 2px;
        height: auto;
        min-height: calc(50px - 1.6rem);
      }
    }
    .addword_pre-inputs > * {
      padding: 0.8rem 0.5rem;
    }
    .addword_error {
      color: red;
      padding: 0.8rem 0.5rem;
    }
    .addword_close-form {
      width: 50px;
      height: 50px;
      bottom: calc(50px + 2.5rem);
      right: 1.5rem;
      position: absolute;
      background-color: $light-blue;
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;

      .addword_close-span {
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
