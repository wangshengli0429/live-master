<template>
    <modal :title="'请分配主播公会归属'" @destroy="destroy" @submit="submit">
        <div class="assign_actor">
            <div class="items">
                <div class="name">平台ID</div>
                <div class="content">
                    <el-input placeholder="平台ID" :disabled="true" value="Douyu123"></el-input>
                </div>
            </div>
            <div class="items">
                <div class="name">昵称</div>
                <div class="content">
                    <el-input placeholder="昵称" :disabled="true" value="会飞的鱼"></el-input>
                </div>
            </div>

            <div class="items">
                <div class="name">分配公会</div>
                <div class="content">
                    <el-select v-model="group" placeholder="请选择">
                        <el-option
                          v-for="item in groupList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid">
                        </el-option>
                    </el-select>
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
               groupList:[],
               group:""
            }
        },
        methods:{
            destroy(){

            },
            submit(){

            },
            getGroupList(){
                $API.group.getGroupList(resp => {
                    this.groupList = resp.list;
                })
            },

        },
        mounted(){
            this.getGroupList();
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .assign_actor{
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
