<template>
  <div class="page_wrapper">
    <div v-if="!atLogin() && !atWhyDucky()" class="page_header-div">
      <img src="../assets/Ducky-3.png" alt="" />
      <h1 class="page_header-h1">{{ currentUser.username }}'s</h1>
      <h1 class="page_header-h1">Ducky</h1>
    </div>
    <div v-if="atLogin()" class="page_header-div">
      <h1 class="page_header-h1">Ducky</h1>
      <!-- <img src="../assets/Ducky-3.png" alt="" /> -->
      <h1 class="page_header-h1">Dictionary</h1>
    </div>
    <div v-if="atWhyDucky()" class="page_header-div">
      <h1 class="page_header-h1">Why</h1>
      <!-- <img src="../assets/Ducky-3.png" alt="" /> -->
      <h1 class="page_header-h1">Ducky?</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PageHeader",
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    atLogin() {
      return this.$route.name === "Login";
    },
    atWhyDucky() {
      return this.$route.name === "WhyDucky";
    }
  }
};
</script>

<style lang="scss" scoped>
.page_wrapper {
  position: fixed;
  top: 1rem;
  width: 100%;

  div {
    img {
      width: 45px;
      height: auto;
      position: absolute;
      top: 0rem;
      left: 0rem;

      @include screen-is(lg) {
        position: relative;
        display: block;
        width: 60px;
        padding-bottom: 0.5rem;
      }
    }
  }

  .page_header-div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: calc(100% - 2rem);
    background: linear-gradient(to right, #822792 0%, #f6b22b 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    .page_header-h1 {
      font-weight: bolder;
      font-size: 40px !important;
      padding: 0rem 0.3rem;
      height: 45px;

      @include screen-is(lg) {
        font-size: 55px !important;
        padding: 0rem;
        height: 60px;
      }
    }

    @include screen-is(lg) {
      flex-flow: column nowrap;
      margin: 0rem 1rem;
    }
  }

  @include screen-is(lg) {
    width: 25%;
    margin: 0rem auto;
  }
}
</style>
