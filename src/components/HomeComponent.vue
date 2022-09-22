<template>
  <b-form
    @submit="onSubmit"
    class="border border-primary p-3 rounded bg-white mx-2 col-11 mx-lg-0 col-lg-4"
    novalidate
  >
    <b-form-group
      id="input-group-1"
      label="ФИО"
      label-for="input-1"
      class="text-dark"
    >
      <b-form-input
        id="input-1"
        v-model="name"
        type="text"
        placeholder="Введите ваше имя"
        required
      ></b-form-input>
      <span class="text-danger mt-1" v-if="errors.name">{{ errors.name }}</span>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="Возраст"
      label-for="input-2"
      class="text-dark"
    >
      <b-form-input
        id="input-2"
        placeholder="Введите возраст"
        required
        type="text"
        v-model="age"
      ></b-form-input>
      <span class="text-danger mt-1" v-if="errors.age">{{ errors.age }}</span>
    </b-form-group>

    <b-form-group
      id="input-group-3"
      label="Почта"
      label-for="input-3"
      class="text-dark"
    >
      <b-form-input
        id="input-3"
        placeholder="Введите почту"
        required
        type="email"
        v-model="email"
      ></b-form-input>
      <span class="text-danger mt-1" v-if="errors.email"
        >{{ errors.email }}
      </span>
    </b-form-group>
    <b-form-group
      id="input-group-4"
      label="Дата"
      label-for="input-4"
      class="text-dark"
    >
      <b-form-input
        id="input-4"
        placeholder="Выберите дату"
        required
        type="date"
        v-model="date"
        :min="dateStart"
        :max="dateEnd"
      ></b-form-input>
      <span class="text-danger mt-1" v-if="errors.date">{{ errors.date }}</span>
    </b-form-group>
    <AddresInputVue />
    <b-form-group
      id="input-group-5"
      label="Время"
      label-for="input-5"
      class="text-dark"
    >
      <b-form-select
        id="input-5"
        placeholder="Выберите время"
        required
        v-model="time"
        :options="options"
      ></b-form-select>
      <span class="text-danger mt-1" v-if="errors.time">{{ errors.time }}</span>
    </b-form-group>
    <b-button class="w-100 mx-auto d-block" type="submit" variant="success"
      >Отправить</b-button
    >
    <span
      class="text-danger w-100 d-inline-block mt-1 text-center"
      v-if="submitError"
      >{{ submitError }}</span
    >
  </b-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { store } from "../store";
import AddresInputVue from "./AddresInput.vue";
export default {
  name: "HomeComponent",
  components: { AddresInputVue },
  computed: {
    options() {
      return this.periods.map((period) => {
        return new Date().getHours() >= period
          ? {
              value: `${period}:00-${period + 1}:00`,
              text: `${period}:00-${period + 1}:00`,
              disabled: true,
            }
          : {
              value: `${period}:00-${period + 1}:00`,
              text: `${period}:00-${period + 1}:00`,
            };
      });
    },
    name: {
      get() {
        return store.state.form.name;
      },
      set(val) {
        store.commit("setName", val);
        if (
          val.trim().split(" ").length === 1 &&
          val.trim().split(" ")[0] === ""
        ) {
          this.setError("name", "Поле обязательно");
          return;
        }
        if (
          val.trim().split(" ").length >= 2 &&
          val.trim().split(" ").length <= 3
        ) {
          this.setError("name");
        } else {
          this.setError("name", "Укажите ФИО правильно");
        }
      },
    },
    age: {
      get() {
        return store.state.form.age;
      },
      set(val) {
        if (!val) {
          this.setError("age", "Поле обязательно");
          return;
        }
        store.commit("setAge", val);
        if (Number(val) >= 0 && Number(val) <= 150) {
          if (val[0] === "0" && val.length > 1) {
            this.setError("age", "Укажите корректный возраст");
            return;
          }
          this.setError("age");
        } else {
          this.setError("age", "Укажите корректный возраст");
        }
      },
    },
    email: {
      get() {
        return store.state.form.email;
      },
      set(val) {
        store.commit("setEmail", val);
        if (!val) {
          this.setError("email", "Поле обязательно");
          return;
        }
        // eslint-disable-next-line no-useless-escape
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
          this.setError("email", "Укажите корректную почту");
        } else {
          this.setError("email");
        }
      },
    },
    date: {
      get() {
        return store.state.form.date;
      },
      set(val) {
        const date = new Date(val);
        if (date > new Date(this.dateEnd) || date < new Date(this.dateStart)) {
          this.setError("date", "Неверная дата");
          return;
        }
        if (!date.getDate() || !date.getMonth() || !date.getFullYear()) {
          this.setError("date", "Неверная дата");
          return;
        }
        this.setError("date");
        store.commit("setDate", val.split("-").reverse().join("."));
      },
    },
    time: {
      get() {
        return store.state.form.time;
      },
      set(val) {
        if (!val) {
          this.setError("time", "Поле обязательно");
          return;
        }
        this.setError("time");
        store.commit("setTime", val);
      },
    },
    ...mapState({
      errors: (state) => state.errors,
      periods: (state) => state.periods,
      submitError: (state) => state.submitError,
      form: (state) => state.form,
    }),
    ...mapGetters(["dateEnd", "dateStart"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const errorKeys = Object.keys(this.errors);
      const formKeys = Object.keys(this.errors);
      if (
        !errorKeys.every((key) => this.errors[key] === "") ||
        formKeys.some((key) => this.form[key] === "")
      ) {
        store.commit("setSubmitError", "Данные неверны");
        setTimeout(() => {
          store.commit("setSubmitError");
        }, 2000);
        const emptyFields = formKeys.filter((key) => this.form[key] === "");
        emptyFields.forEach((field) =>
          this.setError(`${field}`, "Поле обязательно")
        );
        return;
      }
      store.commit("setSubmitError");
      this.$router.push("success");
    },
    setError(type, value = "") {
      store.commit("setError", {
        type,
        value,
      });
    },
  },
};
</script>
