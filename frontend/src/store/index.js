import {createStore} from "vuex";

export default createStore({
  state: {
    loginPopup: false,
    signUpPopup: false,
  },
  getters: {},
  mutations: {
    showLogin: function (state) {
      state.loginPopup = true;
    },
    showSignUp: function (state) {
      state.signUpPopup = true;
    },
    hideLogin: function (state) {
      state.loginPopup = false;
    },
    hideSignUp: function (state) {
      state.signUpPopup = false;
    },
  },
  actions: {},
  modules: {},
});
