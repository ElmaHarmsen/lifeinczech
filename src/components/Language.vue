<template>
  <section>
    <div class="language_wrapper">
      <h1>CZ</h1>
      <h1>EN</h1>
      <h1>" "</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "Language"
}
</script>

<style lang="scss" scoped>
section {
  .language_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100%;
    gap: 0.5rem;
  }
  .language_wrapper > * {
    padding: 0rem 0.5rem;
  }
}
</style>