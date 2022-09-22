<template>
  <div
    class="border border-primary p-3 rounded bg-white mx-2 col-11 mx-lg-0 col-lg-4"
    v-if="!isFormEmpty()"
  >
    <p class="text-dark" v-for="field in translatedForm" :key="field">
      {{ field }}
    </p>
  </div>
  <div
    class="border border-primary p-3 rounded bg-white mx-2 col-11 mx-lg-0 col-lg-4"
    v-else
  >
    <p class="text-dark">Данные не найдены :(</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SuccessComponent",
  data() {
    return {
      translatedForm: {
        name: "",
        age: "",
        email: "",
        date: "",
        location: "",
        time: "",
      },
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.form,
    }),
  },
  methods: {
    translatedInfo() {
      const ru =
        "А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-I-i-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я".split(
          "-"
        );
      const en =
        "A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
          "-"
        );
      const keys = Object.keys(this.form);
      keys.forEach((key) => {
        for (let i = 0; i < this.form[key].length; i++) {
          let s = this.form[key].charAt(i);
          let n = ru.indexOf(s);
          if (n >= 0) {
            this.translatedForm[key] += en[n];
          } else {
            this.translatedForm[key] += s;
          }
        }
      });
      return true;
    },
    isFormEmpty() {
      if (
        Object.keys(this.translatedForm).every(
          (key) => this.translatedForm[key] === ""
        )
      ) {
        return true;
      }
      return false;
    },
  },
  beforeMount() {
    this.translatedInfo();
  },
};
</script>
