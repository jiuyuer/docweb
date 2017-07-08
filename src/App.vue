<style>
  .doc-content {
    background: #ececec;
  }
</style>
<template>
  <div class="doc-content" v-cloak>
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '../src/components/header/header'
  import footer from '../src/components/footer/footer'

  export default {
    components: {
      'v-header': header,
      'v-footer': footer
    }
  }
</script>

