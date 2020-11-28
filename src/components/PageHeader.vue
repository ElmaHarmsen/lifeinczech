<template>
  <div class="page_wrapper">
    <div v-if="!atLogin() && !atWhyDucky()" class="page_header-div">
      <img src="../assets/Ducky-3.png" alt="" />
      <h1 class="page_header-h1">
        {{ currentUser.username }}'s <br />
        Ducky
      </h1>
    </div>
    <div v-if="atLogin()" class="page_header-div">
      <img src="../assets/Ducky-3.png" alt="" />
      <h1 class="page_header-h1">
        Ducky <br />
        Dictionary
      </h1>
    </div>
    <div v-if="atWhyDucky()" class="page_header-div">
      <img src="../assets/Ducky-3.png" alt="" />
      <h1 class="page_header-h1">
        Why <br />
        Ducky?
      </h1>
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
  background-color: $background;
  position: fixed;
  top: 0rem;
  padding: 1rem 0rem 0.5rem 0rem;
  width: calc(100% - 2rem);

  .page_header-div {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: auto;
    background: linear-gradient(to right, #822792 0%, #f6b22b 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    img {
      width: 45px;
      height: auto;

      @include screen-is(lg) {
        position: relative;
        display: block;
        width: 60px;
        padding-bottom: 0.5rem;
      }
    }

    br {
      display: none;

      @include screen-is(lg) {
        display: block;
      }
    }

    .page_header-h1 {
      font-weight: bolder;
      font-size: 35px !important;

      @include screen-is(lg) {
        font-size: 45px !important;
        padding: 0rem;
      }
    }

    @include screen-is(lg) {
      flex-flow: column nowrap;
      justify-content: start;
      align-items: flex-start;
      width: auto;
      margin: 0rem 1rem;
    }
  }

  @include screen-is(lg) {
    width: auto;
    margin: 0rem auto;
  }
}
</style>
