<template>
  <div class="add">
    <!-- add post with image / text  and tags -->
    <v-card
      class="mx-auto"
      max-width="600"
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
          <!-- image upload push to array -->
          <v-file-input
            v-model="image"
            :label="$t('App.Add.Image')"
            multiple
            accept="image/*"
            prepend-icon="mdi-camera"
            @change="addImage"
          ></v-file-input>
          <v-carousel
            v-if="imageUpload.length > 0"
            cycle
            height="200"
            hide-delimiters
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item, i) in imageUpload"
              :key="i"
              :src="item"
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
      image: [],
      post: {
        title: "",
        content: "",
        images: [],
        tags: "",
      },
      imageUpload: [],
    };
  },
  methods: {
    addImage: function () {
      this.post.images = [...this.image, ...this.post.images];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUpload.push(e.target.result);
      };
      reader.readAsDataURL(this.image[0]);
      console.log(this.post.images);
    },
    addPost: function () {
      Axios.post("/post", this.post)
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteImage: function (index) {
      this.imageUpload.splice(index, 1);
      this.post.images.splice(index, 1);
    },
  },
};
</script>

<style>
</style>