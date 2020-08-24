<template>
  <section>
    <div class="language_wrapper">
      <h1>
        <img class="language_images" src="../assets/czech-flag.svg" alt="" /> :
      </h1>
      <h1>
        <img class="language_images" src="../assets/english-flag.svg" alt="" />
        :
      </h1>
      <h1>
        <img class="language_images" src="../assets/dutch-flag.svg" alt="" /> :
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "Language"
};
</script>

<style lang="scss" scoped>
section {
  .language_wrapper {
    display: flex;
    flex-flow: column wrap;

    .language_images {
      width: 40px;
      height: 24px;
      border-radius: 2px;
      padding: 0.8rem 0rem;

      @include screen-is(lg) {
        width: 44px;
        height: 28px;
      }
    }
  }
  .language_wrapper > * {
    padding: 0rem 0.5rem;
  }
}
</style>
