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

      <!-- drawer menu -->
      <v-app-bar-nav-icon
        v-if="!is_Logged"
        :icon="drawer ? 'mdi-menu-open' : 'mdi-menu'"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- drawer menu -->
    <v-navigation-drawer
      v-if="!is_Logged"
      v-model="drawer"
      location="right"
    >
      <!-- title with user avatar, pseudo and email -->
      <v-list-item class="my-2">
        <v-row>
          <v-col>
            <v-list-item-avatar>
              <v-avatar size="50">
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
            </v-list-item-avatar>
          </v-col>
          <v-col>
            <v-list-item-content>
              <v-list-item-title>{{ user.pseudo }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>
      <hr />
      <v-list-item>
        <v-btn
          prepend-icon="mdi-view-dashboard"
          href="/dashboard"
          block
          elevation="2"
          size="x-large"
        >
          {{ $t('App.Drawer.Dashboard') }}
        </v-btn>
      </v-list-item>
      <!-- friends -->
      <v-list-item>
        <v-btn
          prepend-icon="mdi-account-multiple"
          href="/friends"
          block
          elevation="2"
          size="x-large"
        >
          {{ $t('App.Drawer.Friends') }}
        </v-btn>
      </v-list-item>
      <!-- Groups -->
      <v-list-item>
        <v-btn
          prepend-icon="mdi-account-group"
          href="/groups"
          block
          elevation="2"
          size="x-large"
        >
          {{ $t('App.Drawer.Groups') }}
        </v-btn>
      </v-list-item>
      <hr />
      <!-- settings -->
      <v-list-item>
        <v-btn
          prepend-icon="mdi-cog"
          href="/settings"
          block
          elevation="2"
          size="x-large"
        >
          {{ $t('App.Drawer.Settings') }}
        </v-btn>
      </v-list-item>

    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer
      class="d-flex flex-column"
      color="indigo"
      app
    >
      <div class="d-flex justify-center align-center w-100">
        <!-- logo of github, linkedin and instagram in center-->
        <v-btn
          class="mx-2"
          icon="mdi-github"
          href='https://github.com/Gammelinne'
          target="_blank"
        >
        </v-btn>
        <v-btn
          class="mx-2"
          icon="mdi-linkedin"
          href="https://www.linkedin.com/in/kylian-renault/"
          target="_blank"
        ></v-btn>
      </div>
      <!--all link in center (about, contact, etc...) -->
      <div class="d-flex justify-center align-center w-100 my-2">
        <router-link to="/about" class="mx-2">{{ $t('App.Footer.About') }}</router-link>
        <router-link to="/contact" class="mx-2">{{ $t('App.Footer.Contact') }}</router-link>
        <router-link to="/legal" class="mx-2">{{ $t('App.Footer.Legal') }}</router-link>
      </div>
      <div class="px-4 py-2 text-center w-100">
        <span>{{$t('App.Footer.Description')}} — {{$t('App.Title')}} &copy; {{ new Date().getFullYear() }}</span>
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
    user: {
      pseudo: "Gameline",
      email: "gameline@lahyra.com",
      avatar: "https://avatars.githubusercontent.com/u/56442535?v=4",
    },
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