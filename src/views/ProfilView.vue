<template>
  <v-container v-if="!is_loading">
    <v-card>
      <v-card-title>
        <v-tabs
          align-tabs="center"
          v-model="tab"
        >
          <v-tab value="infos">
            {{ $t("App.Profil.Infos") }}
          </v-tab>
          <v-tab value="friends">
            {{ $t("App.Profil.Friends") }}
          </v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="infos">

            <v-tabs v-model="tabInfos">
            </v-tabs>
            <v-window v-model="tabInfos">
              <v-window-item value="infos">
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
                        @click="tabInfos = 'Update'"
                        prepend-icon="mdi-account-edit"
                      >
                        {{ $t("App.Profil.Update") }}
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
                    <v-card-actions>
                      <v-btn
                        @click="deletePost(post.id)"
                        prepend-icon="mdi-delete"
                        class="mx-5"
                      >
                        {{ $t("App.Profil.DeletePost") }}
                      </v-btn>
                      <!--
                      <v-btn
                        @click="openPost(post.id)"
                        prepend-icon="mdi-eye"
                        class="mx-5"
                      >
                        {{ $t("App.Profil.ShowPost") }}
                      </v-btn>
                      -->
                    </v-card-actions>
                  </v-card>
                </v-card>
              </v-window-item>
              <v-window-item value="Update">
                <v-card>
                  <v-card-title>
                    {{ $t("App.Profil.Update") }}
                  </v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        v-model="user.email"
                        :label="$t('App.Profil.Email')"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="user.username"
                        :label="$t('App.Profil.Username')"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-text-field
                        v-model="user.name"
                        :label="$t('App.Profil.Name')"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-textarea
                        v-model="user.bio"
                        :label="$t('App.Profil.Bio')"
                        :rules="[rules.required]"
                      ></v-textarea>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      @click="updateUser"
                      prepend-icon="mdi-account-edit"
                      class="mx-5"
                    >
                      {{ $t("App.Profil.Update") }}
                    </v-btn>
                    <v-btn
                      @click="tabInfos = 'infos'"
                      prepend-icon="mdi-account"
                      class="mx-5"
                    >
                      {{ $t("App.Profil.Cancel") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-window-item>
            </v-window>
          </v-window-item>
          <v-window-item value="friends">
            <v-tabs v-model="tabFriends">
              <v-tab value="friends">
                {{ $t("App.Profil.Friends") }}
              </v-tab>
              <v-tab value="requests">
                {{ $t("App.Profil.FriendsRequests") }}
              </v-tab>
            </v-tabs>
            <v-window v-model="tabFriends">
              <v-window-item value="friends">
                <!-- friends -->
                <v-card>
                  <v-card-title>
                    {{ $t("App.Profil.Friends") }}
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="friend in user.friends"
                      :key="friend.id"
                      class="mx-5 my-5"
                    >
                      <v-card
                        variant="outlined"
                        v-if="friend.accepted"
                      >

                        <v-card-title>
                          <v-avatar size="50">
                            <v-img :src="friend.user.avatar" />
                          </v-avatar>
                        </v-card-title>
                        <v-card-item>
                          <h3>{{ friend.user.username }}</h3>
                          <span>{{ friend.user.name }}</span>
                        </v-card-item>

                        <v-card-text>
                          <v-textarea
                            v-model="friend.user.bio"
                            :label="$t('App.Profil.Bio')"
                            :rules="[rules.required]"
                            readonly
                          ></v-textarea>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            @click="openProfile(friend.user.username)"
                            prepend-icon="mdi-account"
                            class="mx-5"
                          >
                            {{ $t("App.Profil.Profile") }}
                          </v-btn>
                          <v-btn
                            @click="removeFriend(friend.id)"
                            prepend-icon="mdi-account-remove"
                            class="mx-5"
                          >
                            {{ $t("App.Profil.RemoveFriend") }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item value="requests">
                <!-- friends requests -->
                <v-card>
                  <v-card-title>
                    {{ $t("App.Profil.FriendsRequests") }}
                  </v-card-title>
                  <v-card-text>
                    <div
                      v-for="friend in user.friends"
                      :key="friend.id"
                      class="mx-5 my-5"
                    >
                      <v-card v-if="!friend.accepted">
                        <v-row class="mx-5 my-2">
                          <v-col cols="5">
                            <v-card-title>
                              <v-avatar size="50">
                                <v-img :src="friend.user.avatar" />
                              </v-avatar>
                            </v-card-title>

                            <h3>{{ friend.user.username }}</h3>
                            <span>{{ friend.user.name }}</span>
                          </v-col>
                          <v-col cols="7">
                            <v-textarea
                              readonly
                              v-model="friend.user.bio"
                              :label="$t('App.Profil.Bio')"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-card-actions>
                          <v-btn
                          :to="'/profile/' + friend.user.username"
                            prepend-icon="mdi-account"
                            class="mx-5"
                          >
                            {{ $t("App.Profil.Profile") }}
                          </v-btn>
                          <v-btn
                            @click="AcceptFriends(friend.friend_id)"
                            prepend-icon="mdi-account-check"
                            class="mx-5"
                          >
                            {{ $t("App.Profil.AcceptFriend") }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </div>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
  <v-container
    v-else
    class="d-flex justify-center align-center"
    style="height: 100vh"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-container>
</template>

<script>
import Axios from "../axios";
export default {
  data: function () {
    return {
      user: {
        name: "",
        email: "",
        username: "",
        bio: "",
        avatar: "",
        friends: [],
        posts: [],
      },
      showComments: {},
      timeout: 2000,
      tab: 0,
      tabInfos: 0,
      tabFriends: 0,
      is_loading: true,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  created: function () {
    this.GetUserInfos();
  },
  methods: {
    changeStatusComments: function (id) {
      return (this.showComments[id] = !this.showComments[id]);
    },
    GetUserInfos: function () {
      Axios.get("/user/user/getinfos")
        .then((response) => {
          this.user = response.data.data;
          this.is_loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost: function (id) {
      Axios.delete("/user/post/delete/" + id)
        .then(() => {
          this.GetUserInfos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AcceptFriends: function (id) {
      Axios.put("user/friend/accept" + id)
        .then(() => {
          this.GetUserInfos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUser: function () {
      Axios.put("/user/user/updateown", {
        name: this.user.name,
        email: this.user.email,
        username: this.user.username,
        bio: this.user.bio,
      })
        .then(() => {
          this.tabInfos = "infos";
          this.GetUserInfos();
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