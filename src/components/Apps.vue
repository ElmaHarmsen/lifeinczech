<template>
  <section>
    <div v-on:click="openApps()" class="apps_btn">
      <img
        v-bind:class="{ close: appsopen }"
        class="apps_btn-icon"
        src="../assets/apps-24px.svg"
        alt=""
      />
      <img
        class="apps_close_btn_icon"
        v-if="appsopen"
        src="../assets/close-24px-orange.svg"
        alt=""
      />
    </div>
    <SearchField v-if="searchopen" v-on:close-search="toggleSearch()" />
    <FilterField v-if="filteropen" v-on:close-filter="toggleFilter()" />
    <div class="apps_wrapper" v-bind:class="{ open: appsopen }">
      <div class="navigation_items-wrapper">
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
          <!-- <div class="apps_menu">
            <img class="apps_menu-icon" src="../assets/menu-24px.svg" alt="">
          </div> -->
        </div>
      </div>
      <router-link v-bind:to="'/login'">
        <div class="apps_logout">
          <h1>Logout</h1>
          <img
            class="apps_logout-icon"
            src="../assets/power_settings_new-24px.svg"
            alt=""
          />
        </div>
      </router-link>
      <div class="apps_search" v-on:click="toggleSearch()">
        <h1>Search</h1>
        <img class="apps_search-icon" src="../assets/search-24px.svg" alt="" />
      </div>
      <div class="apps_filter" v-on:click="toggleFilter()">
        <h1>Filter</h1>
        <img
          class="apps_filter-icon"
          src="../assets/filter_alt-24px.svg"
          alt=""
        />
      </div>
      <div class="apps_add">
        <h1>Add</h1>
        <Addword v-on:fetch-words-again="$emit('fetch-words-again')" />
      </div>
    </div>
  </section>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import FilterField from "@/components/FilterField.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Apps",
  props: ["activeLink"],
  data: function() {
    return {
      appsopen: false,
      searchopen: false,
      filteropen: false,
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
        }
        // {
        //   id: 2,
        //   item: "Why Ducky?",
        //   path: "/whyducky"
        // }
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
    bottom: 1rem;
    right: 1rem;
    position: fixed;
    z-index: 2;

    @include screen-is(lg) {
      bottom: unset;
      top: 1rem;
      right: 22.5%;
    }

    .apps_btn-icon {
      border-radius: 2px;

      &.close {
        display: none;
      }
    }
    .apps_close_btn_icon {
      border-radius: 2px;
      background-color: transparent;
    }
  }
  // .apps_everything {
  //   background-color: sandybrown;
  //   position: absolute;
  //   z-index: 1;
  // }
  .apps_wrapper {
    width: auto;
    height: calc(200px + 4.5rem);
    position: fixed;
    z-index: 2;
    right: 1rem;
    bottom: calc(50px + 1rem);
    opacity: 0;
    transition: opacity 0.2s ease-in;

    &.open {
      opacity: 1;
    }

    @include screen-is(lg) {
      bottom: unset;
      top: calc(50px + 1rem);
      right: 22.5%;
    }
    .apps_menu-icon,
    .apps_logout-icon,
    .apps_filter-icon,
    .apps_search-icon,
    .apps_add-icon {
      border-radius: 2px;
      background-color: #16345c;
    }
    .navigation_items-wrapper {
      width: auto;
      position: fixed;
      z-index: 2;
      right: calc(50px + 1rem);
      bottom: 1rem;
      padding: 0rem 1rem;

      .navigation_items {
        height: 50px;
        text-align: right;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .navigation_one-item {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          h1 {
            // margin: 0rem 0.5rem;
            margin-left: 1rem;
          }
        }
      }
    }
  }
  .apps_logout,
  .apps_search,
  .apps_filter,
  .apps_add {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    h1 {
      padding-right: 1rem;
      text-align: right;
    }
  }
  .apps_logout,
  .apps_wrapper > * {
    padding: 0.5rem 0rem;
  }
}
</style>
