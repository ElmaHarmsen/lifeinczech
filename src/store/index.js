import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMessageOpen: false, //By default the message is not open.
    messageText: "" //By default the message text is empty.
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
    triggerMessage({commit}, messageToBeDisplayed) {
      commit("toggleMessage", true);
      //We trigger the mutation, and we set it to true.
      commit("setMessageText", messageToBeDisplayed);
      //We set the message text to be displayed from what we are passing in from the api call.
      setTimeout(() => {
        commit("resetMessage");
        //This wipes the message and sets it to the beginning values of the state.
      }, 3000)
    }
  }
});
