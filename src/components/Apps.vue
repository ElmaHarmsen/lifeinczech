<template>
  <section>
    <div v-on:click="openApps()" class="apps_btn">
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
    </div>
    <transition name="bounce" mode="out-in">
      <SearchField v-if="searchopen" v-on:close-search="toggleSearch()" />
    </transition>
    <transition name="bounce" mode="out-in">
      <FilterField v-if="filteropen" v-on:close-filter="toggleFilter()" />
    </transition>
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
              <!-- <img
                class="apps_search-icon"
                src="../assets/search-24px.svg"
                alt=""
              /> -->
              <svg
                class="apps_search-icon"
                height="50"
                viewBox="0 0 24 24"
                width="50"
                fill="white"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
            </div>
            <div class="apps_filter" v-on:click="toggleFilter()">
              <!-- <img
                class="apps_filter-icon"
                src="../assets/filter_alt-24px.svg"
                alt=""
              /> -->
              <svg
                class="apps_filter-icon"
                height="50"
                viewBox="0 0 24 24"
                width="50"
                fill="white"
              >
                <g>
                  <path d="M0,0h24 M24,24H0" fill="none" />
                  <path
                    d="M4.25,5.61C6.57,8.59,10,13,10,13v5c0,1.1,0.9,2,2,2h0c1.1,0,2-0.9,2-2v-5c0,0,3.43-4.41,5.75-7.39 C20.26,4.95,19.79,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"
                  />
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
              </svg>
            </div>
            <div class="apps_add">
              <transition name="component-fade" mode="out-in">
                <Addword v-on:fetch-words-again="$emit('fetch-words-again')" />
              </transition>
            </div>
          </div>
        </div>
        <router-link v-bind:to="'/login'" class="logout_link">
          <div class="apps_logout">
            <svg
              class="apps_logout-icon"
              height="50"
              viewBox="0 0 24 24"
              width="50"
              fill="white"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 3c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1zm5.14 2.86c-.39.39-.38 1-.01 1.39 1.13 1.2 1.83 2.8 1.87 4.57.09 3.83-3.08 7.13-6.91 7.17C8.18 19.05 5 15.9 5 12c0-1.84.71-3.51 1.87-4.76.37-.39.37-1-.01-1.38-.4-.4-1.05-.39-1.43.02C3.98 7.42 3.07 9.47 3 11.74c-.14 4.88 3.83 9.1 8.71 9.25 5.1.16 9.29-3.93 9.29-9 0-2.37-.92-4.51-2.42-6.11-.38-.41-1.04-.42-1.44-.02z"
              />
            </svg>
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
    width: 31%;
    bottom: 1.5rem;
    right: 0rem;
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
        background-color: $yellow;
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
    border-top: 4px solid $dark;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    padding: 1rem 0rem;
    height: auto;
    width: 100%;
    margin: 0rem 0rem 0rem -1rem;
    position: fixed;
    z-index: 2;
    right: unset;
    bottom: 0;

    &.bounce-enter-active,
    &.bounce-leave-active {
      transition: all 0.3s ease;
    }
    &.bounce-enter,
    &.bounce-leave-to {
      transform: translateY(100%);
    }
    &.bounce-enter-to {
      transform: translateY(0%);
    }

    @include screen-is(lg) {
      background-color: $background;
      width: 5%;
      height: calc(100% - 0px);
      position: fixed;
      right: 0;
      left: unset;
      bottom: unset;
      top: 0px;
      padding: 0;
      border-top-left-radius: 0;
      border-left: 4px solid $dark;
      border-right: none;
      border-top: none;
      display: flex;
      flex-flow: column;
      padding-bottom: unset;
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
        background-color: $blue;
        margin: 0.5rem auto;
      }
      .apps_add {
        width: 50px;
        height: 50px;
        margin: 0.5rem auto;
        background-color: $blue;
        border-radius: 2px;
        transition: 0.2s ease-in;
      }
      .apps_add:hover {
        background-color: $yellow;
      }
      .apps_search,
      .apps_filter,
      .apps_add,
      .navigation_items {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;

        svg {
          transition: 0.2s ease-in;
        }
        svg:hover {
          background-color: $yellow;
          fill: $white;
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
        background-color: $blue;
        margin: 0.5rem auto;

        svg {
          transition: 0.2s ease-in;
        }
        svg:hover {
          background-color: $yellow;
          fill: $white;
        }

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
      align-items: flex-end;
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

        &.router-link-exact-active {
          img {
            background-color: $yellow;
          }
        }
      }
    }
  }
  .navigation_item-img {
    width: 35px;
    height: 35px;
    padding: 0.5rem;
    background-color: $blue;
    border-radius: 2px;
    transition: all 0.2s;
  }
  .navigation_item-img:hover {
    background-color: $yellow;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
