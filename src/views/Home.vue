<template>
  <section id="home">
    <Header />
    <Word />
    <Addword />
  </section>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Word from "@/components/Word.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Home",
  //Home is the same as Hotlist
  components: {
    Header,
    Word,
    Addword
  }
};
</script>

<!-- the components:
- navigation
- title next to navigation menu
- the 3 boxes with the word, translation and pronounciation
- above this the 1st language, 2nd language and " "
- button to add word to a list
- form to add a word to the list
-->

<!-- some things:
- the home page is similar to the collection page in the lego shop
- the list is also similar to this; with "submit" you add it to a "collection" of words already there
-->