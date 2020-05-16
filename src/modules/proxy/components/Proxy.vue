<template>
  <div ref="container" class="proxy_list">
    <div ref="filter" class="filter clearfix">
      <div class="filter_items">
        <div class="name">
          归属公会：
        </div>
        <div class="content" @click="goSelectUnion" style="cursor: pointer">
          <el-input :value="filter.unionName" :disabled="user.unionId?true:false" placeholder="请选择公会" ></el-input>
          <i v-if="filter.unionName && !user.unionId " class="el-icon-error" @click.stop="clearSelectUnion"></i>
        </div>
        <!--<div class="content">-->
          <!--<el-select :disabled="user.platId?true:false" v-model="filter.orgId" @change="" placeholder="请选择归属平台">-->
            <!--<el-option-->
              <!--v-for="item in platList"-->
              <!--:key="item.uuid"-->
              <!--:label="item.name"-->
              <!--:value="item.uuid"-->
            <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</div>-->
      </div>
      <div class="filter_items">
        <div class="name">
          代理名称：
        </div>
        <div class="content">
          <el-input :disabled="disableUnion" v-model="filter.name" placeholder="请输入代理名称"></el-input>
        </div>
      </div>
      <div class="filter_items">
        <div class="name">
          代理ID：
        </div>
        <div class="content">
          <el-input v-model="filter.id" placeholder="请输入代理ID"></el-input>
        </div>
      </div>
      <div class="filter_items">
        <div class="name">
          状态：
        </div>
        <div class="content">
          <el-select v-model="filter.status" @change="" placeholder="请选择状态">
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
      <div class="filter_items">
        <div class="name">
          管理员：
        </div>
        <div class="content">
          <el-input v-model="filter.adminName" placeholder="请输入管理员名称"></el-input>
        </div>
      </div>
      <div class="filter_items">
        <div class="name">
          负责人：
        </div>
        <div class="content">
          <el-input v-model="filter.managerName" placeholder="请输入负责人名称"></el-input>
        </div>
      </div>
      <div class="filter_items">
        <div class="name">
          结算方式：
        </div>
        <div class="content">
          <el-select :clearable="true" v-model="filter.salaryType"  placeholder="请选择结算方式">
            <el-option
              v-for="item in salaryTypes"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="opt_btn">
        <el-button @click="getProxyList(1)" type="primary">查询</el-button>
        <el-button @click="resetFilter">重置</el-button>
      </div>
    </div>
    <div ref="operate" class="operate">
      <el-button v-if="edit" @click="goAddProxy">添加</el-button>
    </div>
    <div class="filter_list">
      <el-table
        ref="multipleTable"
        :data="proxyList"
        :height="tableHeight"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="">
        <!-- 	    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column> -->
        <el-table-column
          prop="id"
          label="代理ID"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="代理名称"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="负责人"
          width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.manager && scope.row.manager.loginName}}</template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createDate | timesToDate('yyyy-MM-dd') }}</template>
        </el-table-column>
        <el-table-column
          prop="parentName"
          label="归属公会"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="状态"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.status == 0?"已启用":"已停用" }}</template>
        </el-table-column>
        <el-table-column
          prop="shareRatio"
          label="分成比例"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="taxRatio"
          label="承担税点"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="代发工资"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.autoPay | filterAutoPay}}</template>
        </el-table-column>
        <el-table-column
          label="管理员账号"
          width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.majorAdmin && scope.row.majorAdmin.loginName}}</template>
        </el-table-column>
        <el-table-column
          label="结算方式"
          width="120"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.salaryType == 0?'日结':'月结'}}</template>
        </el-table-column>

        <el-table-column v-if="edit" label="操作" width="280" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>


      </el-table>
    </div>
    <div ref="page" class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20, 30, 40, 50]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>


  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  import newProxy from '@/modules/widget/new-proxy'
  import {Operate} from '@/config/operate'
  import selectUnion from '@/modules/widget/select-union-v2'


  export default{
    data(){
      return {
        accountList:[],
        accountProxyList:[],
        tableHeight:200,
        platList:[],
        statusList:[{
          uuid:1,
          name:"已停用",
        },{
          uuid:0,
          name:"已启用",
        }],
        filter:{
          name:"",
          id:"",
          orgId:"",
          status:0,
          adminName:"",
          managerName:"",
          salaryType:"",
          unionId:"",
          unionName:"",
        },
        disablePlat:false,
        disableUnion:false,
        limit:10,
        salaryTypes:[{
          name:"全部",
          uuid:""
        },{
          name:"日结",
          uuid:"0"
        },{
          name:"月结",
          uuid:"1"
        }]
      }
    },
    computed:{
      ...mapGetters({
        user: 'userStore/user/user',
        total: 'proxyStore/proxy/total',
        currentPage: 'proxyStore/proxy/currentPage',
        // limit: 'proxyStore/proxy/limit',
        proxyList: 'proxyStore/proxy/proxyList',
        nav: 'homeStore/home/nav',
        authorities_nav: 'userStore/user/authorities',
      }),
      edit(){
        let path = this.$route.path;
        return Operate(this.user,path,this.nav,this.authorities_nav);
      }
    },
    methods:{
      handleEdit(index,data){
        newProxy({
          user:this.user,
          union:data,
          callback:() => {
            this.getProxyList();
          }
        })
      },
      handleDelete(index,data){
        let msg = "确定要删除”"+data.name+"“吗？"
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('proxyStore/proxy/deleteProxy',{uuid:data.uuid}).then(() => {
            this.getPlatList();
          })
        }).catch(() => {

        });
      },
      goSelectUnion(){
        if(this.user.unionId){
          return false;
        }
        selectUnion({
          user:this.user,
          orgId:this.user.orgId,
          parentId:this.parentId ||  this.user.orgId,
          callback:(list) => {
            if(list.length){
              this.filter.unionId = list[0].uuid;
              this.filter.unionName = list[0].name;
            }else{
              this.filter.unionId = '';
              this.filter.unionName = '';
            }
          }
        })
      },
      clearSelectUnion(){
        this.filter.unionId = '';
        this.filter.unionName = '';
      },
      goAddProxy(){
        newProxy({
          user:this.user,
          callback:() => {
            this.getProxyList(1);
          }
        })
      },
      resetFilter(){
        this.filter = {
          name:"",
          id:"",
          orgId:"",
          status:0,
          unionId:"",
          unionName:""
        }
        this.setDefaultOrg();
        this.getProxyList(1);
      },
      handleSizeChange(limit){
        this.limit = limit;
        this.getProxyList(1,limit);
      },
      handleCurrentChange(page){
        this.getProxyList(page);
      },
      setHeight(){
        var container = this.$refs.container.offsetHeight;
        var filter = this.$refs.filter.offsetHeight;
        var operate = this.$refs.operate.offsetHeight;
        var page = this.$refs.page.offsetHeight;
        var tableHeight = container - filter - operate -page -24;
        console.log(tableHeight);
        this.tableHeight = tableHeight;
      },
      getProxyList(currentPage,limit){//获取账号列表
        currentPage = currentPage || this.currentPage;
        limit = limit || this.limit;
        const orgId = this.user.orgId;
        const parentId = this.user.orgId;
        const filter = this.filter;
        this.$store.dispatch('proxyStore/proxy/getProxyList',{orgId,parentId,filter,currentPage,limit}).then(() => {
        })
      },
      getPlatList(){
        const orgId = this.user.orgId;
        this.$store.dispatch('platStore/platform/getPlatFormList',{orgId,currentPage:1,limit:50}).then((resp) => {
          this.platList = resp.list
        })
      },
      setDefaultOrg(){
        if(this.user){
          this.filter.orgId = this.user.platId;
        }
      }
    },
    watch:{
      user(){
        this.setDefaultOrg();
      }
    },
    mounted(){
      setTimeout(() => {
        this.setHeight();
        this.setDefaultOrg();
        this.getProxyList();
      })
    },
    created(){
      this.getPlatList();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import "~@/config/config.less";
  .proxy_list{
    padding-left: 20px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    .filter{
      .filter_items{
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
        .name{
          min-width: 60px;
          height: 30px;
          line-height: 30px;
          float: left;
        }
        .content{
          float: left;
          /deep/ .el-select{
            width: 150px;
          }
          /deep/ .el-input{
            width: 150px;
          }
        }
      }
      .opt_btn{
        float: left;
      }
    }
    .operate{
      padding: 10px 0;
      /deep/ .el-button{
        float: left;
        margin-right: 10px;
      }
    }
    .page{
      padding: 10px 0;
    }
  }
</style>
