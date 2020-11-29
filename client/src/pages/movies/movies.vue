<template>
  <p>MOVIES</p>
</template>

<script>
import axios from "axios";

export default {
    mounted () {
    axios
      .get('http://localhost:3000', { withCredentials: true })
      .then(res => { console.log(res.data.message)})
    }

  // axios({
  //   method: "GET",
  //   url: "http://localhost:5000/",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(res => {
  //   console.log(res.data.message);
  // });

}

</script>

<style>

</style>