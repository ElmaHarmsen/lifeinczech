<template>
  <section>
    <div v-on:click="openWordForm()" class="addword_btn" v-bind:class="{ close: wordformopen}">
      <span class="addword_span"></span>
      <span class="addword_span"></span>
    </div>
    <div class="addword_form-wrapper" v-bind:class="{ open: wordformopen }">
      <div class="addword_form">
        <h1>This is the form to add a word</h1>
        <div class="addword_inputs">
          <input class="inputs_field" placeholder="Czech">
          <input class="inputs_field" placeholder="English">
          <input class="inputs_field" placeholder="Pronunciation">
          <div>
            <input class="inputs_radio" type="radio" id="hotlist" value="0">
            <label for="hotlist">@ Hotlist</label>
          </div>
          <div>
            <input class="inputs_radio" type="radio" id="dictionary" value="1">
            <label for="dictionary">@ Dictionary</label>
          </div>
          <input class="inputs_button" type="submit" value="Add Word">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Addword",
  data: function() {
    return {
      wordformopen: false
    }
  },
  methods: {
    openWordForm() {
      this.wordformopen = !this.wordformopen;
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  .addword_btn {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 5;
    transition: transform 0.2s;
    background-color: blue;
    border: 1px solid blue;

    .addword_span {
      display: block;
      height: 1px;
      width: 40px;
      margin: 0.3rem 0rem;
      background-color: white;
    }
    span:first-of-type {
      transform: rotate(90deg) translate(5px);
      transition: transform 0.2s;
    }
    span:last-of-type {
      transform: translate(0px, -5px);
      transition: transform 0.2s;
    }

    &.close {
      span:first-of-type {
        transform: rotate(135deg) translate(5px, -5px);
        transition: transform 0.2s;
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-2.5px, -5px);
        transition: transform 0.2s;
      }
    }
  }
  
  .addword_btn:active {
    transform: scale(1.7);
  }

  .addword_form-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0rem;
    left: -100%;
    z-index: 4;
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
        grid-template-rows: repeat(5, 100%);
        gap: 1.5rem;
        margin-top: 50px;

        input {
          grid-column: 1/3;
        }
        .inputs_field {
          width: calc(100% - 1.2rem);
          padding: 0.8rem 0.5rem;
          border: 1px solid blue;
        }
        .inputs_radio {
          -webkit-appearance: none;
          padding: 10px;
          border: 1px solid blue;
        }
        .inputs_radio:checked {
          background-color: blue;
        }
        label {
          padding: 0rem 0.5rem;
          color: gray;
        }
        label:checked {
          color: blue;
        }
        .inputs_button {
          padding: 0.8rem 0.5rem;
          font-weight: bold;
          color: white;
          border: 1px solid blue;
          background-color: blue;
        }
      }
    }
  }
}
</style>