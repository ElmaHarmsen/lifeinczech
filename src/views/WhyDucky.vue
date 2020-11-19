<template>
  <section>
    <div class="page_header">
      <!-- <Navigation v-bind:activeLink="$options.name" /> -->
      <div class="page_header-title">
        <img class="page_header-img" src="../assets/Ducky-3.png" alt="" />
        <h1>
          Why Ducky?
        </h1>
      </div>
    </div>
    <div class="whyducky_content">
      <div>
        <h2>
          You might find yourself in a situation where you're slightly unknown
          to the local language. Now you want to participate in a conversation
          but you're missing just the right words. You most likely don't want to
          interrupt someone with your "stupid question".
        </h2>
        <br />
        <h2>
          Luckily for you, Ducky the answer to your question! Collect here words
          you repeatedly need in your Ducky Dictionary, and for quick access
          store them in the homescreen Homelist. Add this progressive web app to
          the homescreen of your phone, and... kapow! No more "stupid questions"
          and before you know it you've mastered the language : )
        </h2>
        <br />
        <h2>Therefore remember, ask Ducky.</h2>
      </div>
      <img class="bigducky" src="../assets/SmallDucky.png" alt="" />
    </div>
    <Apps v-on:fetch-words-again="fetchData()" />
    <img src="../assets/Ducky-3.png" alt="" class="big-duck" />
  </section>
</template>

<script>
import Apps from "@/components/Apps.vue";

export default {
  name: "WhyDucky",
  components: {
    Apps
  }
};
</script>

<style lang="scss" scoped>
.whyducky_content {
  img {
    display: none;
  }
  @include screen-is(lg) {
    img {
      width: 100%;
      margin-left: -30%;
      opacity: 0.1;
      filter: grayscale(90%);
    }
  }
}
.big-duck {
  display: none;

  @include screen-is(lg) {
    display: block;
    position: absolute;
    z-index: -1;
    margin-top: -25%;
    margin-left: 40%;
    transform: scale(1.5);
    opacity: 0.2;
    width: auto;
  }
}
</style>
