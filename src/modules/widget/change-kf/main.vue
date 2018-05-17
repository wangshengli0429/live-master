<template>
    <modal :title="'修改客服信息'" @destroy="destroy" @submit="submit">
        <div class="change_password" :style="{height:height+'px'}">
            <div class="items clearfix">
                <div class="name">客服QQ</div>
                <div class="content">
                    <el-input placeholder="客服QQ" type="text" v-model="kf.qq"></el-input>
                </div>
            </div>
            <div class="items clearfix">
                <div class="name">客服电话</div>
                <div class="content">
                    <el-input placeholder="客服电话" type="text" v-model="kf.mobile"></el-input>
                </div>
            </div>
            <div class="items clearfix">
                <div class="name">客服微信</div>
                <div class="content">
                    <el-input placeholder="客服微信" type="text" v-model="kf.wechat"></el-input>
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
                kf:{
                    qq:"",
                    mobile:"",
                    wechat:""
                }
            }
        },
        computed:{
            
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            submit(close){
                if(!this.kf.qq){
                    this.$message.error('请填写客服QQ');
                    return false;
                }
                if(!this.kf.mobile){
                    this.$message.error('请填写客服电话');
                    return false;
                }
                if(!this.kf.wechat){
                    this.$message.error('请填写客服微信');
                    return false;
                }
       


                api.changeKfInfo({key:"kf",value:this.kf},() => {
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                    close && close();
                })

                
            },
            getKfInfo(){
                api.getKfInfo({key:'kf'},(resp) => {
                    if(resp.value){
                        this.kf = JSON.parse(resp.value);
                    }
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
            this.getKfInfo();
            
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .change_password{
        width: 450px;
        overflow: auto;
        .items{
            margin: 10px 60px 20px 0;
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
</style>
