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
				<div class="content">
					<el-select :clearable="true" v-model="filter.unionId" @change="changeUnion" placeholder="请选择公会">
					    <el-option
							v-for="item in unionList"
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
					日期：
				</div>
				<div class="content">
					<el-date-picker
				      v-model="filter.date"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
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
					动账类型：
				</div>
				<div class="content">
					<el-select :clearable="true" v-model="filter.type" @change="" placeholder="请选择动账类型">
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
				<el-button @click="getFlowList(1)" type="primary">查询</el-button>
				<el-button @click="resetFilter">重置</el-button>
			</div>
		</div>
		<div ref="operate" class="operate">
			<div class="opt_right" v-if="edit" style="float:right;">
				<el-button @click="">账单导出</el-button>
			</div>
		</div>
		<div class="filter_list">
			<el-table
			    ref="multipleTable"
			    :data="flowList"
			    :height="tableHeight"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="">
		<!-- 	    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column> -->
			    <el-table-column
			      label="日期"
			      width="120"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.createDate | timesToDate('yyyy-MM-dd') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="trackNum"
			      label="账单号"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="平台"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.platName }}</template>
			    </el-table-column>
	<!-- 		    <el-table-column
			      prop="platId"
			      label="平台ID"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.platId }}</template>
			    </el-table-column> -->
			    <el-table-column
			      prop="unionName"
			      label="公会"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.unionName }}</template>
			    </el-table-column>
			    <el-table-column
			      label="昵称"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.nickname }}</template>
			    </el-table-column>
			    <el-table-column
			      label="真实姓名"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.identityName }}</template>
			    </el-table-column>
			    <el-table-column
			      label="待遇"
			      show-overflow-tooltip>
				   <template slot-scope="scope">{{ scope.row.creator.payFloor }}</template>
			    </el-table-column>
			    <el-table-column
			      label="动账类型"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.type == 0?"入账":"提现" }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="moneyBase"
			      label="动账基数"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="moneyBefore"
			      label="动账前余额/元"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="moneyNum"
			      label="动账/元"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.type == 0?scope.row.moneyNum:"-"+scope.row.moneyNum }}</template>

			    </el-table-column>
			    <el-table-column
			      prop="moneyAfter"
			      label="动账后余额/元"
			      width="120"
			      show-overflow-tooltip>
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
					name:"入账",
				},{
					uuid:1,
					name:"提现",
				}],
				filter:{
					orgId:"",
					platId:"",
					unionId:"",
					date:"",
					nickname:"",
					thirdId:"",
					type:"",
				},
				limit:10
			}
		},
		computed: {
			...mapGetters({
				flowList: 'financeStore/flow/flowList',
				total: 'financeStore/flow/total',
				currentPage: 'financeStore/flow/currentPage',
				// limit: 'financeStore/flow/limit',
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
			handleDelete(index,data){
				
			},
			handleSizeChange(limit){
				this.limit = limit;
				this.getFlowList(1,limit);
			},
			handleCurrentChange(page){
				this.getFlowList(page);
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
					date:"",
					nickname:"",
					thirdId:"",
					type:"",
				}
				this.getFlowList(1);
				this.getUnionList();
		    },
		    changePlat(uuid){
		    	if(uuid){
		    		this.filter.orgId = uuid;
		    	}else{
		    		this.filter.orgId = "";
		    	}
		    	this.filter.unionId = "";
		    	this.getUnionList(uuid);
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
		    getFlowList(currentPage,limit){//获取账号列表
		    	currentPage = currentPage || this.currentPage;
		    	limit = limit || this.limit;
		    	let filter = this.filter;
				this.$store.dispatch('financeStore/flow/getFlowList',{currentPage,limit,filter}).then(() => {

				})
		    },
		    getPlatList(){
		    	const orgId = this.user.orgId;
		    	this.$store.dispatch('platStore/platform/getPlatFormList',{orgId,currentPage:1,limit:50}).then((resp) => {
		    		this.platList = resp.list;
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
		    		if(!this.user.unionId && this.user.managerOrgs && this.user.managerOrgs.length > 0){
		    			this.filter.unionId = this.user.managerOrgs[0].uuid;
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
				this.getFlowList();
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
