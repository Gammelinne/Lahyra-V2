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
      {{ $t("App.Register.Title") }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="username"
          :label="$t('App.Register.Username')"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :label="$t('App.Register.Email')"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :label="$t('App.Register.Name')"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :label="$t('App.Register.Password')"
          type="password"
          required
        ></v-text-field>
        <v-text-field
          v-model="password_confirmation"
          :label="$t('App.Register.ConfirmPassword')"
          type="password"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="mx-auto">
        <v-btn @click="register">
          {{ $t("App.Register.Submit") }}
        </v-btn>
      </div>
    </v-card-actions>
    <div class="mx-auto">
      <v-divider></v-divider>
      <router-link to="/login">        <v-btn block>
          {{ $t("App.Register.Login") }}
        </v-btn>
      </router-link>
    </div>
  </v-card>
</template>

<script>
import Axios from "../axios";

export default {
  name: "RegisterView",
  data: function () {
    return {
      avatar: "",
      username: "",
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    register: function () {
      Axios.post("/register", {
        username: this.username,
        email: this.email,
        name: this.name,
        password: this.password,
        password_confirmation: this.password_confirmation,
      })
        .then(async () => {
          await this.$router.push("/login");
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.error = true;
          }
        });
    },
  },
};
</script>

<style>
</style>