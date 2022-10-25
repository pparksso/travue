import {createStore} from "vuex";
// import {signAction} from "./actions/signUp";

export default createStore({
  state: {
    loginPopup: false,
    signUpPopup: false,
    idCheck: "",
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
  actions: {
    // signAction
  },
  modules: {},
});
