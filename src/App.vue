<template id="app">
  <v-app
    v-if="is_Logged"
    :theme="!is_light ? 'indigo' : 'dark'"
  >
    <v-app-bar
      app
      :title="$t('App.Title')"
    >
      <!-- add at the middle of the app bar a progress bar and badge with level user.exp and user.level -->
      <v-row>
        <v-col>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <!-- logout button -->
      <v-btn
        icon="mdi-logout"
        class="mx-2"
        @click="logout"
      >
      </v-btn>
      <v-btn
        icon="mdi-cog"
        class="mx-2"
      >
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation
      v-model="selected"
      app
    >
      <v-btn @click="selected = 'home'">
        <v-icon>
          {{selected === 'home' ? 'mdi-home' : 'mdi-home-outline'}}
        </v-icon>
        <span v-if="selected === 'home'">{{$t('App.Home')}}</span>
      </v-btn>
      <v-btn @click="selected = 'search'">
        <v-icon>mdi-magnify</v-icon>
        <span v-if="selected === 'search'">{{$t('App.Search')}}</span>
      </v-btn>
      <v-btn @click="selected = 'add'">
        <v-icon>mdi-plus</v-icon>
        <span v-if="selected === 'add'">{{$t('App.Add')}}</span>
      </v-btn>
      <v-btn @click="selected = 'notifications'">
        <v-icon>
          {{selected === 'notifications' ? 'mdi-bell' : 'mdi-bell-outline'}}
        </v-icon>
        <span v-if="selected === 'notifications'">{{$t('App.Notifications')}}</span>
      </v-btn>
      <v-btn @click="selected = 'profile'">
        <v-icon>
          {{selected === 'profile' ? 'mdi-account' : 'mdi-account-outline'}}
        </v-icon>
        <span v-if="selected === 'profile'">{{$t('App.Profile')}}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
  <v-app v-else>
    <router-view />
  </v-app>
</template>

<script>
import Axios, { setAuthorizationHeader } from "./axios";
export default {
  name: "App",

  data: () => ({
    selected: "home",
    is_light: true,
    is_Logged: false,
    language: null,
    user: {
      pseudo: "Gameline",
      email: "gameline@lahyra.com",
      avatar: "https://avatars.githubusercontent.com/u/56442535?v=4",
      level: 5,
      exp: 20,
    },
  }),
  created: function () {
    this.is_Logged = setAuthorizationHeader();
    this.setTheme();
    this.language = this.$i18n.locale;
    this.$root.$data.is_light = this.is_light;
  },
  methods: {
    setTheme() {
      if (localStorage.getItem("theme")) {
        this.is_light = localStorage.getItem("theme") === "light";
      } else {
        this.is_light = window.matchMedia(
          "(prefers-color-scheme: light)"
        ).matches;
        localStorage.setItem("theme", this.is_light ? "light" : "dark");
      }
    },
    logout() {
      Axios.post("/logout")
        .then(() => {
          localStorage.removeItem("user");
          this.$router.push('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>