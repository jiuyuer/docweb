<style>
  .projects {
    padding-bottom: 40px;
  }

  .projects .thumbnail {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    max-width: 310px;
    margin-bottom: 30px;
    border-radius: 0
  }

  .thumbnail .operation {
    display: none;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .thumbnail .operation a {
    margin-left: 5px;
    cursor: pointer;
  }

  .thumbnail:hover .operation{
    display: block;
  }
  .projects .thumbnail .caption {
    height: 100px;
    overflow-y: hidden;
    color: #555
  }

  .projects .thumbnail .caption a:focus, .projects .thumbnail .caption a:hover {
    text-decoration: none
  }

  .projects .thumbnail img {
    max-width: 100%;
    height: auto
  }

  .projects-header {
    width: 60%;
    text-align: center;
    font-weight: 200;
    display: block;
    margin: 60px auto 40px;
  }

  .projects-header h2 {
    font-size: 30px;
    letter-spacing: -1px
  }

  @media screen and (min-width: 768px) {
    .projects-header h2 {
      font-size: 42px
    }
  }
</style>

<template lang="html">
  <div class="container projects">
    <div class="projects-header page-header">
      <h2>Bootstrap相关优质项目推荐</h2>
      <p>这些项目或者是对Bootstrap进行了有益的补充，或者是基于Bootstrap开发的</p>
    </div>
    <div class="clearfix">
      <div v-for="(item, index) in apiList" class="col-sm-6 col-md-4 col-lg-3">
        <div class="thumbnail">
          <div class="operation">
            <a title="修改" @click.stop="editDoc(item)"><i class="fa fa-edit"></i></a>
            <a title="删除" @click.stop="deleteDoc(index)"><i class="fa fa-trash"></i></a>
          </div>
          <div class="caption">
            <h3>
              <a href="javascript:" @click="linkDetail(item.projectId)">{{item.projectName}}</a>
            </h3>
            <p>{{item.projectRemark}}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="thumbnail">
          <div class="caption">
            <h3><a @click="addDoc" href="javascript:"><i class="fa fa-plus-circle"></i>&nbsp;&nbsp;添加新文档</a></h3>
          </div>
        </div>
      </div>
    </div>
    <v-modal :id="'myModal'" :title="docObj.title" :doc-obj="docObj" @add="sureAdd" @edit="sureEdit"></v-modal>
  </div>
</template>

<script>
  import $ from 'jquery'
  import modal from '@/components/listModal/modal'
  import layer from '../../../static/layer/layer.js'

  export default {
    props: {},
    data () {
      return {
        apiList: [],
        docObj: {}
      }
    },
    created () {
      var _this = this
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'static/data/data.json',
        success: function (res) {
          _this.apiList = $.extend([], res.data)
        }
      })
    },
    methods: {
      addDoc: function () {
        this.docObj = {}
        this.docObj.title = '添加文档'
        $('#myModal').modal('show')
      },
      editDoc: function (item) {
        this.docObj = $.extend({}, item)
        this.docObj.title = '编辑文档'
        $('#myModal').modal('show')
      },
      deleteDoc: function (index) {
        var _this = this
        layer.confirm('确定要删除此文档吗？', {
          title: ['删除提示'],
          btn: ['确定', '取消']
        }, function () {
          _this.apiList.splice(index, 1)
          layer.closeAll()
//          layer.msg('删除成功', {icon: 2, time: 500})
        })
      },
      linkDetail: function (id) {
        this.$router.push({
          path: '/' + id
        })
      },
      sureAdd: function (obj) {
        if ($.trim(obj.projectName) === '') {
          alert('不能为空!')
          return
        }
        var docObj = $.extend({}, obj)
        this.apiList.push(docObj)
        $('#myModal').modal('hide')
      },
      sureEdit: function (obj) {
        var _this = this
        if ($.trim(obj.projectName) === '') {
          alert('不能为空!')
          return
        }
        $.each(_this.apiList, function (index, value) {
          if (value.projectId === obj.projectId) {
            _this.apiList.splice(index, 1, obj)
            $('#myModal').modal('hide')
          }
        })
      }
    },
    components: {
      'v-modal': modal
    }
  }
</script>
