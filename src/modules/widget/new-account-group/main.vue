<template>
    <modal :title="'添加账号组'" @destroy="destroy" @submit="submit">
        <div class="account_group">
            <div class="items">
                <div class="name">名称</div>
                <div class="content">
                    <el-input placeholder="名称" value="平台管理员"></el-input>
                </div>
            </div>
            <div class="items">
                <div class="name">数据级别</div>
                <div class="content">
                    <el-select v-model="level" placeholder="请选择">
                        <el-option
                          v-for="item in levelList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="items">
                <div class="name">状态</div>
                <div class="content">
                    <el-select v-model="status" placeholder="请选择">
                        <el-option
                          v-for="item in statusList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="items">
                <div class="name">创建日期</div>
                <div class="content">
                    <el-input placeholder="创建日期" value="平台管理员"></el-input>
                </div>
            </div>
            <div class="items">
                <div class="name">设置权限</div>
                <div class="content" @click="goSetLimit">
                    <el-input placeholder="设置权限" value="" :readonly="true"></el-input>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    import * as api from './api';
    import Modal from '@/modules/widget/common/Modal.vue';
    import SetLimit from '@/modules/widget/set-limit';
    export default{
        components:{
            Modal
        },
        data(){
            return {
                level:"",
                levelList:[{
                    uuid:"1",
                    name:"平台级别"
                },{
                    uuid:"12",
                    name:"系统级别"
                }],
                status:"",
                statusList:[{
                    uuid:"23",
                    name:"已停用"
                },{
                    uuid:"233",
                    name:"已启用"
                }]
            }
        },
        methods:{
            destroy(){

            },
            submit(){

            },
            goSetLimit(){
                SetLimit({
                    
                })
            }
   

        },
        mounted(){
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .account_group{
        width: 650px;
        overflow: auto;
        .items{
            margin-bottom: 20px;
            .name{
                width: 80px;
                height: 30px;
                line-height: 30px;
                float: left;
            }
            .content{
                margin-left: 80px;
                /deep/ .el-select{
                    width: 100%;
                }
            }
        }


    }
</style>
