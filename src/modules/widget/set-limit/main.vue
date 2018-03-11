<template>
    <modal :title="'权限设置'" @destroy="destroy" @submit="submit">
        <div class="set_limit">
            <ul class="limit_list">
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon el-icon-caret-bottom"></span>账号与权限</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>账号管理</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon"></span>平台管理</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon"></span>公会管理</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon el-icon-caret-bottom"></span>艺人管理</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>艺人分配</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>艺人信息管理</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon"></span>经纪人管理</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon el-icon-caret-bottom"></span>财务管理</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>财务流水</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>财务审核</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>薪资结算</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon el-icon-caret-bottom"></span>统计分析</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>系统数据分析</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>平台数据分析</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>公会数据分析</div>
                                <div class="limit">
                                    <el-checkbox>查看</el-checkbox>
                                    <el-checkbox>编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="wrapper">
                        <div class="name"><span class="el-icon"></span>操作日志</div>
                        <div class="limit">
                            <el-checkbox>查看</el-checkbox>
                            <el-checkbox>编辑</el-checkbox>
                        </div>
                    </div>
                </li>
            </ul>

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
    .set_limit{
        width: 450px;
        height: 350px;
        overflow: auto;
        .limit_list{
            li{
                .wrapper{
                    margin-bottom: 10px;
                    .name{
                        width: 150px;
                        float: left;
                        box-sizing: border-box;
                        .el-icon{
                            width: 20px;
                            height: 20px;
                            line-height: 20px;
                            cursor: pointer;
                            display: inline-block;
                            float: left;
                        }
                    }
                    .limit{
                        margin-left: 150px;
                        /deep/ .el-checkbox{
                            margin: 0 30px;
                        }
                    }
                }
                ul{
                    .wrapper{
                        .name{
                            padding-left: 20px;
                        }
                    }
                }
            }
        }


    }
</style>
