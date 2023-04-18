<template>
  <!-- title -->
  <div class="text-center">
    <h1 class="my-2">{{ $t("App.Home.Title") }}</h1>
  </div>
  <div v-if="Posts.length > 0">
    <v-card
      v-for="(post, i) in Posts"
      :key="i"
      class="mx-5 my-5"
      variant="outlined"
    >
      <v-card-title>
        <!-- avatar and username inlined -->
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
          <span class="headline">
            <router-link :to="'/profil/' + post.user.username">
            {{ post.user.name }}
            </router-link>
            </span>
          <v-spacer></v-spacer>
          <!-- dropdown menu -->
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
              <!--repost-->
              <v-list-item>
                <v-list-item-title>
                  <v-btn prepend-icon="mdi-share">
                    {{ $t("App.Home.Repost") }}
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <!-- share external -->
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
        <!-- post title -->
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
      <!-- att the right bottom -->
      <v-card-actions>
        <!-- created at -->
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
          <v-icon>{{
            commentsAccess[post.id] ? 'mdi-comment-text' : 'mdi-comment-text-outline'
          }}
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
              <!-- show user.username+ avatar -->
              <v-avatar
                size="30"
                class="mr-3"
              >
                <img :src="comment.user.avatar">
              </v-avatar>
              <span>{{ comment.user.username }}</span>
            </v-card-title>
            <!-- auto return line -->
            <v-card-text>
              <div
                class="text-justify my-2"
                v-html="comment.commentary"
              ></div>
              <!-- created at -->
              <div class="mx-auto">
                <v-icon>mdi-clock</v-icon>
                <span>{{ comment.created_at }}</span>
              </div>
              <!-- response  TODO 
              <v-list-item-action>
                <v-btn
                  icon
                  @click="showResponse(comment.id)"
                >
                  <v-icon>mdi-reply</v-icon>
                </v-btn>
              </v-list-item-action>-->
            </v-card-text>
          </v-card>

          <!-- add comment -->
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
    <!-- set float pagination -->
    <v-pagination
      v-if="pagination.totalPage > 1 && pagination.totalPage != null"
      v-model="pagination.currentPage"
      :length="pagination.totalPage"
      :total-visible="4"
      rounded="circle"
      @next="getPosts"
      @prev="getPosts"
      @update:modelValue="getPosts"
    ></v-pagination>
  </div>
  <div v-else>
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
        {{ $t("App.Home.NoPost") }}
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="deep-purple-accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Axios from "../axios";
export default {
  components: {},
  data: function () {
    return {
      waitingLike: {},
      addComment: {},
      commentsAccess: {},
      Posts: {},
      pagination: {
        currentPage: 1,
        totalPage: null,
        perPage: 2,
      },
    };
  },
  created: function () {110
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
    this.getPosts();
  },
  methods: {
    getPosts: function () {
      Axios.get("/post/post/home", {
        params: {
          page: this.pagination.currentPage,
        },
      })
        .then((response) => {
          this.Posts = response.data.data;
          this.pagination.currentPage = response.data.meta.current_page;
          this.pagination.totalPage = response.data.meta.last_page;
          this.pagination.perPage = response.data.meta.per_page;
        })
        .finally(() => {
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likePost: function (id) {
      this.waitingLike[id] = true;
      Axios.post("/post/" + id + "/like")
        .then(() => {
          Object.entries(this.Posts).forEach(([key, value]) => {
            if (value.id == id) {
              this.Posts[key].is_like = true;
            }
          });
        })
        .finally(() => {
          this.waitingLike[id] = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dislikePost: function (id) {
      this.waitingLike[id] = true;
      Axios.post("/post/" + id + "/dislike")
        .then(() => {
          Object.entries(this.Posts).forEach(([key, value]) => {
            if (value.id == id) {
              this.Posts[key].is_like = false;
            }
          });
        })
        .finally(() => {
          this.waitingLike[id] = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    reportPost: function (id) {
      Axios.post("/post/" + id + "/report")
        .then(() => {
          this.$store.dispatch("showSnackbar", {
            color: "success",
            text: this.$t("App.Home.Reported"),
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