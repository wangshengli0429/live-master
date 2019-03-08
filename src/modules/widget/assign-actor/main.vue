<template>
    <modal :title="'请分配主播公会归属'" @destroy="destroy" @submit="submit">
        <div class="assign_actor">
            <div class="items">
                <div class="name">平台ID</div>
                <div class="content">
                    <el-select v-model="actor.platName" @change="changePlat" :disabled="disabledPlat" placeholder="请选择平台">
                        <el-option
                          v-for="item in platList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid">
                        </el-option>
                    </el-select>

                </div>
            </div>
            <div class="items">
                <div class="name">昵称</div>
                <div class="content">
                    <el-input placeholder="昵称" :disabled="true" :value="actor.nickname"></el-input>
                </div>
            </div>

            <div class="items">
                <div class="name">分配公会</div>
                <div class="content">
                    <el-select v-model="actor.unionName" @change="changeUnion" placeholder="请选择"   filterable :filter-method="filterUnion">
                        <el-option
                          v-for="item in unionList"
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
               group:"",
               platList:[],
               unionList:[],
               disabledPlat:false,
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
                if(!this.actor.unionId){
                    this.$message({
                      message: '请选择工会',
                      type: 'error'
                    });
                    return false;
                }
                this.callback && this.callback(this.actor.unionId)
                close && close();
            },
            changePlat(uuid){
                if(uuid){
                    this.actor.platId = uuid;
                }else{
                    this.actor.platId = "";
                }
                this.actor.unionId = "";
                this.actor.unionName = "";
                this.getUnionList(uuid);
            },
            changeUnion(uuid){
                if(uuid){
                    this.actor.unionId = uuid;
                }
                var union = null;
                for(var items of this.unionList){
                    if(items.uuid == uuid){
                        union = items;
                    }
                }
                if(union){
                    this.actor.unionName = union.name;
                }

            },
            getPlatList(){
                const orgId = this.user.orgId;
                $API.platform.getPlatFormList({orgId,currentPage:1,limit:50},(resp) => {
                    this.platList = resp.list;
                })
            },
          filterUnion(key){
            this.actor.unionId = '';
            let orgId = this.user.orgId;
            let parentId = this.user.orgId;
            $API.group.getGroupList({orgId,parentId,currentPage:1,limit:50,searchKey:key},(resp) => {
              this.unionList = resp.list;
            })
          },
            getUnionList(parentId){
                let orgId = this.user.orgId;
                parentId = parentId ||  this.user.orgId;
                $API.group.getGroupList({orgId,parentId,currentPage:1,limit:50},(resp) => {
                    this.unionList = resp.list;
                })
            },

        },
        mounted(){
            this.getPlatList();
            const parentId = this.actor.platId || "";
            this.getUnionList(parentId);

            if(this.actor.platId){
                this.disabledPlat = true;
            }
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
