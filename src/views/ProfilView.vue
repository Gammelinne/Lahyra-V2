<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-title>
            <v-avatar size="100">
              <img :src="user.avatar" />
            </v-avatar>
          </v-card-title>
          <v-card-text>
            <v-card-title>
              {{ user.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ user.email }}
            </v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card>
          <v-card-title>
            <v-tabs v-model="tab">
              <v-tab>
                {{ $t("App.Profil.Info") }}
              </v-tab>
              <v-tab>
                {{ $t("App.Profil.Followers") }}
              </v-tab>
              <v-tab>
                {{ $t("App.Profil.Following") }}
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item :value="0">
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col
                        cols="12"
                        md="4"
                      >
                        <v-card>
                          <v-card-title>
                            <v-avatar size="100">
                              <img :src="user.avatar" />
                            </v-avatar>
                          </v-card-title>
                          <v-card-text>
                            <v-card-title>
                              {{ user.name }}
                            </v-card-title>
                            <v-card-subtitle>
                              {{ user.email }}
                            </v-card-subtitle>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

    data: function () {
        return {
            user: {
                name: "Bob",
                email: "bob@bob.com",
                avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",

            },
            tab: 0,
        };
    },
};
</script>

<style>
</style>