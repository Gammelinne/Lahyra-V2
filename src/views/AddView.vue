<template>
  <div class="add">
    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :top="true"
      color="error"
    >{{ snackbarText }}</v-snackbar>
    <v-card
      max-width="600"
      class="mx-auto mt-5"
    >
      <v-card-title>
        <span class="headline">{{ $t("App.Add.Title") }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="post.title"
            :label="$t('App.Add.Title')"
            variant="outlined"
            :counter="100"
            :color="post.title.length > 100 ? 'error' : 'primary'"
            :rules="[(v) => !!v || $t('App.Add.TitleRequired'),
            (v) => v.length <= 100 || $t('App.Add.TitleLimit')]"
          ></v-text-field>
          <v-textarea
            v-model="post.body"
            :label="$t('App.Add.body')"
            variant="outlined"
            :counter="1500"
            :color="post.body.length > 1500 ? 'error' : 'primary'"
            :rules="[(v) => !!v || $t('App.Add.TitleRequired'),
            (v) => v.length <= 1500 || $t('App.Add.TitleLimit')]"
          ></v-textarea>
          <!-- file explorer only if permission is true -->
          <v-file-input
            counter
            v-model="post.images"
            :label="$t('App.Add.Image')"
            multiple
            variant="outlined"
            accept="image/*"
            prepend-icon="mdi-camera"
            @click="checkPermission"
          ></v-file-input>
          <!-- if permission is false -->
          <v-carousel
            v-if="post.images.length > 0"
            height="200"
          >
            <v-carousel-item
              v-for="(item, i) in post.images"
              :key="i"
              :src="getPreviewImage(i)"
            >
              <v-icon
                color="white"
                @click="deleteImage(i)"
                class="white--text"
              >mdi-close</v-icon>
            </v-carousel-item>
          </v-carousel>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="mx-auto">
          <v-btn @click="addPost">
            {{ $t("App.Add.Submit") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Axios from "../axios";

export default {
  data: function () {
    return {
      post: {
        title: "",
        body: "",
        images: [],
      },
      previewImage: [],
      snackbar: false,
      snackbarText: "",
    };
  },
  created() {},
  methods: {
    addImage: function () {
      if (this.post.images.length > 5) {
        alert(this.$t("App.Add.ImageLimit"));
        this.post.images = [];
        this.previewImage = [];
      }
    },
    //event checkPermission
    checkPermission: function (event) {
      if (this.$capacitor.isNativePlatform()) {
        this.$capacitor_camera.requestPermission();
        this.$capacitor_camera.getPermission().then((result) => {
          if (result.camera === "granted" && result.photos === "granted") {
            this.$capacitor_camera
              .getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: this.$capacitor_camera.ResultType.Base64,
                source: this.$capacitor_camera.PictureSourceType.Camera,
                saveToGallery: true,
              })
              .then((image) => {
                this.post.images.push(image.base64String);
                this.addImage();
              });
          } else {
            this.snackbar = true;
            this.snackbarText = this.$t("App.Add.Permission");
            event.preventDefault();
          }
        });
      } else {
        this.addImage();
      }
    },
    getPreviewImage: function (image) {
      const reader = new FileReader();
      //return src of this image index
      reader.readAsDataURL(this.post.images[image]);
      reader.onload = (e) => {
        this.previewImage[image] = e.target.result;
      };
      return this.previewImage[image];
    },
    deleteImage: function (image) {
      this.post.images.splice(image, 1);
      this.previewImage.splice(image, 1);
    },
    addPost: function () {
      Axios.post("/post", {
        title: this.post.title,
        body: this.post.body,
        images: this.previewImage,
      })
        .then(() => {
          this.$router.push("/");
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