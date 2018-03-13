<template>
    <modal :title="'权限设置'" @destroy="destroy" @submit="submit">
        <div class="set_limit">
            <ul class="limit_list">
                <li v-for="items in authoritiesList">
                    <div class="wrapper">
                        <div class="name">
                            <span class="el-icon" :class="{'el-icon-caret-bottom':(items.list.length >1)}"></span>
                            <template v-if="items.list.length >1">
                                {{items.modelName}}
                            </template>
                            <template v-else>
                                {{items.list[0].modelName}}
                            </template>
                        </div>
                        <div v-if="items.list.length == 1" class="limit">
                            <el-checkbox @change="select(items.list[0],'readStatus')" :checked="items.list[0].readStatus == 0?false:true">查看</el-checkbox>
                            <el-checkbox @change="select(items.list[0],'writeStatus')" :checked="items.list[0].writeStatus == 0?false:true">编辑</el-checkbox>
                        </div>
                    </div>
                    <ul v-if="items.list.length >1">
                        <li v-for="child in items.list">
                            <div class="wrapper">
                                <div class="name"><span class="el-icon"></span>{{child.modelName}}</div>
                                <div class="limit">
                                    <el-checkbox @change="select(child),'readStatus'" :checked="child.readStatus == 0?false:true">查看</el-checkbox>
                                    <el-checkbox @change="select(child),'writeStatus'" :checked="child.writeStatus == 0?false:true">编辑</el-checkbox>
                                </div>
                            </div>
                        </li>
                    </ul>

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
                authoritiesList:[],
                authoritiesMaps:{}
            }
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            submit(close){
                var list = [];
                for(var key in this.authoritiesMaps){
                    list.push(this.authoritiesMaps[key]);
                }
                this.callback && this.callback(list);
                close && close();
            },
            select(data,key){
                console.log(data.uuid);
                let obj = this.authoritiesMaps[data.uuid];
                obj[key] = obj[key] == 0?1:0;
                console.log(this.authoritiesMaps)
            },
            filterAuthorities(){
                let maps = {}
                for(var items of this.authoritiesList){
                    if(items.list.length > 0){
                        for(var _items of items.list){
                            maps[_items.uuid] = _items;
                        }
                    }
                }
                this.authoritiesMaps = maps;
            }

        },
        mounted(){
            this.filterAuthorities();
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
                    height: 20px;
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
