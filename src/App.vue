<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Axios from "axios";
Axios.defaults.baseURL = "http://drinkolo-back.test/api";
Axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
Axios.defaults.headers.post["Content-Type"] = "application/json";
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
