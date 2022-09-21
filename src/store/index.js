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
        time: `${new Date().getHours() + 1} : 00`,
      },
      errors: {
        name: "",
        age: "",
        email: "",
        date: "",
        location: "",
        time: "",
      },
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
});
