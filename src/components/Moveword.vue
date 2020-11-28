<template>
  <section>
    <div @click="toggleWordForm()" class="moveword_btn">
      <svg
        class="moveword_move"
        height="50"
        viewBox="0 0 24 24"
        width="50"
        fill="#822792"
      >
        <path d="M0 0h24v24H0V0z" fill="#f6b22b" />
        <path
          d="M10.5 9h3c.28 0 .5-.22.5-.5V6h1.79c.45 0 .67-.54.35-.85l-3.79-3.79c-.2-.2-.51-.2-.71 0L7.85 5.15c-.31.31-.09.85.36.85H10v2.5c0 .28.22.5.5.5zm-2 1H6V8.21c0-.45-.54-.67-.85-.35l-3.79 3.79c-.2.2-.2.51 0 .71l3.79 3.79c.31.31.85.09.85-.36V14h2.5c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zm14.15 1.65l-3.79-3.79c-.32-.32-.86-.1-.86.35V10h-2.5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5H18v1.79c0 .45.54.67.85.35l3.79-3.79c.2-.19.2-.51.01-.7zM13.5 15h-3c-.28 0-.5.22-.5.5V18H8.21c-.45 0-.67.54-.35.85l3.79 3.79c.2.2.51.2.71 0l3.79-3.79c.31-.31.09-.85-.35-.85H14v-2.5c0-.28-.22-.5-.5-.5z"
        />
      </svg>
      <h1>Move</h1>
    </div>
    <div class="moveword_form-wrapper" v-show="wordFormOpened">
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
      wordFormOpened: false,
      form_submit: "",
      moveTo: ""
    };
  },
  methods: {
    toggleWordForm() {
      this.wordFormOpened = !this.wordFormOpened;
    },
    close() {
      this.wordFormOpened = false;
    },
    async moveWord(id) {
      const moveWord = await fetch(
        `${process.env.VUE_APP_API_URL}/dictionarycz`,
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
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    svg {
      border-radius: 2px;
      transition: 0.2s ease-in;
    }
    svg:hover {
      fill: $paars;
    }

    h1 {
      padding: 0rem 1.5rem;
    }
  }
  .moveword_form-wrapper {
    z-index: 5;

    .moveword_pre-inputs > * {
      padding: 0.8rem 0.5rem;
    }
    .inputs_button {
      background-color: $light-blue;
      color: $paars;
    }
  }
}
</style>
