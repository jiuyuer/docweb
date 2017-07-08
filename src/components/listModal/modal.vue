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
              <label for="docName" class="col-sm-2 control-label">文档名</label>
              <div class="col-sm-10">
                <input type="text" :value="modalObj.projectName" class="form-control" id="docName" placeholder="文档名">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <textarea id="docRemark" class="form-control" rows="3" :value="modalObj.projectRemark"></textarea>
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
    props: ['id', 'title', 'docObj'],
    data () {
      return {
        modalId: this.id,
        modalObj: this.docObj
      }
    },
    watch: {
      docObj: {
        handler: function () {
          this.modalObj = this.docObj
        },
        deep: true
      }
    },
    methods: {
      sure: function () {
        var obj = $.extend({}, this.modalObj)
        obj.projectName = $('#docName').val()
        obj.projectRemark = $('#docRemark').val()
        if (this.docObj.title === '编辑文档') {
          this.$emit('edit', obj)
        } else {
          this.$emit('add', obj)
        }
      }
    }
  }
</script>
