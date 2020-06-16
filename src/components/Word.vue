<template>
  <section>
    <div class="word_wrapper">
      <h3>{{ wordData.word }}</h3>
      <h2>{{ wordData.translation}}</h2>
      <h3>{{ wordData.pronunciation}}</h3>
    </div>
    <!-- <div class="word_wrapper">
      <h3>Ano</h3>
      <h2>Yes</h2>
      <h3>Ah-no</h3>
    </div>
    <div class="word_wrapper">
      <h3>Ne</h3>
      <h2>No</h2>
      <h3>Neh</h3>
    </div>
    <div class="word_wrapper">
      <h3>Dobře</h3>
      <h2>Okay</h2>
      <h3>Dobrzheh...</h3>
    </div> -->
  </section>
</template>

<script>
export default {
  name: "Word",
  props: ["wordData"]
}
</script>

<style lang="scss" scoped>
section {
  .word_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100%;
    gap: 1rem;
    margin: 1.5rem 0rem;
    width: 100%;

    h2, h3 {
      border: 1px solid blue;
    }
  }
  .word_wrapper > * {
    padding: 0.8rem 0.5rem;
  }
}
</style>