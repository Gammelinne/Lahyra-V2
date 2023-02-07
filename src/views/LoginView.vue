<template>
  <!-- get the theme from the parent -->
  <v-card
    outlined
    :theme="this.$root.$data.is_light ? 'light' : 'dark'"
    class="mx-auto"
    max-width="400"
    style="margin-top: 100px;"
  >
    <v-card-title class="text-h5">
      {{ $t("App.Login.Title") }}
    </v-card-title>
    <v-card-text>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t('App.Login.Email')"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :label="$t('App.Login.Password')"
          type="password"
          required
        ></v-text-field>
        <a href="/Forgot">{{ $t("App.Login.Forgot") }}</a>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="mx-auto">
        <v-btn @click="login">
          {{ $t("App.Login.Submit") }}
        </v-btn>
      </div>
    </v-card-actions>
    <div class="mx-auto">
      <v-divider></v-divider>
      <v-btn block>
        {{ $t("App.Login.Register") }}
      </v-btn>
    </div>
  </v-card>
</template>


<script>
import Axios from "../axios";
export default {
  name: "LoginView",
  data: function () {
    return {
      email: "",
      password: "",
      valid: true,
      emailRules: [
        (v) => !!v || this.$t("App.Login.EmailRequired"),
        (v) => /.+@.+\..+/.test(v) || this.$t("App.Login.EmailInvalid"),
      ],
      passwordRules: [
        (v) => !!v || this.$t("App.Login.PasswordRequired"),
        (v) => v.length >= 8 || this.$t("App.Login.PasswordLength"),
      ],
    };
  },
  created: function () {
    if (localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
  methods: {
    login: function () {
      Axios.post("/login", {
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            Axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.user.access_token}`;
            this.$root.$data.is_Logged = true;
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>