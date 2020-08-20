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
        src="../assets/close-24px.svg"
        alt=""
      />
    </div>
    <SearchField v-if="searchopen" v-on:close-search="toggleSearch()" />
    <div class="apps_wrapper" v-bind:class="{ open: appsopen }">
      <div class="apps_search" v-on:click="toggleSearch">
        <img class="apps_search-icon" src="../assets/search-24px.svg" alt="" />
      </div>
      <div class="apps_filter">
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
  </section>
</template>

<script>
import SearchField from "@/components/SearchField.vue";
import Addword from "@/components/Addword.vue";

export default {
  name: "Apps",
  data: function() {
    return {
      appsopen: false,
      searchopen: false
    };
  },
  components: {
    SearchField,
    Addword
  },
  methods: {
    openApps() {
      this.appsopen = !this.appsopen;
    },
    async toggleSearch() {
      this.searchopen = !this.searchopen;
      if (this.searchopen) {
        await this.$nextTick(); //It waits for the querySelector (for the searchfield to exist)
        document.querySelector("#the-search").focus();
      }
      this.openApps();
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  .apps_btn {
    bottom: 0.5rem;
    right: 0.5rem;
    position: fixed;
    z-index: 2;

    .apps_btn-icon {
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;

      &.close {
        display: none;
      }
    }
    .apps_close_btn_icon {
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;
      background-color: $purple;
    }
  }
  .apps_wrapper {
    width: 50px;
    height: calc(150px + 3.5rem);
    position: fixed;
    z-index: 2;
    right: 0.5rem;
    bottom: calc(50px + 0.5rem);
    opacity: 0;
    transition: opacity 0.2s ease-in;

    &.open {
      opacity: 1;
    }
    .apps_filter-icon,
    .apps_search-icon {
      border-radius: 2px;
      box-shadow: 0 0 5px $shadow;
    }
  }
  .apps_wrapper > * {
    padding: 0.5rem 0rem;
  }
}
</style>
