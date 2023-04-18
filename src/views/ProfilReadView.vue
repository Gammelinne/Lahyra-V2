<template>
  <v-container>
    <v-card>
      <div class="my-3 mx-3">
        <v-card-title>
          <v-avatar size="200">
            <v-img :src="user.avatar" />
          </v-avatar>
        </v-card-title>
        <!-- bio -->
        <v-textarea
          v-model="user.bio"
          label="Bio"
          readonly
          variant="outlined"
        ></v-textarea>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-icon>mdi-account</v-icon>
              {{ $t("App.Profil.Username") }}
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="8"
            >
              {{ user.username }}
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-icon>mdi-email</v-icon>
              {{ $t("App.Profil.Email") }}
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="8"
            >
              {{ user.email }}
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-icon>mdi-account</v-icon>
              {{ $t("App.Profil.Name") }}
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="8"
            >
              {{ user.name }}
            </v-col>
          </v-row>

        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="!user.is_friend_request"
            @click="inviteFriend"
            prepend-icon="mdi-account-edit"
          >
            {{ $t("App.Profil.Invite") }}
          </v-btn>
          <v-btn
            v-if="user.is_friend"
            @click="removeFriend"
            prepend-icon="mdi-account-remove"
          >
            {{ $t("App.Profil.Remove") }}
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
    <v-card>
      <v-card-title class="text-h5 font-weight-bold text-center">
        {{ $t("App.Profil.Posts") }}
      </v-card-title>
      <v-card
        v-for="post in user.posts"
        :key="post.id"
        class="mx-5 my-5"
        variant="outlined"
      >
        <v-card-title>
          {{post.title}}
        </v-card-title>
        <v-card-subtitle>
          <span>{{post.body}}</span>
        </v-card-subtitle>
        <v-carousel
          v-if="post.images.length > 0"
          height="200"
        >
          <v-carousel-item
            v-for="(item, i) in post.images"
            :key="i"
            :src="item.image"
          >
          </v-carousel-item>
        </v-carousel>
        <!-- creates at -->
        <span>{{ post.created_at }}</span>
        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-icon>
            {{ post.is_like ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
          <!-- badge post.likes_count -->
          <v-badge
            color="red"
            overlap
            :content="post.likes_count"
          >
          </v-badge>
          <v-btn
            @click="changeStatusComments(post.id)"
            icon
            class="mx-5"
          >
            <v-icon>
              {{ showComments[post.id] ? 'mdi-comment-text' : 'mdi-comment-text-outline' }}
            </v-icon>
            <v-badge
              color="red"
              overlap
              :content="post.comments_count"
            >
            </v-badge>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <!-- show comments -->
          <div v-if="showComments[post.id]">
            <v-card
              v-for="comment in post.comments"
              :key="comment.id"
              class="mx-5 my-5"
            >
              <v-card-title>
                <v-avatar size="50">
                  <v-img :src="comment.user.avatar" />
                </v-avatar>
              </v-card-title>
              <v-card-item>
                <h3>{{ comment.user.username }}</h3>
                <span>{{ comment.commentary }}</span>
                <span>{{ comment.created_at }}</span>
              </v-card-item>
              <v-card-actions>
                <v-btn
                  @click="openProfile(comment.user.username)"
                  prepend-icon="mdi-account"
                  class="mx-5"
                >
                  {{ $t("App.Profil.Profile") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import Axios from "../axios";
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        name: "",
      },
      showComments: {},
    };
  },
  created() {
    this.getUser();
  },
  watch: {
    $route() {
      this.getUser();
    },
  },
  methods: {
    changeStatusComments(id) {
      this.showComments[id] = !this.showComments[id];
    },
    openProfile(username) {
      //reload page with new username
      this.$router.push("/profil/" + username);
      window.scrollTo(0, 0);
    },
    inviteFriend() {
      Axios.post("user/friend/invite", {
        username: this.user.username,
      })
        .then(() => {
          this.user.is_friend_request = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUser() {
      console.log(this.$route.params.id);
      Axios.get("user/user/username", {
        params: {
          username: this.$route.params.id,
        },
      })
        .then((response) => {
          this.user = response.data.data;
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