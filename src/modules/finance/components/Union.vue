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
					结算状态：
				</div>
				<div class="content">
					<el-select :clearable="true" v-model="filter.status" @change="" placeholder="请选择结算状态">
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
				<el-button @click="getUnionSalaryList(1)" type="primary">查询</el-button>
				<el-button @click="resetFilter">重置</el-button>
			</div>
		</div>
		<div ref="operate" class="operate">
			<!-- <div class="opt_right" style="float:right;">
				<el-button @click="">导出账单</el-button>
			</div>
			<div class="opt_right" style="float:right;">
				<el-button @click="">批量结算</el-button>
			</div> -->
		</div>
		<div class="filter_list">
			<el-table
			    ref="multipleTable"
			    :data="salaryList"
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
				    <template slot-scope="scope">{{ scope.row.createDate | timesToDate('yyyy-MM') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="trackNum"
			      label="账单号"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="平台名称"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.org && scope.row.org.parentName}}</template>
			    </el-table-column>
			    <el-table-column
			      label="公会名称"
			      show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.org && scope.row.org.name}}</template>
			    </el-table-column>
			    <el-table-column
			      label="公会ID"
			      show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.org && scope.row.org.uuid}}</template>
			    </el-table-column>
			    <el-table-column
			      prop="unionThirdFlow"
			      label="月流水/元"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="unionPlatFlow"
			      label="平台入账/元"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="分成%"
			      show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.org && scope.row.org.shareRatio}}</template>
			    </el-table-column>
			    <el-table-column
			      label="税点%"
			      show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.org && scope.row.org.taxRatio}}</template>
			    </el-table-column>
			    <el-table-column
			      prop="income"
			      label="艺人工资代发"
			      show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.autoPay | filterAutoPay}}</template>
			    </el-table-column>
			    <el-table-column
			      prop="income"
			      label="公会应结算"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="结算状态"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.status == 0?'未结算':'已结算'}}</template>
			    </el-table-column>
			    <el-table-column v-if="edit" label="操作" width="180" fixed="right">
			      <template slot-scope="scope">
			      	<template v-if="scope.row.status == 0">
				        <el-button
				          size="mini"
				          @click="agreeApply(scope.$index, scope.row)">结算</el-button>
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

	export default{
		data(){
			return {
				platList:[],
				unionList:[],
				tableHeight:200,
				statusList:[{
					uuid:'',
					name:"全部",
				},{
					uuid:1,
					name:"已结算",
				},{
					uuid:0,
					name:"未结算",
				}],
				filter:{
					orgId:"",
					platId:"",
					unionId:"",
					date:"",
					nickname:"",
					thirdId:"",
					status:"",
				},
				limit:10
			}
		},
		computed: {
			...mapGetters({
				salaryList: 'financeStore/union/salaryList',
				total: 'financeStore/union/total',
				currentPage: 'financeStore/union/currentPage',
				// limit: 'financeStore/union/limit',
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
				let msg = "确定要结算薪资吗？"
				this.$confirm(msg, '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	let list = [];
		        	list.push(data.uuid);
		          	this.$store.dispatch('financeStore/union/agreeApply',{list}).then(() => {
		          		this.getUnionSalaryList();
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
		          	this.$store.dispatch('financeStore/union/rejectApply',{list}).then(() => {
		          		this.getUnionSalaryList();
					})
		        }).catch(() => {
		                   
		        });
			},
			handleSizeChange(limit){
				this.limit = limit;
				this.getUnionSalaryList(1,limit);
			},
			handleCurrentChange(page){
				this.getUnionSalaryList(page);
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
					status:"",
				}
				this.setDefaultOrg();
				this.getUnionSalaryList(1);
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
		    getUnionSalaryList(currentPage,limit){//获取账号列表
		    	currentPage = currentPage || this.currentPage;
		    	limit = limit || this.limit;
		    	let filter = this.filter;
				this.$store.dispatch('financeStore/union/getUnionSalaryList',{currentPage,limit,filter}).then(() => {

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
				this.getUnionSalaryList();

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
