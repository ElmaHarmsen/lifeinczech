<template>
  <div class="page_wrapper">
    <div v-if="!atLogin() && !atWhyDucky()" class="page_header-div">
      <img src="../assets/Ducky-3.png" alt="" />
    </div>
    <!-- <div v-if="!atLogin() && !atWhyDucky()" class="page_header-div">
      <img src="../assets/Ducky-3.png" alt="" />
      <h1 class="page_header-h1">
        {{ currentUser.username }}'s <br />
        Ducky
      </h1>
    </div> -->
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
