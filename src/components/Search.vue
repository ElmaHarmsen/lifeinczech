<template>
  <section>
    <div class="search_input">
      <input type="text" placeholder="Search" />
      <div class="search_close" v-on:click="$emit('close-search')">
        <span class="search_close-span"></span>
        <span class="search_close-span"></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style lang="scss" scoped>
section {
  .search_btn {
    width: 50px;
    height: 50px;
    box-shadow: 0 0 5px $shadow;

    img {
      border-radius: 2px;
    }
  }

  .search_input {
    width: calc(100% - 1rem);
    // width: 100%;
    // height: calc(50px + 1rem);
    padding: 0.5rem 0rem;
    top: 0px;
    right: 0.5rem;
    position: fixed;
    z-index: 3;
    transition: top 0.2s ease-in;
    background-color: white;
    display: flex;
    flex-flow: row nowrap;

    input {
      width: calc(100% - 1rem - 50px);
      height: 48px;
      padding: 0rem 0.5rem;
      border: 1px solid blue;
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;
    }
    .search_close {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-content: center;
      width: 50px;
      height: 50px;
      background-color: blue;
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;

      .search_close-span {
        background-color: white;
      }
      span:first-of-type {
        transform: rotate(135deg) translate(5px, -5px);
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-2.5px, -4px);
      }
    }
  }
}
</style>
