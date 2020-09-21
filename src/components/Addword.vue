<template>
  <section>
    <div
      v-on:click="openWordForm()"
      class="addword_btn"
      v-bind:class="{ close: wordformopen }"
    >
      <img src="../assets/add-24px.svg" alt="" />
    </div>
    <div class="addword_form-wrapper" v-bind:class="{ open: wordformopen }">
      <div class="addword_form">
        <h1>Add a word</h1>
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
          <div class="addword_pre-inputs">
            <h2>{{ input_word }}</h2>
            <h2>{{ input_translation }}</h2>
            <h2>{{ input_nederlands }}</h2>
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
      <div class="addword_error">{{ error }}</div>
      <div class="addword_close" v-on:click="openWordForm()">
        <img src="../assets/close-24px.svg" alt="" />
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
        this.$emit("fetch-words-again");
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
    background-color: $purple;
    border-radius: 2px;
  }
  .addword_form-wrapper {
    z-index: 3;

    .addword_pre-inputs > * {
      padding: 0.8rem 0.5rem;
    }
    .inputs_button {
      background-color: $light-blue;
    }
  }
  .addword_error {
    color: red;
    padding: 0.8rem 0.5rem;
  }
}
</style>
