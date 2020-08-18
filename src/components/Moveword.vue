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
        <h1>This is the form to move a word</h1>
        <div class="moveword_pre-inputs">
          <h3>{{ movingWord.word }}</h3>
          <h3>{{ movingWord.translation }}</h3>
          <h3>{{ movingWord.nederlands }}</h3>
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
        <span class="moveword_close-span"></span>
        <span class="moveword_close-span"></span>
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
      box-shadow: 0 0 5px $shadow;
    }
  }

  .moveword_form-wrapper {
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

    .moveword_form {
      padding: 0.5rem;

      h1 {
        height: 50px;
      }
      .moveword_pre-inputs {
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
      .moveword_pre-inputs > * {
        padding: 0.8rem 0.5rem;
      }

      .moveword_inputs {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 1.5rem 0rem;

        .radio {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
        }
        .inputs_radio {
          -webkit-appearance: none;
          height: 25px;
          width: 25px;
          border: 1px solid blue;
          border-radius: 2px;

          &:focus {
            box-shadow: 0 0 5px $shadow;
          }
        }
        .inputs_radio:checked {
          background-color: blue;
        }
        label {
          padding: 0rem 0.5rem;
          color: gray;
        }
      }
    }
    .moveword_close {
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

      .moveword_close-span {
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
