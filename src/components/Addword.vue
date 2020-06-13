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
          <input
            placeholder="Czech"
          >
          <input
            placeholder="English"
          >
          <input
            placeholder="Pronunciation"
          >
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
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 5;
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
    }
    span:last-of-type {
      transform: translate(0px, -5px);
    }
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

      .addword_inputs {

        input {
          margin: 0.5rem 0rem;
          padding: 0.8rem 0.5rem;
        }
      }
    }
  }
}
</style>