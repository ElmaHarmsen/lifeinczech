<template>
  <section>
    <div
      v-on:click="openMoveWordForm()"
      class="moveword_btn"
      v-bind:class="{ close: movewordformopen }"
    >
      <img src="../assets/open_with-24px.svg" class="moveword_move" />
    </div>
    <div
      class="moveword_form-wrapper"
      v-bind:class="{ open: movewordformopen }"
    >
      <div class="moveword_form">
        <h1>Move this word</h1>
        <div class="moveword_pre-inputs">
          <h2>{{ movingWord.word }}</h2>
          <h2>{{ movingWord.translation }}</h2>
          <h2>{{ movingWord.nederlands }}</h2>
        </div>
        <div class="moveword_inputs">
          <div class="radio">
            <input
              class="inputs_radio"
              type="radio"
              id="hotlist"
              v-model="moveTo"
              value="Hotlist"
            />
            <label for="hotlist">@ Hotlist</label>
          </div>
          <div class="radio dictionary">
            <input
              class="inputs_radio"
              type="radio"
              id="dictionary"
              v-model="moveTo"
              value="Dictionary"
            />
            <label for="dictionary">@ Dictionary</label>
          </div>
        </div>
        <input
          v-on:click="moveWord(movingWord._id), openMoveWordForm()"
          class="inputs_button"
          type="submit"
          name="form_submit"
          v-bind:value="`Move this word to ${moveTo}`"
        />
      </div>
      <div class="moveword_close" v-on:click="openMoveWordForm()">
        <img src="../assets/close-24px.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Moveword",
  props: ["movingWord"],
  data: function() {
    return {
      movewordformopen: false,
      form_submit: "",
      moveTo: ""
    };
  },
  methods: {
    openMoveWordForm() {
      this.movewordformopen = !this.movewordformopen;
    },
    async moveWord(id) {
      const moveWord = await fetch(
        "https://dictionary--api.herokuapp.com/api/dictionarycz",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id,
            newPlace: this.moveTo
            //Here we pass in the place of the word to this body.
          })
        }
      );
      const response = await moveWord.text();
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
  .moveword_btn {
    .moveword_move {
      border-radius: 2px;
    }
  }
  .moveword_form-wrapper {
    z-index: 5;

    .moveword_pre-inputs > * {
      padding: 0.8rem 0.5rem;
    }
    .inputs_button {
      background-color: $light-blue;
    }
  }
}
</style>
