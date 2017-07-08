<style>
  .footer{
    background: #fff;
  }
  .footer p{
    font-size: 12px;
    padding: 10px 0;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    margin: 0;
  }
</style>
<template lang="html">
  <div class="footer">
    <p>{{copyright}}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        copyright: 'This is footer copyright!'
      }
    }
  }
</script>
