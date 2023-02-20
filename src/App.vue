<template id="app">
  <v-app
    v-if="is_Logged"
    :theme="is_light ? 'light' : 'dark'"
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
      <!-- notification button to open modal -->
      <v-btn
        @click="openModal('notifications')"
        rounded="pill"
      >
        <v-badge
          color="primary"
          :content="user.new_notifications"
          overlap
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-dialog
        v-model="dialog"
        :max-width="$root.$data.is_mobile ? '100%' : '500px'"
        scrollable
      >
        <v-card>
          <v-card-title class="headline">
            {{$t('App.BottomNav.activity')}}
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(item, i) in user.notifications"
                :key="i"
              >
                <v-row>
                  <v-col cols="1">
                    <v-avatar>
                      <v-img :src="item.image"></v-img>
                    </v-avatar>
                  </v-col>
                  <!--retour a la ligne de la notification si trop longue -->
                  <v-col cols="9">
                    <v-list-item-title v-html="item.message"></v-list-item-title>
                    <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                    <!-- button to item.link and button to delete notification -->
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      v-if="item.link"
                      prepend-icon="mdi-arrow-right"
                      @click="openNotification(item)"
                      color="primary"
                    >
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
              <!-- delete all notifications -->
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="error"
              @click="deleteAllNotifications"
            >
              {{$t('App.BottomNav.deleteAll')}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              {{$t('App.Close')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- logout button -->
      <v-btn
        prepend-icon="mdi-logout"
        @click="logout"
        rounded="pill"
      >
        <span>{{$t('App.Logout')}}</span>
      </v-btn>
      <v-app-bar-nav-icon
        title="Settings"
        :icon="drawer ? 'mdi-cog' : 'mdi-cog-outline'"
        @click="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
    >
      <!-- Language -->
      <v-btn
        block
        @click="changeLanguage()"
        prepend-icon="mdi-translate"
      >
        {{language === 'en' ? 'Français' : 'English'}}
      </v-btn>
      <!-- Theme -->
      <v-btn
        block
        @click="changeTheme()"
        prepend-icon="mdi-palette"
      >
        {{is_light ? 'Dark' : 'Light'}}
      </v-btn>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation
      v-model="selected"
      app
    >
      <v-btn
        block
        title="Home"
        to="/"
      >
        <v-icon>
          {{selected === 'home' ? 'mdi-home' : 'mdi-home-outline'}}
        </v-icon>
        <span v-if="selected === 'home'">{{$t('App.BottomNav.Home')}}</span>
      </v-btn>
      <v-btn
        title="Search"
        block
        to="/search"
      >
        <v-icon>mdi-magnify</v-icon>
        <span v-if="selected === 'search'">{{$t('App.BottomNav.Search')}}</span>
      </v-btn>
      <v-btn
        title="Add"
        block
        to="/add"
      >
        <v-icon>mdi-plus</v-icon>
        <span v-if="selected === 'add'">{{$t('App.BottomNav.Add')}}</span>
      </v-btn>
      <!-- open a dialog with a list of notifications -->
      <v-btn
        title="activity"
        block
        to="/activity"
      >
        <v-icon>
          {{selected === 'activity' ? 'mdi-crown' : 'mdi-crown-outline'}}
        </v-icon>
        <span v-if="selected === 'activity'">{{$t('App.BottomNav.activity')}}</span>
      </v-btn>

      <v-btn
        title="Profile"
        block
        to="/profil"
      >
        <v-icon>
          {{selected === 'profile' ? 'mdi-account' : 'mdi-account-outline'}}
        </v-icon>
        <span v-if="selected === 'profile'">{{$t('App.BottomNav.Profile')}}</span>
      </v-btn>
    </v-bottom-navigation>

  </v-app>

  <v-app
    v-else
    :theme="is_light ? 'light' : 'dark'"
  >
    <v-app-bar
      app
      :title="$t('App.Title')"
    >
      <v-spacer></v-spacer>
      <!-- login button -->
      <v-btn
        v-if="$route.path !== '/login'"
        prepend-icon="mdi-login"
        to="/login"
        rounded="pill"
      >
        <span>{{$t('App.Login')}}</span>
      </v-btn>
      <!-- light/dark mode button -->
      <v-btn
        :icon="is_light ? 'mdi-brightness-7' : 'mdi-brightness-4'"
        @click="changeTheme"
      >
      </v-btn>
      <!-- Translate button -->
      <v-btn
        icon="mdi-translate"
        @click="changeLanguage"
      >
      </v-btn>
      <span class="mr-5">{{language === 'fr' ? 'FR' : 'EN'}}</span>
    </v-app-bar>

    <v-main>
      <router-view />
      <div class="px-4 py-2 text-center w-100">
        <span>{{$t('App.Footer.Description')}} — {{$t('App.Title')}} &copy; {{ new Date().getFullYear() }}</span>
      </div>
      <div class="px-4 py-2 text-center w-100">
        <v-btn
          class="mx-2"
          prepend-icon="mdi-github"
          href='https://github.com/Gammelinne'
          target="_blank"
        >
          Github
        </v-btn>
        <v-btn
          class="mx-2"
          prepend-icon="mdi-linkedin"
          href="https://www.linkedin.com/in/kylian-renault/"
          target="_blank"
        >Linkedin</v-btn>
      </div>

    </v-main>

    <v-bottom-navigation app>
      <v-btn
        to="/about"
        class="mx-2"
      >{{ $t('App.Footer.About') }}</v-btn>
      <v-btn
        to="/contact"
        class="mx-2"
      >{{ $t('App.Footer.Contact') }}</v-btn>
      <v-btn
        to="/legal"
        class="mx-2"
      >{{ $t('App.Footer.Legal') }}</v-btn>

    </v-bottom-navigation>

  </v-app>

</template>

<script>
import Axios, { setAuthorizationHeader } from "./axios";
export default {
  name: "App",

  data() {
    return {
      drawer: false,
      selected: "home",
      is_light: true,
      is_Logged: false,
      language: "",
      lang: ["fr", "en"],
      dialog: false,
      user: {
        pseudo: "Gameline",
        email: "gameline@lahyra.com",
        avatar: "https://avatars.githubusercontent.com/u/56442535?v=4",
      },
    };
  },
  created: function () {
    this.is_Logged = setAuthorizationHeader();
    this.setTheme();
    this.language = this.$i18n.locale;
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
    openNotification(notification) {
      //delete notification on API
      Axios.delete(`/notifications/${notification.id}`)
        .then(() => {
          //delete notification on local
          this.user.notifications = this.user.notifications.filter(
            (n) => n.id !== notification.id
          );
          //redirect to notification link
          this.$router.push(notification.link);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      if (localStorage.removeItem("user") !== null) {
        Axios.post("/logout");
      }
      localStorage.removeItem("user");
      this.$router.push("/login");
      this.is_Logged = false;
    },
    changeLanguage() {
      this.language = this.language === "fr" ? "en" : "fr";
      this.$i18n.locale = this.language;
      localStorage.setItem("language", this.language);
    },
    changeTheme() {
      this.is_light = !this.is_light;
      localStorage.setItem("theme", this.is_light ? "light" : "dark");
    },
    openModal() {
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
</style>