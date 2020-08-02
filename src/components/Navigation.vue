<template>
  <section>
    <div
      v-on:click="openNav()"
      class="navigation_menu"
      v-bind:class="{ close: navopen }"
    >
      <span class="navigation_span"></span>
      <span class="navigation_span"></span>
      <span class="navigation_span"></span>
    </div>
    <div class="navigation_items-wrapper" v-bind:class="{ open: navopen }">
      <div class="navigation_items">
        <router-link
          class="navigation_one-item"
          v-bind:to="navitem.path"
          v-for="navitem in navItems"
          v-bind:key="navitem.id"
        >
          <h1>
            {{ navitem.item }}
          </h1>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Navigation",
  props: ["navItem"],
  data: function() {
    return {
      navopen: false,
      navItems: [
        {
          id: 0,
          item: "Hotlist", //Home
          path: "/"
        },
        {
          id: 1,
          item: "Dictionary CZ-EN-NL",
          path: "/dictionary"
        }
      ]
    };
  },
  computed: {
    navigationItemLimit: function() {
      let item = this.navItem.item;
      let length = 10;
      let limitedItem = item.substring(0, length);
      if (item.length > 10) {
        limitedItem += <br></br>;
      }
      return limitedItem;
    }
  },
  methods: {
    openNav() {
      this.navopen = !this.navopen;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .navigation_menu {
    top: 0.5rem;
    left: 0.5rem;
    position: fixed;
    z-index: 2;
    background-color: white;
    border: 1px solid blue;
    border-radius: 2px;
    box-shadow: 0 0 5px $shadow;

    .navigation_span {
      background-color: blue;
    }
    &.close {
      background-color: blue;
      border: 1px solid blue;
      transition: background-color .2s ease-out;

      span:first-of-type {
        transform: rotate(-45deg) translate(-8px, 6px);
        background-color: white;
      }
      span:nth-of-type(2) {
        opacity: 0;
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-8px, -8px);
        background-color: white;
      }
    }
  }
  .header_page-title {
    height: 50px;
  }
  .navigation_items-wrapper {
    width: 70%;
    height: 100%;
    position: fixed;
    top: 0rem;
    left: -75%;
    z-index: 1;
    transition: left 0.2s ease-in;
    background-color: $light-blue;
    box-shadow: 10px 0 5px -5px $shadow;

    &.open {
      left: 0;
    }

    .navigation_items {
      position: relative;
      top: 100px;
      padding: 0.5rem;

      h1 {
        padding: 0rem 0rem 1.5rem 0rem;
        color: white;
      }
    }
  }
}
</style>
