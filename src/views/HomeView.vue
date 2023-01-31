<template>
  <div class="home">
    <h1>Home</h1>
    <p>{{ testwebsocket }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      testwebsocket: "",
    };
  },
  created: function () {
    //   window.Echo.channel('testchannel').listen('a', (e) => {
    //       console.log(e); // this is the event object from the server. It's can be call whatever you want
    //         this.testwebsocket = e.message;
    //   });
    //listen channel "testchannel" and event name App\Events\Test
    window.Echo.channel("testchannel").listen("Test", (e) => {
      console.log(e); // this is the event object from the server. It's can be call whatever you want
      this.testwebsocket = e.message;
    });
  },
  methods: {
  },
};
</script>