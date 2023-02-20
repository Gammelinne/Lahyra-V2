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
    <div class="mx-auto">
      <v-tabs
        v-model="tab"
        centered
        grow
        background-color="white"
        color="primary"
      >
        <!-- users tab -->
        <v-tab value="users">
          {{ $t("App.Search.Users") }}
        </v-tab>

        <!-- posts tab -->
        <v-tab value="posts">
          {{ $t("App.Search.Posts") }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <!-- users tab -->
        <v-window-item value="users">

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
            v-model="pageUser"
            :length="lastPageUser"
            circle
            @next="searchUsers"
            @prev="searchUsers"
            @update:modelValue="searchUsers"
          ></v-pagination>
        </v-window-item>

        <v-window-item value="posts">
          <v-card
            v-for="(post, i) in Posts"
            :key="i"
            class="mx-5 my-5"
            variant="outlined"
          >
            <v-card-title>
              <div
                class="d-flex align-center"
                style="width: 100%"
              >
                <v-avatar
                  size="40"
                  class="mr-3"
                >
                  <img :src="post.user.avatar">
                </v-avatar>
                <span class="headline">{{ post.user.name }}</span>
                <v-spacer></v-spacer>
                <v-menu
                  open-on-hover
                  open-on-click
                  bottom
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      rounded="pill"
                      v-bind="props"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn
                          @click="reportPost(post.id)"
                          prepend-icon="mdi-flag"
                        >
                          {{ $t("App.Home.Report") }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn prepend-icon="mdi-share">
                          {{ $t("App.Home.Repost") }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn prepend-icon="mdi-share-variant">
                          {{ $t("App.Home.Share") }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-title>
            <v-card-text>
              <h2 class="headline my-3">{{ post.title }}</h2>
              <div
                class="my-3 text-justify"
                v-html="post.body"
              ></div>
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
            </v-card-text>
            <v-card-actions>
              <div class="mx-auto">
                <v-icon>mdi-clock</v-icon>
                <span>{{ post.created_at }}</span>
              </div>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="waitingLike[post.id]"
                @click="post.is_like ? dislikePost(post.id) : likePost(post.id)"
                icon
              >
                <v-icon>{{ post.is_like ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                <v-badge
                  color="red"
                  overlap
                  :content="post.likes_count"
                ></v-badge>
              </v-btn>
              <v-btn
                @click="showComments(post.id)"
                icon
              >
                <v-icon>{{commentsAccess[post.id] ? 'mdi-comment-text' : 'mdi-comment-text-outline'}}
                </v-icon>
                <v-badge
                  color="red"
                  overlap
                  :content="post.comments_count"
                ></v-badge>
              </v-btn>
            </v-card-actions>
            <div v-if="commentsAccess[post.id]">
              <v-divider></v-divider>
              <v-card-text>
                <v-card
                  v-for="(comment, i) in post.comments"
                  :key="i"
                  class="my-2"
                  variant="outlined"
                >
                  <v-card-title>
                    <v-avatar
                      size="30"
                      class="mr-3"
                    >
                      <img :src="comment.user.avatar">
                    </v-avatar>
                    <span>{{ comment.user.username }}</span>
                  </v-card-title>
                  <v-card-text>
                    <div
                      class="text-justify my-2"
                      v-html="comment.commentary"
                    ></div>
                    <div class="mx-auto">
                      <v-icon>mdi-clock</v-icon>
                      <span>{{ comment.created_at }}</span>
                    </div>
                  </v-card-text>
                </v-card>
                <v-text-field
                  v-model="addComment[post.id]"
                  :prepend-icon="addComment[post.id] ? 'mdi-comment-text' : 'mdi-comment-text-outline'"
                  :label="$t('App.Home.AddComment')"
                  :counter="500"
                  variant="outlined"
                  clearable
                >
                  <template v-slot:append>
                    <v-btn
                      @click="addCommentToPost(post.id)"
                      :disabled="!addComment[post.id]"
                      icon
                    >
                      <v-icon>{{ addComment[post.id] ? 'mdi-send' : 'mdi-send-lock' }}</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-card-text>
            </div>
          </v-card>
          <v-pagination
            v-model="pagePost"
            :length="lastPagePost"
            circle
            @next="searchPosts"
            @prev="searchPosts"
            @update:modelValue="searchPosts"
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
      addComment: [],
      waitingLike: [],
      commentsAccess: [],
      searchModel: "",
      tab: "users",
      users: [],
      pageUser: 1,
      lastPageUser: 1,
      pagePost: 1,
      lastPagePost: 1,
      Posts: {},
    };
  },

  created() {
    this.search();
    window.Echo.private("message").listen("Message", (e) => {
      if (e.data.comment) {
        Object.entries(this.Posts).forEach(([key, value]) => {
          if (value.id == e.data.comment.post_id) {
            this.Posts[key].comments.push(e.data.comment);
            this.Posts[key].comments_count += 1;
          }
        });
      }
      if (e.data.like) {
        Object.entries(this.Posts).forEach(([key, value]) => {
          if (value.id == e.data.like.post_id) {
            this.Posts[key].likes_count += 1;
          }
        });
      }
      if (e.data.dislike) {
        Object.entries(this.Posts).forEach(([key, value]) => {
          if (value.id == e.data.dislike.post_id) {
            this.Posts[key].likes_count -= 1;
          }
        });
      }
    });
  },

  methods: {
    search() {
      this.searchUsers();
      this.searchPosts();
    },
    searchPosts() {
      this.Posts = [];
      Axios.get("/post/post/search" + "?page=" + this.pagePost, {
        params: {
          search: this.searchModel,
        },
      })
        .then((response) => {
          this.Posts = response.data.data;
          this.lastPagePost = response.data.meta.last_page;
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchUsers() {
      Axios.get("/user/user/search" + "?page=" + this.pageUser, {
        params: {
          search: this.searchModel,
        },
      })
        .then((response) => {
          this.users = response.data.data;
          this.lastPageUser = response.data.meta.last_page;
          window.scrollTo(0, 0);
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

    likePost(id) {
      Axios.post("/post/" + id + "/like")
        .then(() => {
          Object.entries(this.Posts).forEach(([key, value]) => {
            if (value.id == id) {
              this.Posts[key].is_like = true;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dislikePost(id) {
      Axios.post("/post/" + id + "/dislike")
        .then(() => {
          Object.entries(this.Posts).forEach(([key, value]) => {
            if (value.id == id) {
              this.Posts[key].is_like = false;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showComments: function (id) {
      return (this.commentsAccess[id] = !this.commentsAccess[id]);
    },
    addCommentToPost: function (id) {
      Axios.post("/post/" + id + "/comment", {
        commentary: this.addComment[id],
        post_id: id,
      })
        .then(() => {
          this.addComment[id] = "";
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