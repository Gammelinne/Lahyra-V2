<template id="app">
  <v-app :theme="is_light ? 'light' : 'dark'">
    <v-app-bar
      color="indigo"
      fixed
      app
      :title="$t('App.Title')"
    >

      <!-- button login -->
      <v-btn
        :prepend-icon="is_Logged ? 'mdi-logout' : 'mdi-login'"
        :text="is_Logged"
        @click="is_Logged ? router.push('/logout') : router.push('/login')"
      >
        {{ is_Logged ? $t('App.Logout') : $t('App.Login') }}
      </v-btn>

      <!-- button register -->
      <v-btn
        :prepend-icon="is_Logged ? '' : 'mdi-account-plus'"
        :text="is_Logged"
        @click="is_Logged ? '' : register()"
      >
        {{ is_Logged ? '' : $t('App.Register') }}
      </v-btn>

      <!-- button language -->
      <v-btn
        prepend-icon='mdi-translate'
        :text="true"
        @click="changeLanguage"
      >
        {{ language === 'en' ? 'EN' : 'FR' }}
      </v-btn>

      <!-- button menu -->
      <v-btn
        :icon="is_light ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        @click="this.is_light = !this.is_light;"
      ></v-btn>

      <!-- button settings -->
      <v-btn
        v-if="is_Logged"
        icon="mdi-cog"
        to="/settings"
      ></v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
      color="indigo"
      app
    >
      <!-- logo of github, linkedin and instagram in center-->
      <div class="text-center">
        <v-icon
          color="white"
          @click="window.open('github.com/abdelhakimz')"
        >
          mdi-github
        </v-icon>
        <v-icon
          color="white"
          @click="window.open('linkedin.com/in/abdelhakimz')"
        >
          mdi-linkedin
        </v-icon>
        <v-icon
          color="white"
          @click="window.open('instagram.com/abdelhakimz')"
        >
          mdi-instagram
        </v-icon>
      </div>
    </v-footer>

  </v-app>
</template>

<script>
import { setAuthorizationHeader } from "./axios";
export default {
  name: "App",

  data: () => ({
    drawer: false,
    is_light: true,
    is_Logged: false,
    language: null,
  }),
  created: function () {
    this.is_Logged = setAuthorizationHeader();
    this.setTheme();
    this.language = this.$i18n.locale;
  },
  methods: {
    changeLanguage() {
      this.language = this.language === "en" ? "fr" : "en";
      this.$i18n.locale = this.language;
      localStorage.setItem("language", this.language);
    },
    setTheme() {
      if (localStorage.getItem("theme")) {
        this.is_light = localStorage.getItem("theme") === "light";
      } else {
        this.is_light = window.matchMedia(
          "(prefers-color-scheme: light)"
        ).matches;
      }
    },
  },
};
</script>
