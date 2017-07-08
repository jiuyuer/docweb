<style scoped>
  .markdown-editor {
    display: none;
    margin: 15px 0;
  }
  .operation{
    margin-left: 10px;
  }
  .operation span{
    cursor: pointer;
    font-size: 16px;
    color: #108ee9;
  }
</style>

<template lang="html">
  <div v-cloak>
    <h2>{{title}}
      <span class="operation">
        <span v-show="!content" @click="addContent" title="添加"><i class="fa fa-plus"></i></span>
        <span v-show="content" @click="editContent" title="编辑"><i class="fa fa-edit"></i></span>
      </span>
    </h2>
    <div class="content markdown-body" v-html="replaceContent(content)"></div>
    <div class="markdown-editor">
      <textarea id="markdownEditor"></textarea>
      <div style="padding-top: 20px;">
        <button @click="getVal" class="btn btn-primary">保存</button>
        <button @click="cancel" class="btn btn-default">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import marked from 'marked'
  import SimpleMDE from 'simplemde'

  export default {
    data () {
      return {
        id: this.$route.params.subid,
        content: '',
        title: ''
      }
    },
    created () {
      var _this = this
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'static/data/data3.json',
        success: function (res) {
          _this.title = res.title
          _this.content = res.content
        }
      })
    },
    mounted () {
      this.initialize()
    },
    methods: {
      addContent: function () {
        $('.markdown-body').hide()
        $('.markdown-editor').show()
        this.simplemde.value(this.content)
      },
      editContent: function () {
        $('.markdown-body').hide()
        $('.markdown-editor').show()
        this.simplemde.value(this.content)
      },
      initialize: function () {
        this.simplemde = new SimpleMDE({
          autofocus: true,
          element: $('#markdownEditor')[0],
          autoDownloadFontAwesome: false,
          initialValue: ''
        })
      },
      getVal: function () {
        $('.markdown-editor').hide()
        $('.markdown-body').show()
        this.content = this.simplemde.value()
      },
      cancel: function () {
        $('.markdown-editor').hide()
        $('.markdown-body').show()
      },
      replaceContent: function (content) {
        return marked(content)
      }
    },
    watch: {
      '$route': {
        handler: function () {
          this.id = this.$route.params.subid
        },
        deep: true
      }
    }
  }
</script>
