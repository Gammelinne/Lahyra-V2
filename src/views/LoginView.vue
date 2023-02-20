<template>
  <!-- get the theme from the parent -->
  <v-card
    outlined
    :theme="this.$root.$data.is_light ? 'light' : 'dark'"
    class="mx-auto"
    max-width="400"
    :style="this.$root.$data.is_mobile ? 'margin-top: 20px;' : 'margin-top: 100px;'"
  >
    <v-card-title class="text-h5">
      {{ $t("App.Login.Title") }}
    </v-card-title>
    <v-card-text>
      <v-alert
        class="my-2"
        variant="outlined"
        closable
        v-if="error"
        color="error"
        :title="$t('App.Login.Invalid')"
      >
      </v-alert>
      <v-form
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :label="$t('App.Login.Email')"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
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
      <v-btn 
      to="/Register"
      block>
        {{ $t("App.Login.Register") }}
      </v-btn>
    </div>
  </v-card>
</template>


<script>
import Axios, { setAuthorizationHeader } from "../axios";
import { registerWebSocket } from "../pusher-config";
export default {
  name: "LoginView",
  data: function () {
    return {
      error: false,
      email: "",
      password: "",
      valid: true,
    };
  },
  created: function () {
    if (localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
  methods: {
    login: function () {
      this.error = false;
      Axios.post("/login", {
        email: this.email,
        password: this.password,
      })
        .then(async (response) => {
          if (response.status === 200) {
            this.$root.$data.is_Logged = true;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            //set Authorization header in axios
            registerWebSocket()
            setAuthorizationHeader();
            await this.$router.push("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 422) {
            this.error = true;
          }
        });
    },
  },
};
</script>

<style>
</style>