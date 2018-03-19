<template>
    <modal :title="'编辑艺人信息'" @destroy="destroy" :is-footer="false">
        <div class="modify_actor" :style="{height:height+'px'}">
            <div class="group">
                <div class="title">
                    <span class="icon"></span>账号信息
                </div>
                <div class="warpper clearfix">
                    <div class="items">
                        <div class="name">ID</div>
                        <div class="content">
                            <el-input v-model="actor.id" :disabled="true" placeholder="请输入ID"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">入驻时间</div>
                        <div class="content">
                            <el-input :value="actor.createDate | timesToDate('yyyy-MM-dd')" :disabled="true" placeholder="请输入入驻时间"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">平台</div>
                        <div class="content">
                            <el-select v-model="actor.platName" @change="changePlat" placeholder="请选择平台">
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
                        <div class="name">平台ID</div>
                        <div class="content">
                            <el-input :disabled="true" :value="actor.platId" placeholder=""></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">公会</div>
                        <div class="content">
                            <el-select v-model="actor.unionName" @change="changeUnion" placeholder="请选择公会">
                                <el-option
                                  v-for="item in unionList"
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
                            <el-input v-model="actor.nickname" placeholder="请输入昵称"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">经纪人</div>
                        <div class="content">
                            <el-select v-model="actor.brokerId" placeholder="请选择经纪人">
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
                            <el-input :disabled="true" :value="actor.autoPay == 0?'人工代发工资':'系统自动代发工资'" placeholder="代发工资"></el-input>
                        </div>
                    </div>
                </div>

                <div class="btns">
                    <el-button @click="goModify(1)" size="mini" type="primary">保存</el-button>
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
                            <el-input v-model="actor.identityName" placeholder="请输入姓名"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">身份证</div>
                        <div class="content">
                            <el-input v-model="actor.identityCardId" placeholder="请输入身份证"></el-input>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <el-button @click="goModify(2)" size="mini" type="primary">保存</el-button>
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
                            <el-input v-model="actor.mobile" placeholder="请输入电话"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">QQ号</div>
                        <div class="content">
                            <el-input v-model="actor.qqId" placeholder="请输入QQ号"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">微信号</div>
                        <div class="content">
                            <el-input v-model="actor.wechatId" placeholder="请输入微信号"></el-input>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <el-button @click="goModify(3)" size="mini" type="primary">保存</el-button>
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
                            <el-select v-model="actor.shareType" placeholder="请选择">
                                <el-option
                                  v-for="item in shareTypeList"
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
                            <el-input v-model="actor.taxRatio" placeholder="请输入个税"></el-input>%
                            <div class="info">个税范围为3~8</div>
                        </div>
                    </div>
                    <template v-if="actor.shareType == 0">
                        <div class="items">
                            <div class="name">分成比例</div>
                            <div class="content">
                                <el-input v-model="actor.shareRatio" placeholder="请输入分成比例"></el-input>%
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <template v-for="(items,index) in actor.shareProperties">
                            <share-items :items="items" :length="filterListLength" :index="index" @optItems="optItems"></share-items>
                        </template>
                    </template>

                </div>
                <div class="btns">
                    <el-button @click="goModify(4)" size="mini" type="primary">保存</el-button>
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
                            <el-input v-model="actor.payFloor" placeholder="请输入保底薪资"></el-input>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">有效天</div>
                        <div class="content">
                            <el-input v-model="actor.validDay" placeholder="请输入有效天"></el-input>小时
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">有效天数</div>
                        <div class="content">
                            <el-input v-model="actor.validDayHour" placeholder="请输入有效天数"></el-input>
                            <div class="info">当日直播时长超过2小时记为有效天</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="name">有效时长</div>
                        <div class="content">
                            <el-input v-model="actor.validHour" placeholder="请输入有效时长"></el-input>小时
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <el-button @click="goModify(5)" size="mini" type="primary">保存</el-button>
                </div>
            </div>



        </div>
    </modal>
</template>

<script>
    import * as api from './api';
    import Modal from '@/modules/widget/common/Modal.vue';
    import ShareItems from './ShareItems'

    export default{
        components:{
            Modal,
            ShareItems
        },
        data(){
            return {
                agent:"",
                agentList:[],
                platList:[],
                unionList:[],
                height:300,
                calculation:"",
                shareTypeList:[{
                    uuid:0,
                    name:"固定比例"
                },{
                    uuid:1,
                    name:"阶梯比例"
                }],
                deleteShareList:[],
                actor:{
                    "id": 1010,
                    "nickname": "艺人aa",
                    "avatarUrl": "",
                    "sex": "WOMAN",
                    "userType": "ACTOR",
                    "loginName": "actor1",
                    "mobile": "15011519169",
                    "email": "",
                    "wechatId": "0",
                    "qqId": "0",
                    "status": 0,
                    "py": "yraa",
                    "pinyin": "yirenaa",
                    "password": "d306f206b97f896142fa0957f388a817",
                    "orgId": "XEwbjsBfcPU8MM4DALctwu",
                    "createDate": 1521283411000,
                    "lastUpDate": 1521283411000,
                    "platId": null,
                    "platName": null,
                    "unionId": "XEwbjsBfcPU8MM4DALctwu",
                    "unionName": "22111",
                    "thirdId": null,
                    "thirdNickname": null,
                    "identified": 0,
                    "identityName": "aaa",
                    "identityCardId": "12229929292",
                    "brokerId": "",
                    "broker": null,
                    "autoPay": 0,
                    "shareType": 1,
                    "shareProperties": null,
                    "shareRatio": 20.0,
                    "taxRatio": 10.0,
                    "payFloor": 100.0,
                    "validDay": 1.0,
                    "validDayHour": 2.0,
                    "validHour": 3.0
                }

            }
        },
        computed:{
            filterListLength(){
                var list = this.actor.shareProperties;
                var len = 0;
                for(var items of list){
                    if(items.delete == 0){
                        len++;
                    }
                }
                return len
            }
        },
        methods:{
            destroy(){
                this.$el &&
                this.$el.parentNode &&
                this.$el.parentNode.removeChild(this.$el);
                this.$destroy();
            },
            submit(){

            },
            getAgentList(){
                $API.agent.getAgentList(resp => {
                    this.agentList = resp.list;
                })
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
                    this.actor.autoPay = union.autoPay;
                }

            },
            getPlatList(){
                const orgId = this.user.orgId;
                $API.platform.getPlatFormList({orgId,currentPage:1,limit:50},(resp) => {
                    this.platList = resp.list;
                })
            },
            getUnionList(parentId){
                let orgId = this.user.orgId;
                $API.group.getGroupList({orgId,parentId,currentPage:1,limit:50},(resp) => {
                    this.unionList = resp.list;
                })
            },
            setHeight(){
                var pageHeight = document.body.clientHeight;
                var height = pageHeight - 150;
                this.height = height;
            },
            optItems(items,index,opt){
                var temp = {
                    shareRatio:"",
                    maxLimit:"",
                    delete:0
                }
                if(opt == 'add'){
                    this.actor.shareProperties.splice(index+1,0,temp);
                }else{
                    if(!items.uuid){
                        this.actor.shareProperties.splice(index,1)
                    }else{
                        this.actor.shareProperties.splice(index,1)
                        this.deleteShareList.push(items);
                    }
                }

            },
            goModify(part){
                console.log(this.actor)
                switch(part){
                    case 1:
                        var actor = {
                            orgId:this.actor.unionId || '',
                            brokerId:this.actor.brokerId,
                            nickname:this.actor.nickname
                        }
                        break;
                    case 2:
                        var actor = {
                            identityName:this.actor.identityName,
                            identityCardId:this.actor.identityCardId
                        }
                        break;
                    case 3:
                        var actor = {
                            mobile:this.actor.mobile,
                            qqId:this.actor.qqId,
                            wechatId:this.actor.wechatId
                        }
                        break;
                    case 4:
                        if(this.actor.shareType == 0){
                            var actor = {
                                shareRatio:this.actor.shareRatio,
                                shareType:this.actor.shareType,
                                taxRatio:this.actor.taxRatio
                            }
                        }else{
                            var actor = {
                                shareType:this.actor.shareType,
                                taxRatio:this.actor.taxRatio,
                            }
                            var shareProperties = [];
                            for(var i=0;i<this.actor.shareProperties.length;i++){
                                var items = this.actor.shareProperties[i];
                                var temp = {
                                    shareRatio:items.shareRatio,
                                    maxLimit:items.maxLimit,
                                    orderNum:i,
                                }
                                if(items.uuid){
                                    temp.optType = 'update';
                                    temp.uuid = items.uuid;
                                }else{
                                    temp.optType = 'add';
                                }
                                shareProperties.push(temp);
                            }

                            if(this.deleteShareList.length > 0){
                                for(var items of this.deleteShareList){
                                    var temp = {
                                        shareRatio:items.shareRatio,
                                        maxLimit:items.maxLimit,
                                        orderNum:i,
                                        uuid:items.uuid,
                                        optType:'del'
                                    }
                                    shareProperties.push(temp);
                                }
                            }
                            actor.shareProperties = shareProperties
                        }
                        break;
                    case 5:
                        var actor = {
                            payFloor:this.actor.payFloor,
                            validDay:this.actor.validDay,
                            validDayHour:this.actor.validDayHour,
                            validHour:this.actor.validHour
                        }
                        break;

                }
                actor.uuid = this.actor.uuid;
                api.modifyActor(actor,(resp) => {
                    this.callback && this.callback();
                    this.destroy();
                })
            }

        },
        mounted(){
            this.deleteShareList = [];
            this.getAgentList();
            this.getPlatList();
            const parentId = this.actor.platId || "";
            this.getUnionList(parentId);
            this.setHeight();
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    @import "~@/config/config.less";
    .modify_actor{
        width: 650px;   
        overflow: auto;
        padding-bottom: 20px;
        box-sizing: border-box;
        .btns{
            margin-left: 20px;
        }
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
