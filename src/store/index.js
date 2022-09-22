import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      form: {
        name: "",
        age: "",
        email: "",
        date: "",
        location: "",
        time: "",
      },
      errors: {
        name: "",
        age: "",
        email: "",
        date: "",
        location: "",
        time: "",
      },
      timeout: null,
      address: null,
      isOpen: false,
      periods: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      submitError: "",
    };
  },
  mutations: {
    setError(state, payload) {
      state.errors[payload.type] = payload.value;
    },
    setName(state, payload) {
      state.form.name = payload.trim();
    },
    setAge(state, payload) {
      state.form.age = payload;
    },
    setEmail(state, payload) {
      state.form.email = payload;
    },
    setDate(state, payload) {
      state.form.date = payload;
    },
    setLocation(state, payload) {
      state.form.location = payload;
    },
    setTimeout(state, payload) {
      state.timeout = payload;
    },
    setAddress(state, payload) {
      state.address = payload;
    },
    setIsOpen(state, payload) {
      state.isOpen = payload;
    },
    setTime(state, payload) {
      state.form.time = payload;
    },
    setSubmitError(state, payload = "") {
      state.submitError = payload;
    },
  },
  getters: {
    dateStart() {
      const date = new Date();
      return date.toLocaleDateString().split(".").reverse().join("-");
    },
    dateEnd() {
      const date = new Date(new Date().setMonth(new Date().getMonth() + 1));
      return date.toLocaleDateString().split(".").reverse().join("-");
    },
  },
  actions: {
    async fetchAddress({ commit }, payload) {
      const token = "6206b7f090b60ec08aff83c098f2dc5c6232444c";
      const url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: payload }),
      };
      const res = await fetch(url, options);
      const address = await res.json();
      commit("setAddress", address);
    },
    clearAddress({ commit }) {
      commit("setAddress", null);
    },
  },
});
