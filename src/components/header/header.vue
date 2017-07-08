<style>
  .header {
    height: 46px;
    line-height: 46px;
    margin-bottom: 30px;
    background: #343536;
    color: #fff;
    z-index: 1000;
  }

  .header h2.logo {
    float: left;
    margin: 12px 0 0 20px;
    font-size: 22px;
  }

  .header h2.logo a {
    color: #fff;
  }
</style>
<template lang="html">
  <div class="header">
    <h2 class="logo"><a :href="url">{{logoName}}</a></h2>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        logoName: 'This is logoName !',
        url: ''
      }
    },
    created () {
      var _url = location.href
      this.url = _url.substring(0, _url.lastIndexOf('/#/') + 3)
    }
  }
</script>
