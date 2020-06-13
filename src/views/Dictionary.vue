<template>
  <section>
    <Header />
    <div class="dictionary_content">
      <h1>This is the Dictionary CZ - EN</h1>
    </div>
    <Addword />
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Dictionary",
  components: {
    Header,
    Addword
  }
}
</script>

<style lang="scss" scoped>
section {
  .dictionary_content {
    margin: 50px 0rem;
  }
}
</style>