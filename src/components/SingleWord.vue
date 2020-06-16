<template>
  <section>
      <div class="word_wrapper">
        <h3>{{ singleWordData.word }}</h3>
        <h2>{{ singleWordData.translation}}</h2>
        <h3>{{ singleWordData.pronunciation}}</h3>
      </div>
  </section>
</template>

<script>
export default {
  name: "SingleWord",
  props: ["singleWordData"]
}
</script>