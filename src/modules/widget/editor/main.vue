<template>
  <modal @destroy="destroy" :title="title">
    <div class="edit_wrapper">
      <div class="maximize" :class="{'reduction':maximize}" @click="operateModal">
        <i class="iconfont" :class="{'icon-reduction':maximize,'icon-maximize':!maximize}"></i>
      </div>
      <div class="editor_container" :style="{'height':height+'px','width':width+'px'}">
        <div class="editor" :id="editorId" ref="editor" v-if="isEditor" v-loading="loading"></div>
        <textarea class="editor-textarea" rows="10" :placeholder="placeholder" ref="editor" v-else></textarea>
      </div>

    </div>
    <template slot="footer" slot-scope="props">
      <el-button @click.native="close(props.close)">取消</el-button>
      <el-button @click.native="submit(props.close)" type="primary">确定</el-button>
    </template>
  </modal>
</template>

<script>
  import Modal from '@/modules/widget/common/Modal'
  import Editor from '@/config/quill'


  export default {
    components: {
      Modal,
    },
    data() {
      return {
        title: "修改详情",
        placeholder: '',
        isEditor: true,
        isFiles: true,
        content: "",
        files: [],
        editorId: "modify_editor",
        maximize: false,
        width: 580,
        height: 310,
        loading: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{'list': 'ordered'}],
          //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme

          ['link'],

        ],
        lastSaveTime: null,
        autoSave: false,
        intervalId: null,
        lastContent: null,
        supportCalendar:false,
        calendarTime:-1,
        currentTag:-1,
        dateTimeTagList:[{
          name:'一天后',
          value:1
        },{
          name:'三天后',
          value:3
        },{
          name:'七天后',
          value:7
        }]
      }
    },
    methods: {
      close(close) {
        close && close();
      },
      submit(close) {
        if (this.isEditor) {
          this.invokeCallback(true)
        } else {
          const content = this.$refs.editor.value;
          const files = this.files;
          this.callback && this.callback(content, files);
        }

        close && close();
      },
      destroy() {
        this.$el &&
        this.$el.parentNode &&
        this.$el.parentNode.removeChild(this.$el);
        this.$destroy();
      },
      setEditor() {
        if (!this.isFiles) {
          this.height -= 30
        }
        setTimeout(() => {
          this.editor = new Editor({
            placeholder: '',
            theme: "snow",
            container: this.$refs.editor,
            toolbar: this.toolbar,
            change: () => {
            }
          });

          setTimeout(() => {
            this.editor.Quill.focus();
            if (this.content) {
              this.editor.Quill.pasteHTML(this.content);
              this.editor.Quill.setSelection(this.content.length)
            }
          }, 500)
        });

      },
      goUpload() {
        Upload({
          list: this.files,
          callback: (list) => {
            this.files = list;
          }
        })
      },
      setModalStyle() {
        var height = 310, width = 580;
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        if (this.maximize) {
          width = pageWidth - 60;
          height = pageHeight - 51 - 50 - 44 - 20;
        }
        this.width = width;
        this.height = height;
        if (!this.isFiles) {
          this.height -= 30
        }


        /*设置编辑器高度*/
        let editor_height = this.height - 73;
        if(editor_height < 230 || !this.maximize){
          editor_height = 230;
        }
        $('.ql-container.ql-snow').height(editor_height);

      },
      operateModal() {
        this.maximize = !this.maximize;
        this.setModalStyle();
      },
      invokeCallback(byManual) {
        let content = document.querySelector(`#${this.editor.id} .ql-editor`) && document.querySelector(`#${this.editor.id} .ql-editor`).innerHTML || "";
        let text = content.replace(/<img.*?(?:>|\/>)/gi, '[图片]').replace(/<\/?[^>]*>/gi, '');


        let name = content && content.match(/<p>[^<>]*<\/p>/);
        if (name) {
          name = name[0].replace(/<\/?p[^>]*>/gi, '').replace(/<\/?[^>]*>/gi, '');
        } else {
          name = text.replace(/<\/?p[^>]*>/gi, '').replace(/<\/?[^>]*>/gi, '');
        }

        var lines = this.editor.Quill.getLines();
        // console.log(lines)
        if (lines && lines.length > 0) {
          var temp = ''
          for (var items of lines) {
            var temp_name = $(items.domNode).text().trim();
            // console.log(temp_name)
            if (temp_name && temp == '') {
              temp = temp_name;
            }
          }

          // console.log(temp)

          if (temp && temp != name) {
            name = temp;
          }
        }

        let files = this.files;
        content = content.replace(/&amp;/gi, '&');
        text = text.replace(/&amp;/gi, '&');

        if (byManual) {
          if (this.supportCalendar){
            let calendarDateTime = -1
            if (this.calendarTime > 0){
              calendarDateTime = this.calendarTime
            }else if (this.currentTag > 0){
              calendarDateTime = new Date().getTime() + this.currentTag * 24 * 60 * 60 * 1000
              calendarDateTime = dateToTimes(timesToDate(calendarDateTime,'yyyy-MM-dd')+' 09:00:00');
            }
            if (calendarDateTime > 0){
              let startDate = calendarDateTime
              let endDate = calendarDateTime + 30 * 60 * 1000
              let t_date = startDate - 5 * 60 * 1000
              let cron = timesToDate(t_date,'s') + ' ' + timesToDate(t_date,'m') + ' ' + timesToDate(t_date,'H') + ' ' + timesToDate(t_date,'d') + ' ' + timesToDate(t_date,'M') + ' ' + '?' + ' ' + timesToDate(t_date,'yyyy');
              this.callback && this.callback(content, text, files, name, false,{startDate,endDate,cron});
            }else{
              this.callback && this.callback(content, text, files, name, false);
            }
          }else{
            this.callback && this.callback(content, text, files, name, false);
          }
        } else {
          if (text.length > 0) {
            if (this.lastContent != content) {
              this.lastContent = content
              this.lastSaveTime = new Date().getTime()
              this.callback && this.callback(content, text, files, name, true);
            }
          }
        }
      },
      startAutoSave() {
        this.lastContent = this.content
        this.intervalId = setInterval(this.invokeCallback, 10000)
      },
      showLoading() {
        this.loading = true;
      },
      hideLoading() {
        this.loading = false;
      },
      changeTimeDate(e){
        let startDate = this.calendarTime
        if (0 >= startDate){
          startDate = new Date().getTime()
        }
        DatePicker({
          dom: e.target,
          value: timesToDate(startDate, 'yyyy-MM-dd HH:mm:ss'),
          clear: true,
          type: 'datetime',
          callback: (date) => {
            if (date){
              this.calendarTime = dateToTimes(date);
              this.currentTag = -1
            }else{
              this.calendarTime = -1
            }
          }
        })
      },
      switchTimeTag(tag){
        this.currentTag = tag.value
      }
    },
    created() {
      if (this.isEditor) {
        this.setEditor();
      }
      if (this.autoSave) {
        this.startAutoSave()
      }
      eventHub.$on('fb-show-paste-loading', this.showLoading)
      eventHub.$on('fb-hide-paste-loading', this.hideLoading)
    },
    beforeDestroy() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      eventHub.$off('fb-show-paste-loading', this.showLoading)
      eventHub.$off('fb-hide-paste-loading', this.hideLoading)
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/config/config.less";

  .edit_wrapper {
    position: relative;
    .maximize {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 34px;
      top: -59px;
      cursor: pointer;
      i {
        font-size: 22px;
        color: #6b6a6a;
        &:hover {
          color: @COMMON_BLUE;
        }
      }
      &.reduction {
        top: -57px;
        i {
          font-size: 20px;
        }
      }
    }
    .editor_container {
      width: @MODAL_WIDTH;
      overflow: auto;
      .editor-textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: 1px solid #ccc;
        resize: none;
        font-size: 14px;
      }
      .editor {
        overflow: auto;
        /deep/ .ql-container {
          min-height: 230px;
          .ql-editor {
            min-height: 230px;
          }
        }
      }
      .files {
        font-size: 12px;
        color: @FONT_COLOR_FIRST;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-top: none;
        padding-left: 6px;
        .btns {
          font-size: 14px;
          cursor: pointer;
          color: @COMMON_BLUE;
          &:hover {
            color: @COMMON_BLUE;
          }
        }
        .num {
          color: @FONT_COLOR_THIRD;
        }
      }
    }
    .auto-save {
      color: @FONT_COLOR_THIRD;
    }
    .calendar-area{
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 14px;
      color: @FONT_COLOR_THIRD;
      .time-area{
        display: flex;
        align-items: center;
        margin-right: 20px;

        .iconfont{
          font-size: 20px;
        }
        &:hover{
          cursor: pointer;
          color: @COMMON_BLUE;
        }
        .time{
          margin-left: 5px;
        }
      }
      .tag{
        padding: 3px 10px;
        margin: 0 0 0 10px;
        background: #f2f2f2;
        cursor: pointer;
        color: #909090;
        &.active{
          border:1px solid #38a4ff;
          background: #fff;
          color: #38a4ff;
        }
        &:hover{
          background: #d8eeff;
          color: #378be0;
        }
      }
    }
  }

</style>
