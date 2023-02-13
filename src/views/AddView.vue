<template>
  <div class="add">
    <!-- center card -->
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
            required
          ></v-text-field>
          <v-textarea
            v-model="post.content"
            :label="$t('App.Add.Content')"
            required
          ></v-textarea>
          <v-file-input
            counter
            v-model="post.images"
            :label="$t('App.Add.Image')"
            multiple
            accept="image/*"
            prepend-icon="mdi-camera"
            @click="checkPermission()"
            @change="addImage()"
          >
          </v-file-input>
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
//import Axios from "../axios";

export default {
  data: function () {
    return {
      post: {
        title: "",
        content: "",
        images: [],
        tags: "",
      },
      previewImage: [],
      permission: true,
    };
  },
  methods: {
    addImage: function () {
      //check if there are more than 5 images
      if (this.post.images.length > 5) {
        //alert user with $t("App.Add.ImageLimit")
        alert(this.$t("App.Add.ImageLimit"));
        this.post.images = [];
        this.previewImage = [];
      }
      if (!this.permission) {
        alert(this.$t("App.Add.Permission"));
      }
    },
    checkPermission() {
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
              });
          } else {
            this.permission = false;
          }
        });
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
  },
};
</script>

<style>
</style>