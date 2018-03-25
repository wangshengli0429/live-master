<template>
    <modal :title="filterTitle" @destroy="destroy" @submit="submit">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">平台名称</div>
                        <div class="content">
                            <el-input  :clearable="true" :minlength="1" :maxlength="20" v-model="plat.name" placeholder="请输入平台名称"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">平台分成</div>
                        <div class="content">
                            <el-input  :clearable="true" type="number" v-model="plat.shareRatio" placeholder="请输入平台分成"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">入账阀值</div>
                        <div class="content">
                            <el-input  :clearable="true" type="number" v-model="plat.entryMax" placeholder="请输入入账阀值"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">状态</div>
                        <div class="content">
                            <el-select v-model="plat.status" placeholder="请选择状态">
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
                    <div class="items">
                        <div class="name">管理员</div>
                        <div class="content">
                            <el-select :disabled="plat.uuid?true:false" v-model="plat.adminName" @change="selectAdmin" placeholder="请选择管理员">
                                <el-option
                                    v-for="item in accountList"
                                    :key="item.uuid"
                                    :label="item.loginName"
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
    export default{
        components:{
            Modal
        },
        data(){
            return {
                height:200,
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
                    adminName:""
                }
            }
        },
        computed:{
            filterTitle(){
                var result = '添加平台';
                if(this.plat.uuid){
                    result = '修改平台';
                }
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

                if(this.plat.uuid){
                    api.modifyPlat(this.plat,() => {
                        this.callback && this.callback()
                        close && close();
                    })
                }else{
                    api.createPlat(this.plat,() => {
                        this.callback && this.callback()
                        close && close();
                    })
                }
                
            },
            getAccountList(){
                $API.limit.getAccountList({start:0,limit:50,scope:"OrgIdNull"},resp => {
                    this.accountList = resp.list;
                })
            },
            setHeight(){
                var pageHeight = document.body.clientHeight;
                var height = pageHeight - 150 - 40;
                this.height = height;
            }

        },
        mounted(){
            this.setHeight();
            this.getAccountList();
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
        width: 475px;
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
                    margin: 10px 60px 20px 0;
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
                        width: 330px;
                    }
                    /deep/ .el-input{
                        width: 330px;
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
