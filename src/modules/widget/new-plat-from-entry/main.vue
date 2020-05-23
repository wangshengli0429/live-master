<template>
    <modal :title="filterTitle" @destroy="destroy" @submit="submit">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
              <template>
                  <Button @click="add()">
                    添加
                  </Button>
                  <Table :columns="columns" :data="data">

                    <template slot-scope="{ row, index }" slot="name">
                      <Input type="text" v-model="editName" v-if="editIndex === index" />
                      <span v-else>{{ row.name }}</span>
                    </template>


                    <template slot-scope="{ row, index }" slot="address">
                      <Input type="text" v-model="editAddress" v-if="editIndex === index" />
                      <span v-else>{{ row.address }}</span>
                    </template>

                    <template slot-scope="{ row, index }" slot="action">
                      <div v-if="editIndex === index">
                        <Button @click="handleSave(index)">保存</Button>
                        <Button @click="editIndex = -1">取消</Button>
                      </div>
                      <div v-else>
                        <Button @click="handleEdit(row, index)">操作</Button>
                        <Button type="error"  @click="remove(index)">Delete</Button>
                      </div>
                    </template>
                  </Table>
              </template>
            </div>

          <div class="group">
            <div class="warpper clearfix">
                <div class="name">流水设置</div>

                <div class="items">
                  <div class="name">代理名称</div>
                  <div class="content">
                    <el-input  :clearable="true" :minlength="1" :maxlength="20" v-model="name" placeholder="请设置公式"></el-input>
                  </div>
                </div>
              </div>
          </div>

        </div>
    </modal>
</template>

<script>
    import * as api from './api';
    import Modal from '@/modules/widget/common/Modal.vue';
    export default{
        components:{
            Modal
        },
        data(){
            return {
              name:'',
              address:'',
              columns: [
                {
                  title: '姓名',
                  slot: 'name'
                },
                {
                  title: '地址',
                  slot: 'address'
                },
                {
                  title: '操作',
                  slot: 'action'
                }
              ],
              data:[],
              editIndex: -1,  // 当前聚焦的输入框的行数
              editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
              editAddress: '',  // 第四列输入框
                height:200,
                locked:false,
                statusList:[{
                    uuid:1,
                    name:"已停用",
                },{
                    uuid:0,
                    name:"已启用",
                }],
                accountList:[],
                plat:{
                    name:"",
                    shareRatio:"",
                    entryMax:"",
                    status:0,
                    orgType:"PLAT",
                    parentId:"",
                    admin:"",
                    adminName:"",
                    autoTimeMin:0,
                    autoTimeMax:0,
                    autoDayMax:0,
                    handleTimeMax:0,
                    handleTimeMin:0,
                    handleDayMax:0
                }
            }

        },
        computed:{
            filterTitle(){
                var result = this.plat.name;
                if(this.plat.uuid){
                    result  +='录入表单';
                }
                return result;
            }
        },
        methods:{
          add(){
            if(this.data.length >=5){
              this.$message({
                message: '表单录入最多可扩展5条数据！',
                type: 'error'
              });
              return false;
            }


            var _this=this
            _this.data.push({
              name:_this.name,
              address:_this.address

            })
            console.log(this.data)
          },
          handleEdit (row, index) {
            this.editName = row.name;
            this.editAddress = row.address;
            this.editIndex = index;
          },
          handleSave (index) {
            this.data[index].name = this.editName;
            this.data[index].address = this.editAddress;
            this.editIndex = -1;
          },

          remove(index) {
            this.data.splice(index, 1);
          },
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            selectAdmin(uuid){
                this.plat.admin = uuid;
            },
            submit(close){
                if(!this.plat.name){
                    this.$message({
                      message: '请输入平台名称',
                      type: 'error'
                    });
                    return false;
                }
                if(!this.plat.shareRatio){
                    this.$message({
                      message: '请输入平台分成',
                      type: 'error'
                    });
                    return false;
                }
                if(!this.plat.entryMax){
                    this.$message({
                      message: '请输入入账阀值',
                      type: 'error'
                    });
                    return false;
                }
                if(!this.plat.admin){
                    this.$message({
                      message: '请选择管理员',
                      type: 'error'
                    });
                    return false;
                }

                if(!this.locked){
                    this.locked = true;
                    setTimeout(() => {
                        this.locked = false;
                    },5000)
                    if(this.plat.uuid){
                        api.modifyPlat(this.plat,() => {
                            this.locked = false;
                            this.callback && this.callback()
                            close && close();
                        })
                    }else{
                        api.createPlat(this.plat,() => {
                            this.locked = false;
                            this.callback && this.callback()
                            close && close();
                        })
                    }
                }
            },

            setHeight(){
                var pageHeight = document.body.clientHeight;
                var height = pageHeight - 150 - 40;
                this.height = height;
            }

        },
        mounted(){
            this.setHeight();
            if(this.user){
                this.plat.parentId = this.user.orgId;
            }
            if(this.plat.majorAdmin){
                this.plat.adminName = this.plat.majorAdmin.loginName;
                this.plat.admin = this.plat.majorAdmin.uuid;
            }

        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modify_actor{
        width: 730px;
        overflow: auto;
        .group{
            margin-bottom: 10px;
            .title{
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                .icon{
                    float: left;
                    width: 3px;
                    height: 15px;
                    background: #67a7f6;
                    margin-right: 8px;
                    display: inline-block;
                    margin-top: 2px;
                }
            }
            .warpper{
                padding-left:10px;
                .items{
                    margin: 10px 30px 20px 0;
                    float:left;
                    &.stage{
                        float: none;
                        /deep/ .el-input{
                            width: 80px;
                            margin:0 4px;
                        }
                        .part{
                            margin-right: 30px;
                        }

                        .el-icon{
                            font-size: 18px;
                            cursor: pointer;
                            margin-right: 6px;
                            display: none;
                            &:hover{
                                color: @COMMON_BLUE;
                            }
                        }
                        &:hover{
                            .el-icon{
                                display: inline-block;
                            }
                        }
                    }
                    /deep/ .el-select{
                        width: 210px;
                    }
                    /deep/ .el-input{
                        width: 210px;
                    }

                    &:nth-child(2n){
                        margin-right: 0;
                    }
                    .name{
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        float: left;
                    }
                    .content{
                        margin-left: 120px;
                        .info{
                            margin-top: 2px;
                            font-size: 12px;
                            color: @FONT_COLOR_FOUR;
                        }
                    }
                }
            }
          .el-table .warning-row {
            background: oldlace;
          }
          .el-table .success-row {
            background: #f0f9eb;
          }
          .cell-edit-color{
            color:#2db7f5;
            font-weight: bold;
          }
          .cell-edit-input .el-input, .el-input__inner {
            width:100px;
          }
          .cell-icon{
            cursor:pointer;
            color:#fff;
          }

        }
    }
</style>
