<template>
  <section>
    <div class="language_wrapper">
      <h1>
        <img
          class="language_images"
          src="../assets/czech-republic.svg"
          alt=""
        />
        :
      </h1>
      <h1>
        <img
          class="language_images"
          src="../assets/united-kingdom.svg"
          alt=""
        />
        :
      </h1>
      <h1>
        <img class="language_images" src="../assets/netherlands.svg" alt="" /> :
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
    padding-left: 0.5rem;

    .language_images {
      width: 35px;
      height: auto;
      padding: 0.8rem 0rem;

      @include screen-is(lg) {
        width: 45px;
      }
    }
  }
  .language_wrapper > * {
    padding: 0rem 0.5rem;
  }
}
</style>
