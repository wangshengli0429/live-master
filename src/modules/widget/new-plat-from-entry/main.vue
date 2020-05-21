<template>
    <modal :title="filterTitle" @destroy="destroy" @submit="submit">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
              <el-button type="success" @click="addRow(tableData)">新增</el-button>
              <template>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  max-height="350">
                  <!--@cell-dblclick="tableDbEdit"-->


                  <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="80px">
                  </el-table-column>
                  <el-table-column
                    prop="desc"
                    label="名称"
                    width="160">
                    <template inline-template slot-scope="scope">
                      <el-input
                        id="'desc'+ + scope.$index "
                        @change="changeed(scope.$index,scope.row,scope.$cell,$event)"
                        placeholder="请输入名称">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="公式名称"
                    width="160">
                    <template inline-template slot-scope="scope">
                      <el-input
                        id="'value_'+ + scope.$index"
                        @change="changeed(scope.$index,scope.row,scope.$cell,$event)"
                        placeholder="请输入名称">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>

          <div class="group">
            <div class="warpper clearfix">
              <div class="items">
                <div class="name">流水设置</div>

                <template inline-template slot-scope="scope">
                  <el-input
                    placeholder="请输入流水设置">
                  </el-input>
                </template>
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
              rules: {
                value:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                desc:{ type:"string",required:true,message:"必填字段",trigger:"change"}
              },
              tableData: [
              //   {
              //   desc: 'cc',
              //   value: 'ee'
              // }, {
              //   desc: 'cc1',
              //   value: 'ee1'
              // }
              ],
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
          //获取输入框的值
          changeed(index,row,cell,even){
            console.log('-------------');
            console.log(index);
            console.log(event.target.value);
            console.log(row);
            console.log(even);
            // console.log(even.currentTarget.nextElementSibling);
            this.PI_SalePrice = event.target.value;
           var value =  document.getElementById("value_"+index).value;

            var desc =  document.getElementById("desc_"+index).value;
            console.log("----------------")
            this.tableData[index].push({
              desc: desc,
              value: value
            })
          },
          deleteRow(index, rows) {//移除一行
            rows.splice(index, 1);//删掉该行
          },
          addRow(tableData,event){//新增一行
                                  //之前一直想不到怎么新增一行空数据，最后幸亏一位朋友提示：表格新增一行，其实就是源数据的新增，从源数据入手就可以实现了，于是 恍然大悟啊！
            if(tableData.length>=5){
              this.$message({
                message: '录入标题条目不能超过5条',
                type: 'error'
              });
              return false;
            }
            this.tableData.push({
              desc: '',
              value: '',
            })

          },

          tableDbEdit(row, column, cell, event) {//编辑单元格数据
          //当鼠标双击单元格里面具体单元格的时候，即可对数据进行编辑操作，其实就是添加了一个输入框，最终将输入框中的数据保存下来就行了。
            event.target.innerHTML = "";
            let cellInput = document.createElement("input");
            cellInput.value = "";
            cellInput.setAttribute("type", "text");
            cellInput.style.width = "80%";
            cellInput.style.height = "80%";
            cell.appendChild(cellInput);
            cellInput.onblur = function() {
              cell.removeChild(cellInput);
              event.target.innerHTML = cellInput.value;
            };
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
