<template>
  <b-form
    @submit="onSubmit"
    class="border border-primary p-3 rounded bg-white mx-2 w-100 w-75 mx-lg-0"
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
    <b-form-group
      id="input-group-5"
      label="Адрес"
      label-for="input-5"
      class="text-dark"
    >
      <vue-dadata
        :token="'6206b7f090b60ec08aff83c098f2dc5c6232444c'"
        v-model="location"
        :classes="{ suggestions: 'dadata-suggestions-list' }"
      />
      <span class="text-danger mt-1" v-if="errors.location">{{
        errors.location
      }}</span>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { store } from "../store";
import { VueDadata } from "vue-dadata";
import "vue-dadata/dist/style.css";
export default {
  name: "HomeComponent",
  components: { VueDadata },
  computed: {
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
        store.commit("setAge", Number(val));
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
        if (val === "") {
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
        store.commit("setDate", val);
      },
    },
    location: {
      get() {
        return store.state.form.location;
      },
      set(val) {
        store.commit("setLocation", val);
        console.log(store.state.form.location);
      },
    },
    ...mapState({
      errors: (state) => state.errors,
    }),
    ...mapGetters(["dateEnd", "dateStart"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
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
