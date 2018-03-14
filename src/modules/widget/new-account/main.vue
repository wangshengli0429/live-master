<template>
    <modal :title="'新增账号'" @destroy="destroy" @submit="submit">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">账号名称</div>
                        <div class="content">
                            <el-input  :clearable="true" v-model="account.loginName" placeholder="请输入账号名称"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">密码</div>
                        <div class="content">
                            <el-input  :clearable="true" v-model="account.password" placeholder="请输入密码"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">账号组</div>
                        <div class="content">
                            <el-select :clearable="true" @change="changeAuthorityGroup" v-model="account.authorityGroupId" placeholder="请选择账号组">
                                <el-option
                                    v-for="item in authorityGroup"
                                    :key="item.uuid"
                                    :label="item.name"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">数据级别</div>
                        <div class="content">
                            <el-select :disabled="true" v-model="account.authorityGroupOrgType" placeholder="请选择账号组">
                                <el-option
                                    v-for="item in orgType"
                                    :key="item.uuid"
                                    :label="item.name"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">
                            平台名称
                        </div>
                        <div class="content">
                            <el-select :clearable="true" v-model="account.platId" @change="" placeholder="请选择平台">
                                <el-option
                                    v-for="item in platList"
                                    :key="item.uuid"
                                    :label="item.name"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">
                            公会名称
                        </div>
                        <div class="content">
                            <el-select :clearable="true" v-model="account.unionId" @change="" placeholder="请选择公会">
                                <el-option
                                    v-for="item in unionList"
                                    :key="item.uuid"
                                    :label="item.name"
                                    :value="item.uuid"
                                    >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">管理员昵称</div>
                        <div class="content">
                            <el-input  :clearable="true"  v-model="account.nickname" placeholder="请输入管理员昵称"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">电话</div>
                        <div class="content">
                            <el-input  :clearable="true"  v-model="account.mobile" placeholder="请输入电话"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">状态</div>
                        <div class="content">
                            <el-select :clearable="true" v-model="account.status" placeholder="请选择账号组">
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
                authorityGroup:[],
                orgType:[{
                    uuid:"SYSTEM",
                    name:"系统",
                },{
                    uuid:"PLAT",
                    name:"平台",
                },{
                    uuid:"UNION",
                    name:"公会",
                }],
                statusList:[{
                    uuid:1,
                    name:"已停用",
                },{
                    uuid:0,
                    name:"已启用",
                }],
                platList:[],
                unionList:[],
                account:{
                    authorityGroupId:"",
                    authorityGroupOrgType:"",
                    nickname:"",
                    mobile:"",
                    loginName:"",
                    password:"",
                    status:0,
                    platId:"",
                    unionId:""
                }
            }
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            changeAuthorityGroup(data){
                var obj = this.authorityGroup.filter(function(item) { 
                    return item.uuid == data; 
                });
                if(obj.length > 0){
                    this.account.authorityGroupOrgType = obj[0].orgType;
                }else{
                    this.account.authorityGroupOrgType = "";
                }
                
            },
            submit(close){
                if(!this.account.loginName){
                    this.$message({
                      message: '请输入登录账号',
                      type: 'error'
                    });
                    return false;
                }
                if(this.account.uuid){
                    api.modifyAccount(this.account,() => {
                        this.callback && this.callback();
                        close && close();
                    })
                }else{
                    api.createAccount(this.account,() => {
                        this.callback && this.callback();
                        close && close();
                    })
                }


            },
            getAccountGroup(){
                $API.limit.getAccountGroup({start:0,limit:50},resp => {
                    this.authorityGroup = resp.authorityGroup;
                })
            },
            getPlatList(){
                const orgId = this.user.orgId;
                $API.platform.getPlatFormList({orgId,start:0,limit:50},resp => {
                    this.platList = resp.list;
                })
            },
            getUnionList(){
                const orgId = this.user.orgId;
                $API.group.getGroupList({orgId,start:0,limit:50},resp => {
                    this.unionList = resp.list;
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
            this.getAccountGroup();

            this.getPlatList();
            this.getUnionList();


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
