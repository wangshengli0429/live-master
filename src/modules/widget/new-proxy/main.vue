<template>
    <modal :title="filterTitle" @destroy="destroy" @submit="submit">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">代理名称</div>
                        <div class="content">
                            <el-input  :clearable="true" :minlength="1" :maxlength="20" v-model="proxy.name" placeholder="请输入代理名称"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">状态</div>
                        <div class="content">
                            <el-select v-model="proxy.status" placeholder="请选择状态">
                                <el-option
                                    v-for="item in statusList"
                                    :key="item.uuid"
                                    :label="item.name"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                  <!--<div class="items">
                    <div class="name">平台</div>
                    <div class="content">
                      <el-select :disabled="user.platId?true:false" v-model="proxy.parentId" @change="changePlat" placeholder="请选择平台">
                        <el-option
                          v-for="item in platList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>-->
                    <div class="items">
                        <div class="name">公会</div>
                      <div class="content" @click="goSelectUnion" style="cursor: pointer">
                        <el-input :value="proxy.parentName" :disabled="proxy.parentId?true:false" placeholder="请选择公会" ></el-input>
                        <i v-if="proxy.parentName && !proxy.parentId " class="el-icon-error" @click.stop="clearSelectUnion"></i>
                      </div>
                    </div>
                  <div class="items">
                        <div class="name">分成比例</div>
                        <div class="content">
                            <el-input  :clearable="true" type="number" v-model="proxy.shareRatio" placeholder="请输入分成比例"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">承担税点</div>
                        <div class="content">
                            <el-input  :clearable="true" type="number" v-model="proxy.taxRatio" placeholder="请输入承担税点"></el-input>
                        </div>
                    </div>
                   <!-- <div class="items">
                        <div class="name">管理员</div>
                        <div class="content">
                            <el-select :disabled="disabledAdmins" v-model="proxy.adminName" @change="changeAdmin" placeholder="请选择管理员">
                                <el-option
                                    v-for="item in accountList"
                                    :key="item.uuid"
                                    :label="item.loginName"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>-->
                    <div class="items">
                        <div class="name">代发工资</div>
                        <div class="content">
                            <el-select v-model="proxy.autoPay" placeholder="请选择状态">
                                <el-option
                                    v-for="item in autoPayList"
                                    :key="item.uuid"
                                    :label="item.name"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div v-if="proxy.autoPay == 1 && proxy.uuid" class="items">
                        <div class="name">自动日期</div>
                        <div class="content">
                            {{proxy.autoPayDate | timesToDate('yyyy-MM-dd HH:mm:ss')}}
                            &nbsp;&nbsp;
                        </div>
                    </div>
                    <div v-if="proxy.uuid" class="items">
                        <div class="name">即将生效</div>
                        <div class="content">
                            {{proxy.preSetAutoPay == 0?'代发工资':'自动代发工资'}}
                        </div>
                    </div>
                  <div class="items">
                    <div class="name">负责人</div>
                    <div class="content">
                      <el-select v-model="proxy.managerId" placeholder="请选择负责人">
                        <el-option
                          v-for="item in managersList"
                          :key="item.uuid"
                          :label="item.loginName"
                          :value="item.uuid"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="items">
                    <div class="name">发薪方式</div>
                    <div class="content">
                      <el-select v-model="proxy.salaryType" placeholder="请选择发薪方式">
                        <el-option
                          v-for="item in salaryTypeList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid"
                        >
                        </el-option>
                      </el-select>
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
    import selectUnionV2 from '@/modules/widget/select-union-v2';


    export default{
        components:{
            Modal
        },
        data(){
            return {
                height:200,
                authorityGroup:[],
                autoPayList:[{
                    uuid:0,
                    name:"手动",
                },{
                    uuid:1,
                    name:"系统",
                }],
                statusList:[{
                    uuid:1,
                    name:"已停用",
                },{
                    uuid:0,
                    name:"已启用",
                }],
                salaryTypeList:[{
                  uuid:0,
                  name:"日结",
                },{
                  uuid:1,
                  name:"月结",
                }],
                platList:[],
                accountList:[],
                managersList:[],
                disabledPlat:false,
                proxy:{
                    name:"",
                    status:0,
                    platId:"",
                    parentId:"",
                    parentName:"",
                    shareRatio:"",
                    taxRatio:"",
                    autoPay:0,
                    orgType:"PROXY",
                    autoPayDate:"",
                    admin:"",
                    adminName:"",
                    managerId:"",
                    unionId:"",
                    unionName:"",
                    salaryType:""
                },
                locked:false
            }
        },
        computed:{
            filterTitle(){
                var title = "新增代理";
                if(this.proxy.uuid){
                    title = "修改代理";
                }
                return title;
            },
            disabledAdmins(){
                var result = false;
                // if(this.proxy.uuid){//客户要求可以修改
                //     // if(!this.proxy.majorAdmin){
                //     //     result = false;
                //     // }else{
                //     //     result = true;
                //     // }
                //     result = true;
                // }
                return result;
            }
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            changeAdmin(uuid){
                this.proxy.admin = uuid;
            },
            submit(close){
                console.log(this.proxy)
                if(!this.proxy.name){
                    this.$message({
                      message: '请输入代理名称',
                      type: 'error'
                    });
                    return false;
                }

                if(!this.proxy.parentId){
                    this.$message({
                      message: '请选择公会',
                      type: 'error'
                    });
                    return false;
                }
                if(!this.proxy.shareRatio){
                    this.$message({
                      message: '请输入分成比例',
                      type: 'error'
                    });
                    return false;
                }
                if(!this.proxy.taxRatio){
                    this.$message({
                      message: '请输入承担税点',
                      type: 'error'
                    });
                    return false;
                }
              /*  if(!this.proxy.admin){
                    this.$message({
                      message: '请选择管理员',
                      type: 'error'
                    });
                    return false;
                }*/
                if(!this.locked){
                    this.locked = true;
                    setTimeout(() => {
                        this.locked = false;
                    },5000)


                    if(this.proxy.uuid){
                        api.modifyProxy(this.proxy,() => {
                            this.locked = false;
                            this.callback && this.callback();
                            close && close();
                        })
                    }else{
                        api.createProxy(this.proxy,() => {
                            this.locked = false;
                            this.callback && this.callback();
                            close && close();
                        })
                    }
                }




            },
            getPlatList(){
                const orgId = this.user.orgId;
                $API.platform.getPlatFormList({orgId,start:0,limit:50},resp => {
                    this.platList = resp.list;
                })
            },

          goSelectUnion(){
            selectUnionV2({
              user:this.user,
              orgId:this.user.orgId,
              parentId:this.parentId ||  this.user.orgId,
              callback:(list) => {
                if(list.length){
                  this.proxy.parentId = list[0].uuid;
                  this.proxy.parentName = list[0].name;
                  var uuid = list[0].uuid;
                  if(uuid && this.selectUnionList && this.selectUnionList.length > 0){
                    var index = this.selectUnionList.findIndex((items) => {
                      return items.uuid == uuid;
                    })
                    if(index || index == 0){
                      this.selectUnionList.splice(index,1);
                    }
                  }

                }else{
                  this.proxy.parentId = '';
                  this.proxy.parentName = '';
                }
              }
            })
          },

          clearSelectUnion(){
            this.proxy.parentId = '';
            this.proxy.parentName = '';
          },

          changePlat(){
                setTimeout(() => {
                    this.getAccountList();
                },500)
            },
            getAccountList(){
                let orgType = 'PROXY';
                let orgId = '';
                if(this.user.platId){
                    orgId = this.user.platId;
                }

                if(this.proxy.parentId){
                    orgId = this.proxy.parentId;
                }
                if(this.proxy.uuid){
                    orgId = this.proxy.uuid;
                }
                if(orgId){
                    $API.limit.getAdminsList({orgType,orgId},resp => {
                        this.accountList = resp.list;
                    })
                }

            },
            getManagersList(){
              let orgType = 'PLAT';
              let orgId = '';
              if(this.user.platId){
                orgId = this.user.platId;
              }
              if(this.proxy.parentId){
                orgId = this.proxy.parentId;
              }
              let filter = {
                authorityGroupOrgType:orgType,
                orgId:orgId
              }
              if(orgId){
                $API.limit.getAccountList({start:0,limit:50,filter},resp => {
                  this.managersList = resp.list;
                })
              }
            },
            setHeight(){
                var pageHeight = document.body.clientHeight;
                var height = pageHeight - 150 - 40;
                this.height = height;
            }

        },
        mounted(){
            // if(!this.proxy.autoPayDate){
            //     this.proxy.autoPayDate = ''
            // }else{
            //     this.proxy.autoPayDate = new Date(this.proxy.autoPayDate);
            // }

            if(this.proxy.majorAdmin){
                this.proxy.adminName = this.proxy.majorAdmin.loginName;
                this.proxy.admin = this.proxy.majorAdmin.uuid;
            }



            this.setHeight();
            this.getAccountList();
            this.getManagersList();
            this.getPlatList();
            if(this.user.platId){
                this.proxy.parentId = this.user.platId;
            }




        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modify_actor{
        width: 650px;
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
                padding-left: 30px;
                .items{
                    margin: 10px 60px 10px 0;
                  width: 45%;
                    float: left;
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
                        width: 190px;
                    }
                    /deep/ .el-input{
                        width: 190px;
                    }

                    &:nth-child(2n){
                        margin-right: 0;
                    }
                    .name{
                        width: 80px;
                        height: 30px;
                        line-height: 30px;
                        float: left;
                    }
                    .content{
                        margin-left: 80px;
                        height: 30px;
                        line-height: 30px;
                        .info{
                            margin-top: 2px;
                            font-size: 12px;
                            color: @FONT_COLOR_FOUR;
                        }
                    }
                }
            }


        }




    }
</style>
