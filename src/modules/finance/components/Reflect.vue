<template>
	<div ref="container" class="account_list">
		<div ref="filter" class="filter clearfix">
			<div class="filter_items">
				<div class="name">
					平台名称：
				</div>
				<div class="content">
					<el-select :clearable="true" v-model="filter.platId" @change="changePlat" placeholder="请选择平台">
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
					<el-input :clearable="true" v-model="filter.uuid" placeholder="请输入直播ID"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					提现状态：
				</div>
				<div class="content">
					<el-select :clearable="true" v-model="filter.status" @change="" placeholder="请选择提现状态">
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
				<el-button @click="getAccountList(1)" type="primary">查询</el-button>
				<el-button @click="resetFilter">重置</el-button>
			</div>
		</div>
		<div ref="operate" class="operate">
			<el-button @click="">批量通过	</el-button>
			<el-button @click="">批量打款</el-button>
			<el-button @click="" type="danger">批量拒绝</el-button>
			<div class="opt_right" style="float:right;">
				<el-button @click="">订单导出</el-button>
			</div>
		</div>
		<div class="filter_list">
			<el-table v
			    ref="multipleTable"
			    :data="accountList"
			    :height="tableHeight"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="申请日期"
			      width="120"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.createDate | timesToDate('yyyy-MM-dd') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="orderId"
			      label="提现单号"
			      width="120"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="platName"
			      label="平台"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="platId"
			      label="平台ID"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="unionName"
			      label="公会"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="nickname"
			      label="昵称"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="真实姓名"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="reflect_account"
			      label="提现账号"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="cash_amount"
			      label="可提现金额"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="amount"
			      label="提现金额"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="balance"
			      label="提现后金额"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      label="提现状态"
			      show-overflow-tooltip>
				    <template slot-scope="scope">{{ scope.row.status | reflectStatus}}</template>
			    </el-table-column>
			    
			    <el-table-column label="操作" width="180" fixed="right">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">通过</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
			      </template>
			    </el-table-column>





			  </el-table>
			</div>
			<div ref="page" class="page">
				<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="[20, 30, 40, 50]"
			      :page-size="limit"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
			</div>


	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
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
					name:"待审核",
				},{
					uuid:1,
					name:"待打款",
				},{
					uuid:2,
					name:"提现成功",
				},{
					uuid:3,
					name:"自动提现",
				},{
					uuid:4,
					name:"被拒绝",
				}],
				filter:{
					orgId:"",
					platId:"",
					unionId:"",
					date:"",
					nickname:"",
					uuid:"",
					status:"",
				},
				accountList:[]
			}
		},
		computed: {
			...mapGetters({
				// accountList: 'limitStore/account/accountList',
				total: 'financeStore/reflect/total',
				currentPage: 'financeStore/reflect/currentPage',
				limit: 'financeStore/reflect/limit',
				user: 'userStore/user/user',
			})
	    },
		methods:{
			handleDelete(index,data){
				
			},
			handleSizeChange(limit){
				this.getAccountList(1,limit);
			},
			handleCurrentChange(page){
				this.getAccountList(page);
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
					uuid:"",
					status:"",
				}
				this.getAccountList(1);
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
		    getAccountList(currentPage,limit){//获取账号列表
		  //   	currentPage = currentPage || this.currentPage;
		  //   	limit = limit || this.limit;
		  //   	let filter = this.filter;
				// this.$store.dispatch('limitStore/account/getAccountList',{currentPage,limit,filter}).then(() => {

				// })

				var list = [];
				for(var i=0;i<50;i++){
					var temp = {
						createDate:new Date().getTime(),
						orderId:'num'+i,
						platName:"斗鱼Tv",
						platId:"2",
						id:"DouY00"+i,
						unionName:"开心公会",
						unionId:"23",
						nickname:"sniper"+i,
						name:"黄磊",
						reflect_account:"AD326521325",
						cash_amount:"10000",
						amount:"5000",
						balance:"5000",
						status:0,
					}
					list.push(temp);
				}

				this.accountList = list;


		    },
		    getPlatList(){
		    	const orgId = this.user.orgId;
		    	this.$store.dispatch('platStore/platform/getPlatFormList',{orgId,currentPage:1,limit:50}).then((resp) => {
		    		this.platList = resp.list;
				})
		    },
		    getUnionList(parentId){
		    	let orgId = this.user.orgId;
		    	this.$store.dispatch('groupStore/group/getGroupList',{orgId,parentId,currentPage:1,limit:50}).then((resp) => {
		    		this.unionList = resp.list;
				})
		    },
		},
		mounted(){
	    	setTimeout(() => {
	    		this.setHeight();
	    	})
	    },
		created(){
			this.getAccountList();

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
