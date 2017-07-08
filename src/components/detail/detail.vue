<style>
  .main-wrapper {
    margin: 0 48px;
    border-radius: 4px;
    padding: 24px 0 0;
    margin-bottom: 24px;
    background: #fff;
    position: relative;
  }

  .m-nav-sub {
    border-right: 1px solid #e9e9e9;
    padding: 0 0 40px 0;
    -webkit-transition: all 200ms ease-in-out;
    transition: all 200ms ease-in-out;
  }

  @media screen and (max-width: 768px) {
    .m-nav-sub {
      padding-bottom: 30px;
      margin-bottom: 40px;
      border-bottom: 1px solid #e5e5e5;
    }
  }

  .m-nav-sub .m-nav-tit {
    position: relative;
    left: 1px;
    margin-left: -1px;
    z-index: 1;
  }

  .m-nav-sub ul {
    padding: 0;
    margin: 0;
  }

  .m-nav-sub ul li {
    position: relative;
    margin: 0;
    padding: 0;
    display: block;
    left: 1px;
    margin-left: -1px;
    z-index: 1;
    padding-right: 1px;
  }

  .m-nav-sub ul li a:after, .m-nav-sub .m-nav-tit a:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 3px solid #108ee9;
    -webkit-transform: scaleY(.0001);
    -ms-transform: scaleY(.0001);
    transform: scaleY(.0001);
    -webkit-transition: all .2s;
    transition: all .2s;
  }

  .m-nav-sub ul li a.active:after, .m-nav-sub .m-nav-tit a.active:after {
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
  }

  .m-nav-sub ul li a.active, .m-nav-sub .m-nav-tit a.active {
    color: #108ee9;
    background: #ecf6fd;
  }

  .m-nav-sub ul li a, .m-nav-sub .m-nav-tit a {
    position: relative;
    display: block;
    height: 42px;
    line-height: 42px;
    padding-left: 30px;
    color: #666;
    text-decoration: none;
    -webkit-transition: all .2s;
    transition: all .2s;
  }

  .m-nav-sub ul li a:hover, .m-nav-sub .m-nav-tit a:hover {
    color: #108ee9;
  }

  .m-nav-sub ul li span.m-li-cut {
    display: none;
    text-align: center;
    width: 12px;
    height: 12px;
    line-height: 10px;
    position: absolute;
    z-index: 5;
    top: 15px;
    left: 12px;
    cursor: pointer;
    -webkit-transition: all 300ms ease-in-out;
    transition: all 300ms ease-in-out;
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  .m-nav-sub ul li span.m-li-cut:hover {
    color: #f00;
  }

  .m-nav-sub ul li.open > span.m-li-cut {
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .m-nav-sub ul li.has-link > span.m-li-cut {
    display: block;
  }

  .m-nav-sub .m-sub-ul {
    display: none;
  }

  .m-nav-sub .m-sub-ul li span.m-li-cut {
    left: 32px;
  }

  .m-nav-sub .m-sub-ul li .m-sub-ul li span.m-li-cut {
    left: 52px;
  }

  .m-nav-sub .m-sub-ul li a {
    padding-left: 50px;
  }

  .m-nav-sub .m-sub-ul li .m-sub-ul li a {
    padding-left: 65px;
  }

  .m-main {
    padding: 0 40px 40px;
    min-height: 400px;
    margin-left: -1px;
    border-left: 1px solid #e9e9e9;
    -webkit-transition: all 200ms ease-in-out;
    transition: all 200ms ease-in-out;
  }

  .m-main h2 {
    margin: 10px 0 20px;
    font-weight: normal;
  }

  .m-nav-sub .operation {
    position: absolute;
    right: 10px;
    display: none;
    z-index: 1;
  }

  .m-nav-sub .operation span {
    margin-right: 3px;
    cursor: pointer;
  }

  .m-nav-sub .operation span:hover {
    color: #f00;
  }

  .m-nav-sub li a:hover .operation {
    display: inline;
  }
</style>

<template lang="html">
  <div class="main-wrapper clearfix">
    <div class="m-nav-sub col-lg-2 col-md-3 col-sm-4 col-xs-12">
      <div class="m-nav-tit">
        <a href="javascript:" @click.stop="linkTo(routeObj.id)">{{navData.docName}}</a>
      </div>
      <ul>
        <li :class="{'has-link' : item.child}" v-for="(item, index) in navData.items">
          <span @click.stop="showChild(item.id)" class="m-li-cut fa fa-angle-right"></span>
          <a :id="item.id" href="javascript:" @click.stop="linkTo(item.id)">{{item.name}}
            <span class="operation">
              <span @click.stop="addNav(item)" title="添加"><i class="fa fa-plus"></i></span>
              <span @click.stop="editNav(item)" title="修改"><i class="fa fa-edit"></i></span>
              <span v-show="!item.child" @click.stop="deleteNav(index,'','')" title="删除"><i
                class="fa fa-trash"></i></span>
            </span>
          </a>
          <ul class="m-sub-ul" v-if="item.items">
            <li :class="{'has-link' : subitem.child}" v-for="(subitem, subindex) in item.items">
              <span @click.stop="showChild(subitem.id)" class="m-li-cut fa fa-angle-right"></span>
              <a :id="subitem.id" href="javascript:" @click.stop="linkTo(subitem.id)">{{subitem.name}}
                <span class="operation">
                  <span @click.stop="addNav(subitem)" title="添加"><i class="fa fa-plus"></i></span>
                  <span @click.stop="editNav(subitem)" title="修改"><i class="fa fa-edit"></i></span>
                  <span v-show="!subitem.child" @click.stop="deleteNav(index,subindex,'')" title="删除"><i
                    class="fa fa-trash"></i></span>
                </span>
              </a>
              <ul class="m-sub-ul" v-if="subitem.child">
                <li v-for="(subsubitem,subsubindex) in subitem.items">
                  <a :id="subsubitem.id" href="javascript:" @click.stop="linkTo(subsubitem.id)">•&nbsp;&nbsp;{{subsubitem.name}}
                    <span class="operation">
                      <span @click.stop="editNav(subsubitem)" title="修改"><i class="fa fa-edit"></i></span>
                      <span @click.stop="deleteNav(index,subindex,subsubindex)" title="删除"><i
                        class="fa fa-trash"></i></span>
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="m-main col-lg-10 col-md-9 col-sm-8 col-xs-12">
      <router-view></router-view>
    </div>
    <v-modal :id="'contentModal'" :title="navObj.title" :nav-obj="navObj" @add="sureAdd" @edit="sureEdit"></v-modal>
  </div>
</template>

<script>
  import $ from 'jquery'
  import modal from '@/components/contentModal/modal'
  import layer from '../../../static/layer/layer.js'

  export default {
    data () {
      return {
        routeObj: this.$route.params,
        navData: {},
        navObj: {}
      }
    },
    created () {
      var _this = this
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'static/data/data2.json',
        success: function (res) {
          _this.navData = res.subNav
          _this.$nextTick(function () {
            _this.addClasName()
          })
        }
      })
    },
    watch: {
      '$route': {
        handler: function () {
          this.routeObj = this.$route.params
        },
        deep: true
      }
    },
    methods: {
      addClasName () {
        var _this = this
        $('.m-nav-sub').find('.active').removeClass('active')
        if (_this.routeObj.subid) {
          $('#' + _this.routeObj.subid).addClass('active')
          var _li = $('#' + _this.routeObj.subid).parents('li.has-link')
          $(_li).each(function () {
            $(this).toggleClass('open')
            $(this).children('ul.m-sub-ul').slideToggle(0)
          })
        } else {
          $('.m-nav-tit').children('a').addClass('active')
        }
      },
      addNav (item) {
        this.navObj = $.extend({}, item)
        this.navObj.name = ''
        this.navObj.title = '添加导航'
        $('#contentModal').modal('show')
      },
      editNav (item) {
        this.navObj = $.extend({}, item)
        this.navObj.title = '编辑导航'
        $('#contentModal').modal('show')
      },
      deleteNav (index, subindex, subsubindex) {
        var _this = this;
        layer.confirm('确定要删除此文档吗？', {
          title: ['删除提示'],
          btn: ['确定', '取消']
        }, function () {
          if (subsubindex || subsubindex === 0) {
            _this.navData.items[index].items[subindex].items.splice(subsubindex, 1)
            console.log(_this.navData.items[index].items[subindex].items.length)
            if(_this.navData.items[index].items[subindex].items.length == 0){
              _this.navData.items[index].items[subindex].child = false;
            }
          } else if (subindex || subindex === 0) {
            _this.navData.items[index].items.splice(subindex, 1)
            if(_this.navData.items[index].items.length == 0){
              _this.navData.items[index].child = false;
            }
          } else if (index || index === 0) {
            _this.navData.items.splice(index, 1);
          }
          _this.navData = $.extend({}, _this.navData)
          $('#contentModal').modal('hide')
          layer.closeAll()
          _this.$router.push({
            path: '/' + _this.routeObj.id
          })
          $('.m-nav-sub').find('.active').removeClass('active');
          $('.m-nav-tit').children('a').addClass('active')

//          layer.msg('删除成功', {icon: 2, time: 500})
        })
      },
      sureAdd (obj) {
        var _this = this
        var _navData = _this.navData.items
        if (obj.name === '') {
          return
        }
        var newObj = {
          name: obj.name,
          id: Math.floor(Math.random() * 100) + 'id'
        }
        $.each(_navData, function (index, value) {
          if (value.id === obj.id) {
            _navData[index].items = !_navData[index].items ? [] : _navData[index].items
            _navData[index].items.push(newObj)
            _navData[index].child = true;
          } else {
            $.each(_navData[index].items, function (subIndex, subValue) {
              if (subValue.id === obj.id) {
                _navData[index].items[subIndex].items = !_navData[index].items[subIndex].items ? [] : _navData[index].items[subIndex].items
                _navData[index].items[subIndex].items.push(newObj)
                _navData[index].items[subIndex].child = true;
              }
            })
          }
        })
        _this.navData = $.extend({}, _this.navData)
        $('#contentModal').modal('hide')
        _this.$nextTick(function () {
          if (!$('#' + obj.id).closest('li').hasClass('open')) {
            _this.showChild(obj.id)
          }
        })
      },
      sureEdit (obj) {
        var _this = this
        var _navData = _this.navData.items
        if (obj.name === '') {
          return
        }
        var newObj = {
          name: obj.name,
          id: Math.floor(Math.random() * 100) + 'id'
        }
        $.each(_navData, function (index, value) {
          if (value.id === obj.id) {
            _navData[index].name = obj.name;
          } else {
            $.each(_navData[index].items, function (subIndex, subValue) {
              if (subValue.id === obj.id) {
                _navData[index].items[subIndex].name = obj.name;
              } else {
                $.each(_navData[index].items[subIndex].items, function (subsubIndex, subsubValue) {
                  if (subsubValue.id === obj.id) {
                    _navData[index].items[subIndex].items[subsubIndex].name = obj.name;
                  }
                })
              }
            })
          }
        })
        _this.navData = $.extend({}, _this.navData)
        $('#contentModal').modal('hide')
      },
      showChild (id) {
        $('#' + id).closest('li').toggleClass('open')
        $('#' + id).siblings('ul.m-sub-ul').slideToggle(200)
      },
      linkTo (id) {
        var _this = this
        var url = id === _this.routeObj.id || id === '' ? '/' + _this.routeObj.id : '/' + _this.routeObj.id + '/' + id
        var _self = event.target
        _this.$router.push({
          path: url
        })
        $(_self).closest('.m-nav-sub').find('.active').removeClass('active')
        if ($(_self).closest('div').hasClass('m-nav-tit')) {
          $(_self).closest('a').addClass('active')
        } else {
          $(_self).closest('a').addClass('active')
        }
      }
    },
    components: {
      'v-modal': modal
    }
  }
</script>
