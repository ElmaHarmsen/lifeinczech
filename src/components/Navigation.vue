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
          v-bind:class="{ active: navitem.item === activeLink }"
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
  props: ["activeLink"],
  data: function() {
    return {
      navopen: false,
      navItems: [
        {
          id: 0,
          item: "Hotlist",
          path: "/"
        },
        {
          id: 1,
          item: "Dictionary",
          path: "/dictionary"
        },
        {
          id: 2,
          item: "Logout",
          path: "/login"
        }
      ]
    };
  },
  methods: {
    openNav() {
      this.navopen = !this.navopen;
      document
        .querySelectorAll(".word_wrapper")
        .forEach(word => word.classList.toggle("word_blurred"));
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .navigation_menu {
    top: 1.5rem;
    left: 1.5rem;
    position: absolute;
    z-index: 2;
    background-color: transparent;
    border-radius: 2px;

    @include screen-is(lg) {
      display: none;
    }

    .navigation_span {
      background-color: #e6e6e6;
    }
    &.close {
      background-color: transparent;
      transition: background-color 0.2s ease-out;

      span:first-of-type {
        transform: rotate(-45deg) translate(-6px, 6px);
      }
      span:nth-of-type(2) {
        opacity: 0;
      }
      span:last-of-type {
        transform: rotate(45deg) translate(-8px, -8px);
      }
    }
  }
  .navigation_items-wrapper {
    width: calc(100% - 1rem);
    height: 20%;
    position: fixed;
    top: calc(50px + 1rem);
    left: 0.5rem;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.2s ease-in;
    background-color: $light-blue;
    border-radius: 20px;
    border-bottom: 4px solid $shadow;

    @include screen-is(lg) {
      width: calc(55% - 50px - 1rem);
      height: 50px;
      top: 0.5rem;
      left: unset;
      margin-left: calc(50% + 50px + 1rem);
      transform: translateX(calc(-50% - 50px + 1rem));
      border-radius: 2px;
      border-right: none;
    }

    &.open {
      opacity: 1; //still visible (also apps)
      //No scrolling allowed
    }
    .navigation_items {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      padding: 0rem 1rem;

      @include screen-is(lg) {
        width: 100%;
        top: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
      }

      h1 {
        // padding: 0rem 0rem 1.5rem 0rem;
        color: $shadow;
        font-weight: bold;

        @include screen-is(lg) {
          padding: 0rem 1rem;
        }
      }
      .navigation_one-item.active h1 {
        color: white;
      }
    }
  }
}
</style>
