<template>
  <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{modalObj.title}}</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label for="navName" class="col-sm-2 control-label">导航名</label>
              <div class="col-sm-10">
                <input type="text" :value="modalObj.name" class="form-control" id="navName" placeholder="导航名">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button @click="sure" type="button" class="btn btn-primary">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: ['id', 'title', 'navObj'],
    data () {
      return {
        modalId: this.id,
        modalObj: this.navObj
      }
    },
    watch: {
      navObj: {
        handler: function () {
          this.modalObj = this.navObj
        },
        deep: true
      }
    },
    methods: {
      sure: function () {
        var obj = $.extend({}, this.modalObj)
        obj.name = $('#navName').val()
        if (this.navObj.title === '编辑导航') {
          this.$emit('edit', obj)
        } else {
          this.$emit('add', obj)
        }
      }
    }
  }
</script>
