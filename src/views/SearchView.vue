<template>
  <div class="Search">

    <!-- use style to set the width of the search bar and center it -->
    <v-text-field
      class="my-5"
      style="width: 50%; margin: 0 auto;"
      v-model="searchModel"
      label="Search"
      hide-details
      @keyup.enter="search"
      @blur="search"
      @click:append="search"
      append-icon="mdi-magnify"
    ></v-text-field>

    <!-- create tabs for the search results one for users, one for posts -->
    <div
      v-if="users.length > 0 || posts.length > 0"
      class="mx-auto"
    >
      <v-tabs
        v-model="tab"
        centered
        grow
        background-color="white"
        color="primary"
      >
        <!-- users tab -->
        <v-tab value="users">
          Users
        </v-tab>

        <!-- posts tab -->
        <v-tab value="posts">
          Posts
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <!-- users tab -->
        <v-window-item value="users">
          USER

          <v-card
            v-for="user in users"
            :key="user.id"
            class="mx-auto"
            max-width="400"
            style="margin-top: 20px;"
          >
            <v-card-title class="text-h5">
              {{ user.name }}
            </v-card-title>
            <v-card-text>
              {{ user.email }}
            </v-card-text>
            <v-card-actions>
              <v-btn @click="follow(user)">
                Follow
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-pagination
            v-model="pageUsers"
            :length="10"
            circle
            color="primary"
            @input="search"
          ></v-pagination>
        </v-window-item>

        <!-- posts tab -->
        <v-window-item value="posts">
          POST
          <v-card
            v-for="post in posts"
            :key="post.id"
            class="mx-auto"
            max-width="400"
            style="margin-top: 20px;"
          >
            <v-card-title class="text-h5">
              {{ post.title }}
            </v-card-title>
            <v-card-text>
              {{ post.body }}
            </v-card-text>
            <v-card-actions>
              <v-btn @click="like(post)">
                Like
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-pagination
            v-model="pagePosts"
            :length="10"
            circle
            color="primary"
            @input="search"
          ></v-pagination>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import Axios from "../axios";

export default {
  data: function () {
    return {
      searchModel: "",
      tab: null,
      users: [],
      posts: [],
      pageUsers: 1,
      pagePosts: 1,
    };
  },

  methods: {
    search() {
      Axios.get("/search", {
        params: {
          search: this.search,
        },
      })
        .then((response) => {
          this.users = response.data.users;
          this.posts = response.data.posts;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    follow(user) {
      Axios.post("/follow", {
        user_id: user.id,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    like(post) {
      Axios.post("/like", {
        post_id: post.id,
      })
        .then((response) => {
          console.log(response);
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