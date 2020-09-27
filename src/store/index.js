import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMessageOpen: false, //By default the message is not open.
    messageText: "", //By default the message text is empty.
    currentUser: null, //By default there is no user data yet, but there will be more
    validSession: false
  },
  mutations: {
    toggleMessage(state, isOpen) {
      state.isMessageOpen = isOpen;
      //It toggles the message state from false to true and from true to false.
    },
    setMessageText(state, newText) {
      state.messageText = newText;
      //It sets the dynamic message text.
    },
    resetMessage(state) {
      state.isMessageOpen = false;
      state.messageText = "";
      //It resets the state to false and the message to an empty string again.
    },
    setUserData(state, newUserData) {
      state.currentUser = newUserData;
    },
    setSessionValid(state, validity) {
      state.validSession = validity;
    }
  },
  getters: {
    isPopupShown(state) {
      return state.isMessageOpen;
      //It checks if the message popup is open or not, and it returns true or false.
    },
    popupText(state) {
      return state.messageText;
    }
  },
  actions: {
    async firstToFire({ dispatch }) {
      await Promise.all([dispatch("validateUserSession")]);
    },
    triggerMessage({ commit }, messageToBeDisplayed) {
      commit("toggleMessage", true);
      //We trigger the mutation, and we set it to true.
      commit("setMessageText", messageToBeDisplayed);
      //We set the message text to be displayed from what we are passing in from the api call.
      setTimeout(() => {
        commit("resetMessage");
        //This wipes the message and sets it to the beginning values of the state.
      }, 3000);
    },
    initiateUserSession({ commit }, allUserData) {
      //allUserData is the data that we get from the login component
      commit("setUserData", allUserData);
      commit("setSessionValid", true);
    },
    async validateUserSession({ dispatch }) {
      const rawData = await fetch(`${process.env.VUE_APP_API_URL}/session`, {
        credentials: "include"
      });
      if (rawData.status !== 200) return;
      const sessionResponse = await rawData.json();
      dispatch("initiateUserSession", sessionResponse.userData);
    }
  }
});
