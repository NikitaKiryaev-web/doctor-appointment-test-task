<template>
  <b-form-group
    id="input-group-100"
    label="Адрес"
    label-for="input-100"
    class="text-dark"
  >
    <b-form-input
      id="input-100"
      placeholder="Укажите адрес"
      required
      type="text"
      v-model="location"
      @focus="handleFocus"
      @blur="handleFocusOut($event)"
      @keydown="handleFocus"
    ></b-form-input>
    <div v-if="address && isOpen" class="dadata-suggestions-list">
      <p
        class="w-100 dadata-suggestions-list__item"
        v-for="item in address.suggestions"
        :key="item.value"
        @click="handleClick(item.value)"
        @mousedown="$event.preventDefault()"
      >
        {{ item.value }}
      </p>
    </div>
    <span class="text-danger mt-1" v-if="errors.location">{{
      errors.location
    }}</span>
  </b-form-group>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { store } from "../store";
export default {
  name: "AddresInput",
  computed: {
    location: {
      get() {
        return store.state.form.location;
      },
      set(val) {
        if (!val) {
          this.clearAddress();
          this.setError("location", "Поле обязательно");
          return;
        }
        this.setError("location");
        store.commit("setLocation", val);
        if (store.state.timeout) {
          clearTimeout(store.state.timeout);
        }
        store.commit(
          "setTimeout",
          setTimeout(() => {
            this.fetchAddress(val);
          }, 1000)
        );
      },
    },
    ...mapState({
      errors: (state) => state.errors,
      address: (state) => state.address,
      isOpen: (state) => state.isOpen,
    }),
  },
  methods: {
    ...mapActions(["fetchAddress", "clearAddress"]),
    handleFocus() {
      store.commit("setIsOpen", true);
    },
    handleFocusOut(e) {
      store.commit("setIsOpen", false);
      e.target.blur();
    },
    handleClick(val) {
      store.commit("setLocation", val);
      store.commit("setIsOpen", false);
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
