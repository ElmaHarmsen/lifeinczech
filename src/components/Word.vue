<template>
  <section>
    <div class="word_wrapper">
      <h3>{{ wordData.word }}</h3>
      <h2>{{ wordData.translation}}</h2>
      <h3>{{ wordData.pronunciation}}</h3>
    </div>
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
    gap: 0.5rem;
    margin: 1.5rem 0rem;
    width: 100%;

    h2, h3 {
      border: 1px solid blue;
      height: auto;
    }
  }
  .word_wrapper > * {
    padding: 0.8rem 0.5rem;
  }
}
</style>