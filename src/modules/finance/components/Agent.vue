<template>
	<div ref="container" class="account_list">
		<div ref="filter" class="filter clearfix">
			<div class="filter_items">
				<div class="name">
					平台名称：
				</div>
				<div class="content">
					<el-select :disabled="user.platId?true:false" :clearable="true" v-model="filter.platId" @change="changePlat" placeholder="请选择平台">
					    <el-option
							v-for="item in platList"
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
					公会名称：
				</div>
        <div class="content" @click="goSelectUnion" style="cursor: pointer">
					<!--<el-select  v-model="filter.unionId" @change="changeUnion" placeholder="请选择公会" filterable :filter-method="filterUnion">-->
					    <!--<el-option-->
							<!--v-for="item in unionList"-->
							<!--:key="item.uuid"-->
							<!--:label="item.name"-->
							<!--:value="item.uuid"-->
							<!--&gt;-->
					    <!--</el-option>-->
					<!--</el-select>-->
          <el-input :value="filter.unionName" :disabled="user.unionId?true:false" placeholder="请选择公会" ></el-input>
          <i v-if="filter.unionName && !user.unionId && (!user.managerOrgs || user.managerOrgs.length == 0)" class="el-icon-error" @click.stop="clearSelectUnion"></i>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					日期：
				</div>
				<div class="content">
					<el-date-picker
				      v-model="filter.date"
				      type="month"
				      placeholder="选择月">
				    </el-date-picker>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					昵称：
				</div>
				<div class="content">
					<el-input :clearable="true" v-model="filter.nickname" placeholder="请输入昵称"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					直播ID：
				</div>
				<div class="content">
					<el-input :clearable="true" v-model="filter.thirdId" placeholder="请输入直播ID"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					薪资状态：
				</div>
				<div class="content">
					<el-select :clearable="true" v-model="filter.status" @change="" placeholder="请选择薪资状态">
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
			<div class="opt_btn">
				<el-button @click="getAgentList(1)" type="primary">查询</el-button>
				<el-button @click="resetFilter">重置</el-button>
			</div>
		</div>
		<div ref="operate" class="operate">
			<!-- <el-button @click="">批量发放</el-button> -->
			<div v-if="edit" class="opt_right" style="float:right;">
				<el-button @click="goExport">订单导出</el-button>
			</div>
		</div>
		<div class="filter_list">
			<el-table
			    ref="multipleTable"
			    :data="agentList"
			    :height="tableHeight"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="">
			    <!-- <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column> -->
			    <el-table-column
			      label="月份"
			      width="120"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.day | timesToDate('yyyy-MM') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="trackNum"
			      label="结算单号"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="平台"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.platName }}</template>
			    </el-table-column>
			    <el-table-column
			      label="公会"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.unionName }}</template>
			    </el-table-column>
			    <el-table-column
			      label="经纪人ID"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.id }}</template>
			    </el-table-column>
			    <el-table-column
			      label="经纪人名称"
			      width="120"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.nickname }}</template>
			    </el-table-column>
	<!-- 		    <el-table-column
			      label="待遇"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.payFloor }}</template>
			    </el-table-column> -->
			    <el-table-column
			      prop="actorThirdFlow"
			      label="所辖艺人流水/元"
			      width="140"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.actorThirdFlow | filterMoney }}</template>

			    </el-table-column>
			    <el-table-column
			      prop="totalSalary"
			      label="分成/元"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.totalSalary | filterMoney }}</template>

			    </el-table-column>
			    <el-table-column
			      prop="income"
			      label="应发工资/元"
			      width="120"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.income | filterMoney }}</template>
			      
			    </el-table-column>


			    <el-table-column
			    	width="120"
			      label="分成比例 %"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.shareRatio }}</template>
			    </el-table-column>

			    <el-table-column
			      label="税率 %"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.taxRatio }}</template>
			    </el-table-column>




			    <el-table-column
			      label="发放状态"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.status | salaryStatus}}</template>
			    </el-table-column>
			    <el-table-column v-if="edit" label="操作" width="180" fixed="right">
			      <template slot-scope="scope">
			      	<template v-if="scope.row.status == 0">
				        <el-button
				          size="mini"
				          @click="agreeApply(scope.$index, scope.row)">发放</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="rejectApply(scope.$index, scope.row)">拒绝</el-button>
			          </template>
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
	import {Operate} from '@/config/operate'
  import selectUnion from '@/modules/widget/select-union-v2'


  export default{
		data(){
			return {
				platList:[],
				unionList:[],
				tableHeight:200,
				orgType:[{
					uuid:"SYSTEM",
					name:"系统",
				},{
					uuid:"PLAT",
					name:"平台",
				},{
					uuid:"UNION",
					name:"公会",
				}],
				statusList:[{
					uuid:0,
					name:"待发放",
				},{
					uuid:1,
					name:"已发放",
				},{
					uuid:2,
					name:"拒绝发放",
				}],
				filter:{
					orgId:"",
					platId:"",
					unionId:"",
          unionName:"",
					date:"",
					nickname:"",
					thirdId:"",
					status:"",
				},
				limit:10,
        parentId:""
			}
		},
		computed: {
			...mapGetters({
				agentList: 'financeStore/agent/agentList',
				total: 'financeStore/actor/total',
				currentPage: 'financeStore/actor/currentPage',
				// limit: 'financeStore/actor/limit',
				user: 'userStore/user/user',
				nav: 'homeStore/home/nav',
				authorities_nav: 'userStore/user/authorities',
			}),
			edit(){
				let path = this.$route.path;
				return Operate(this.user,path,this.nav,this.authorities_nav);
			}
	    },
		methods:{
			agreeApply(index,data){
				let msg = "确定要发放薪资吗？"
				this.$confirm(msg, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	let list = [];
		        	list.push(data.uuid);
		          	this.$store.dispatch('financeStore/agent/agreeApply',{list}).then(() => {
		          		this.getAgentList();
					})
		        }).catch(() => {
		                   
		        });
			},
			rejectApply(index,data){
				let msg = "确定要拒绝发放薪资吗？"
				this.$confirm(msg, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	let list = [];
		        	list.push(data.uuid);
		          	this.$store.dispatch('financeStore/agent/rejectApply',{list}).then(() => {
		          		this.getAgentList();
					})
		        }).catch(() => {
		                   
		        });
			},
			handleSizeChange(limit){
				this.limit = limit;
				this.getAgentList(1,limit);
			},
			handleCurrentChange(page){
				this.getAgentList(page);
			},
			setHeight(){
		    	var container = this.$refs.container.offsetHeight;
		    	var filter = this.$refs.filter.offsetHeight;
		    	var operate = this.$refs.operate.offsetHeight;
		    	var page = this.$refs.page.offsetHeight;
		    	var tableHeight = container - filter - operate - page -24;
		    	console.log(tableHeight);
		    	this.tableHeight = tableHeight;
		    },
		    resetFilter(){
		    	this.filter = {
					orgId:"",
					platId:"",
					unionId:"",
            unionName:"",
					date:"",
					nickname:"",
					thirdId:"",
					status:"",
				}
				this.setDefaultOrg();
				this.getAgentList(1);
				this.getUnionList();
		    },
		    changePlat(uuid){
		    	if(uuid){
		    		this.filter.orgId = uuid;
		    	}else{
		    		this.filter.orgId = "";
		    	}
		    	this.filter.unionId = "";
		    	// this.getUnionList(uuid);
          this.parentId = uuid;
		    },
		    changeUnion(uuid){
		    	if(uuid){
		    		this.filter.orgId = uuid;
		    	}else{
		    		if(this.filter.platId){
		    			this.filter.orgId = this.filter.platId;
		    		}
		    	}
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
		    getAgentList(currentPage,limit){//获取账号列表
		    	currentPage = currentPage || this.currentPage;
		    	limit = limit || this.limit;
		    	let filter = this.filter;
				this.$store.dispatch('financeStore/agent/getAgentList',{currentPage,limit,filter}).then(() => {

				})
		    },
		    goExport(){
		    	let url = `${config_server.server_api}/salary/broker/export.json?`;
		    	let filter = this.filter;
		    	if(filter){
			      if(filter.unionId){
			        url = url +'&orgId=' + filter.unionId;
			      }else{
			        if(filter.platId){
			        	url = url +'&orgId=' + filter.platId;
			        }
			      }

			      if(filter.status || filter.status == 0){
			        url = url +'&status=' + filter.status;
			      }

			

			      if(filter.nickname){
			        url = url +'&nickname=' + filter.nickname;
			      }

			      if(filter.thirdId){
			        url = url +'&thirdId=' + filter.thirdId;

			      }
			      if(filter.date){
			        url = url +'&startDate=' + new Date(filter.date[0]).getTime();
			        url = url +'&endDate=' + new Date(filter.date[1]).getTime();
			      }
			    }
			    let requestParam = getRequestParam();
			    let token = requestParam.token;
			    if(token){
			    	url = url + '&token='+token;
			    	window.open(url);
			    }
		    },
		    getPlatList(){
		    	const orgId = this.user.orgId;
		    	this.$store.dispatch('platStore/platform/getPlatFormList',{orgId,currentPage:1,limit:50}).then((resp) => {
		    		this.platList = resp.list;
				})
		    },
		    filterUnion(key){
		    	this.filter.unionId = '';
		    	let orgId = this.user.orgId;
		    	let parentId = this.user.orgId;
			    this.$store.dispatch('groupStore/group/getGroupList',{orgId,parentId,currentPage:1,limit:50,searchKey:key}).then((resp) => {
			    		this.unionList = resp.list;
					})
		    },
		    getUnionList(parentId){
		    	let orgId = this.user.orgId;
		    	parentId = parentId ||  this.user.orgId;
		    	this.$store.dispatch('groupStore/group/getGroupList',{orgId,parentId,currentPage:1,limit:50}).then((resp) => {
		    		this.unionList = resp.list;
				})
		    },
			setDefaultOrg(){
		    	if(this.user){
		    		this.filter.platId = this.user.platId;
		    		this.filter.unionId = this.user.unionId;
            this.filter.unionName = this.user.unionName;
            if(!this.user.unionId && this.user.managerOrgs && this.user.managerOrgs.length > 0){
              this.filter.unionId = this.user.managerOrgs[0].uuid;
              this.filter.unionName = this.user.managerOrgs[0].name;
            }
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
				this.getAgentList();
	    	})
	    },
		created(){

			this.getPlatList();
			this.getUnionList();

		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.account_list{
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
            position: relative;
            .el-icon-error{
              position: absolute;
              right: 11px;
              top: 10px;
              font-size: 12px;
              color: #c0c4cb;
              display: none;
            }
            &:hover{
              .el-icon-error{
                display: block !important;
              }
            }
  					/deep/ .el-select{
			  			width: 150px;
			  		}
			  		/deep/ .el-input{
			  			width: 150px;
			  		}
			  		/deep/ .el-input.is-disabled .el-input__inner{
			  			height: 30px !important;
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
  		.count_analyze{
  			display: flex;
  			flex-direction: row;
  			color: #606266;
  			padding: 10px;
  			.items{
  				flex:1;
  				.top,.bottom{
  					text-align: left;
  				}
  				.bottom{
  					margin-top: 6px;
  				}
  			}
  		}
  		.page{
  			padding: 10px 0;
  		}
  	}
</style>
