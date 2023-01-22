<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',

  data() {
    return {
      drawer: null,
      items: [
        { icon: 'mdi-home', title: 'Home' },
        { icon: 'mdi-account', title: 'Profile' },
        { icon: 'mdi-email', title: 'Messages' },
        { icon: 'mdi-heart', title: 'Favorites' },
        { icon: 'mdi-settings', title: 'Settings' },
      ],
    };
  },
});
</script>
