<template>
    <modal :title="'编辑艺人信息'" @destroy="destroy" @submit="submit">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
                <div class="title">
                    <span class="icon"></span>账号信息
                </div>
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">ID</div>
                        <div class="content">
                            <el-input placeholder="请输入ID"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">入驻时间</div>
                        <div class="content">
                            <el-input placeholder="请输入入驻时间"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">平台</div>
                        <div class="content">
                            <el-input placeholder="请输入平台"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">昵称</div>
                        <div class="content">
                            <el-input placeholder="请输入昵称"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">平台ID</div>
                        <div class="content">
                            <el-input placeholder="请输入平台ID"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">公会</div>
                        <div class="content">
                            <el-input placeholder="请输入公会"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">经纪人</div>
                        <div class="content">
                            <el-select v-model="agent" placeholder="请选择">
                                <el-option
                                  v-for="item in agentList"
                                  :key="item.uuid"
                                  :label="item.name"
                                  :value="item.uuid">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">代发工资</div>
                        <div class="content">
                            <el-input placeholder="代发工资"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group">
                <div class="title">
                    <span class="icon"></span>身份信息
                </div>
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">姓名</div>
                        <div class="content">
                            <el-input placeholder="请输入姓名"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">身份证</div>
                        <div class="content">
                            <el-input placeholder="请输入身份证"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group">
                <div class="title">
                    <span class="icon"></span>联系方式
                </div>
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">电话</div>
                        <div class="content">
                            <el-input placeholder="请输入电话"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">QQ号</div>
                        <div class="content">
                            <el-input placeholder="请输入QQ号"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">微信号</div>
                        <div class="content">
                            <el-input placeholder="请输入微信号"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group">
                <div class="title">
                    <span class="icon"></span>分成计算
                </div>
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">计算方法</div>
                        <div class="content">
                            <el-select v-model="calculation" placeholder="请选择">
                                <el-option
                                  v-for="item in calculationList"
                                  :key="item.uuid"
                                  :label="item.name"
                                  :value="item.uuid">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">个税</div>
                        <div class="content">
                            <el-input placeholder="请输入个税"></el-input>%
                            <div class="info">个税范围为3~8</div>
                        </div>
                    </div>
                    <div class="items stage">
                        <div class="name">第一阶梯</div>
                        <div class="content">
                            <span class="part"><el-input placeholder=""></el-input>%分成比例</span>
                            低于<el-input placeholder=""></el-input>元
                            <span class="el-icon el-icon-circle-plus"></span>
                            <span class="el-icon el-icon-remove"></span>
                        </div>
                    </div>
                    <div class="items stage">
                        <div class="name">第二阶梯</div>
                        <div class="content">
                            <span class="part"><el-input placeholder=""></el-input>%分成比例</span>
                            低于<el-input placeholder=""></el-input>元
                            <span class="el-icon el-icon-circle-plus"></span>
                            <span class="el-icon el-icon-remove"></span>
                        </div>
                    </div>
                    <div class="items stage">
                        <div class="name">第三阶梯</div>
                        <div class="content">
                            <span class="part"><el-input placeholder=""></el-input>%分成比例</span>
                            低于<el-input placeholder=""></el-input>元
                            <span class="el-icon el-icon-circle-plus"></span>
                            <span class="el-icon el-icon-remove"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="group">
                <div class="title">
                    <span class="icon"></span>保底政策
                </div>
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">保底薪资</div>
                        <div class="content">
                            <el-input placeholder="请输入保底薪资"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">有效天</div>
                        <div class="content">
                            <el-input placeholder="请输入有效天"></el-input>小时
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">有效天数</div>
                        <div class="content">
                            <el-input placeholder="请输入有效天数"></el-input>
                            <div class="info">当日直播时长超过2小时记为有效天</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">有效时长</div>
                        <div class="content">
                            <el-input placeholder="请输入有效时长"></el-input>小时
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
                agent:"",
                agentList:[],
                height:300,
                calculation:"",
                calculationList:[{
                    uuid:"1",
                    name:"阶梯比例1"
                },{
                    uuid:"2",
                    name:"阶梯比例2"
                }]
            }
        },
        methods:{
            destroy(){

            },
            submit(){

            },
            getAgentList(){
                $API.agent.getAgentList(resp => {
                    this.agentList = resp.list;
                })
            },
            setHeight(){
                var pageHeight = document.body.clientHeight;
                var height = pageHeight - 150 - 40;
                this.height = height;
            }

        },
        mounted(){
            this.getAgentList();
            this.setHeight();
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
                        width: 70px;
                        height: 30px;
                        line-height: 30px;
                        float: left;
                    }
                    .content{
                        margin-left: 70px;
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
