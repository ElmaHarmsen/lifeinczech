<template>
  <section>
    <div v-on:click="openApps()" class="apps_btn">
      <!-- <img
        v-bind:class="{ close: appsopen }"
        class="apps_btn-icon"
        src="../assets/apps-24px.svg"
        alt=""
      /> -->
      <div class="apps_btn-grid" v-bind:class="{ close: appsopen }">
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
        <span class="apps_btn-span"></span>
      </div>
      <img
        class="apps_close_btn_icon"
        v-if="appsopen"
        src="../assets/close-24px-orange.svg"
        alt=""
      />
    </div>
    <transition name="bounce">
      <SearchField v-if="searchopen" v-on:close-search="toggleSearch()" />
    </transition>
    <FilterField v-if="filteropen" v-on:close-filter="toggleFilter()" />
    <transition name="bounce">
      <div class="apps_wrapper" v-if="appsopen || $mq === 'desktop'">
        <div class="navigation_items-wrapper">
          <div class="navigation_items">
            <router-link
              class="navigation_one-item"
              v-bind:to="navitem.path"
              v-for="navitem in navItems"
              v-bind:key="navitem.id"
            >
              <img
                v-bind:src="require(`@/assets/${navitem.img}`)"
                class="navigation_item-img"
                alt=""
              />
            </router-link>
          </div>
        </div>
        <span class="line"></span>
        <div class="apps_functionalities-wrapper">
          <div>
            <div class="apps_search" v-on:click="toggleSearch()">
              <img
                class="apps_search-icon"
                src="../assets/search-24px.svg"
                alt=""
              />
            </div>
            <div class="apps_filter" v-on:click="toggleFilter()">
              <img
                class="apps_filter-icon"
                src="../assets/filter_alt-24px.svg"
                alt=""
              />
            </div>
            <div class="apps_add">
              <Addword v-on:fetch-words-again="$emit('fetch-words-again')" />
            </div>
          </div>
        </div>
        <router-link v-bind:to="'/login'" class="logout_link">
          <div class="apps_logout">
            <img
              class="apps_logout-icon"
              src="../assets/power_settings_new-24px.svg"
              alt=""
            />
          </div>
        </router-link>
      </div>
    </transition>
  </section>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import FilterField from "@/components/FilterField.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Apps",
  data: function() {
    return {
      appsopen: false,
      searchopen: false,
      filteropen: false,
      navopen: false,
      navItems: [
        {
          id: 0,
          item: "Homelist",
          img: "home.svg",
          path: "/"
        },
        {
          id: 1,
          item: "Dictionary",
          img: "dictionary.svg",
          path: "/dictionary"
        },
        {
          id: 2,
          item: "Why Ducky?",
          img: "question.svg",
          path: "/whyducky"
        }
      ]
    };
  },
  components: {
    SearchField,
    FilterField,
    Addword
  },
  methods: {
    openApps() {
      this.appsopen = !this.appsopen;
      document
        .querySelectorAll(".word_wrapper")
        .forEach(word => word.classList.toggle("word_blurred"));
      // var body = document.body;
      // body.classList.toggle("background_with-opacity");
    },
    async toggleSearch() {
      this.searchopen = !this.searchopen;
      if (this.searchopen) {
        await this.$nextTick(); //It waits for the querySelector (for the searchfield to exist)
        document.querySelector("#the-search").focus();
      }
      this.openApps();
    },
    async toggleFilter() {
      this.filteropen = !this.filteropen;
      if (this.filteropen) {
        await this.$nextTick();
        document.querySelector("#the-filter").focus();
      }
      this.openApps();
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .apps_btn {
    width: calc(30% - 0.3rem);
    bottom: 1.5rem;
    right: 1.25rem;
    position: fixed;
    z-index: 3;
    text-align: center;

    .apps_btn-grid {
      display: grid;
      grid-template-columns: 0.7rem 0.7rem 0.7rem;
      grid-template-rows: 0.7rem 0.7rem 0.7rem;
      gap: 0.4rem;
      justify-items: center;
      width: 3.3rem;
      height: 3.3rem;
      margin: 0rem auto;

      .apps_btn-span {
        display: block;
        width: 0.7rem;
        height: 0.7rem;
        background-color: white;
        margin: 0rem;
        border-radius: 2px;
      }
    }

    .apps_btn-grid {
      border-radius: 2px;

      span {
        transition: all 0.2s ease-in;
      }

      &.close {
        span:nth-of-type(8) {
          transition: all 0.2s ease-in;
          opacity: 0;
        }
        span:nth-of-type(2) {
          transition: all 0.2s ease-in;
          opacity: 0;
        }
        span:nth-of-type(6) {
          transition: all 0.2s ease-in;
          opacity: 0;
        }
        span:nth-of-type(4) {
          transition: all 0.2s ease-in;
          opacity: 0;
        }
        span {
          transform: rotate(135deg);
        }
      }
    }

    @include screen-is(lg) {
      display: none;
    }
    .apps_close_btn_icon {
      display: none;
      background-color: transparent;
    }
  }
  .apps_wrapper {
    background-color: $background;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: 4px solid $shadow;
    border-bottom: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    padding: 1rem 0rem;
    height: auto;
    width: calc(100% - 2rem - 8px);
    margin: 0rem auto;
    position: fixed;
    z-index: 2;
    right: unset;
    bottom: 0;

    &.bounce-enter-active,
    &.bounce-leave-active {
      transition: all 0.3s ease;
    }
    &.bounce-enter, &.bounce-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
      transform: translateY(100%);
    }
    &.bounce-enter-to {
      transform: translateY(0%);
    }

    @include screen-is(lg) {
      background-color: $background;
      width: 5%;
      height: calc(100% - 8px);
      position: fixed;
      right: 0;
      left: unset;
      bottom: unset;
      top: 0px;
      padding: 0;
      border: 4px solid $shadow;
      border-right: none;
      display: flex;
      flex-flow: column;
      border-top-right-radius: unset;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      padding-bottom: unset;

      &.bounce-enter-active,
      &.bounce-leave-active {
        transition: all 0.3s ease;
      }
      &.bounce-enter, &.bounce-leave-to
      /* .component-fade-leave-active below version 2.1.8 */ {
        transform: translateX(100%);
      }
      &.bounce-enter-to {
        transform: translateX(0);
      }
    }
    .apps_functionalities-wrapper {
      @include screen-is(lg) {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        height: 100%;
      }

      .apps_menu-icon,
      .apps_filter-icon,
      .apps_search-icon,
      .apps_add-icon {
        border-radius: 2px;
        background-color: $purple;
        margin: 0.5rem auto;
      }
      .apps_add {
        width: 50px;
        height: 50px;
        margin: 0.5rem auto;
        background-color: $purple;
        border-radius: 2px;
      }
      .apps_search,
      .apps_filter,
      .apps_add,
      .navigation_items {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;

        h1 {
          padding-right: 1rem;
          text-align: right;
        }
      }
      .apps_wrapper > * {
        padding: 0.5rem 1rem;
      }
    }
    .logout_link {
      margin: 0rem auto;

      .apps_logout {
        border-radius: 2px;
        background-color: $purple;
        margin: 0.5rem auto;

        @include screen-is(lg) {
          margin: 1rem auto;
        }
      }
    }
  }
  .navigation_items-wrapper {
    .navigation_items {
      display: flex;
      flex-flow: column;
      align-items: end;
      margin: 0rem auto;

      @include screen-is(lg) {
        margin: 0.5rem auto;
      }

      .navigation_one-item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0.5rem 0rem;
        margin: 0rem auto;

        &.router-link-exact-active img {
          background-color: $light-blue;
        }
      }
    }
  }
  .navigation_item-img {
    width: 35px;
    height: 35px;
    padding: 0.5rem;
    background-color: $purple;
    border-radius: 2px;
  }
}
</style>
