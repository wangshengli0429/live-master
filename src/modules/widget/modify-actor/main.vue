<template>
    <modal :title="'编辑艺人信息'" @destroy="destroy" @submit="submit">
        <div class="modify_actor">

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
        methods:{
            destroy(){

            },
            submit(){

            }
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modify_actor{
        width: @MODAL_WIDTH;
    }
</style>
