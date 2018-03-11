<template>
	<div ref="container" class="account_list">
		<div ref="filter" class="filter clearfix">
			<div class="filter_items">
				<div class="name">
					账号名称：
				</div>
				<div class="content">
					<el-input v-model="filter.name" placeholder="请输入账号名称"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					账号组：
				</div>
				<div class="content">
					<el-select v-model="filter.account_group" @change="" placeholder="请选择账号组">
					    <el-option
							v-for="item in accountGroupList"
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
					数据级别：
				</div>
				<div class="content">
					<el-select v-model="filter.level" @change="" placeholder="请选择数据级别">
					    <el-option
							v-for="item in levelList"
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
					平台名称：
				</div>
				<div class="content">
					<el-input v-model="filter.platform" placeholder="请输入平台名称"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					公会名称：
				</div>
				<div class="content">
					<el-input v-model="filter.group" placeholder="请输入公会名称"></el-input>
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
					<el-input v-model="filter.group" placeholder="请输入管理员名称"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					联系方式：
				</div>
				<div class="content">
					<el-input v-model="filter.group" placeholder="请输入管理员联系方式"></el-input>
				</div>
			</div>

			<div class="opt_btn">
				<el-button @click="" type="primary">查询</el-button>
			</div>
		</div>
		<div ref="operate" class="operate">
			<el-button type="danger">删除</el-button>
		</div>
		<div class="filter_list">
			<el-table
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
			      prop="name"
			      label="账号名称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      width="120">
				    <template slot-scope="scope">{{ scope.row.create_date | timesToDate('yyyy-MM-dd') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="account_group"
			      label="账号组"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="level"
			      label="数据级别"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="platform"
			      label="平台名称"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="group"
			      label="公会名称"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="manager"
			      label="管理员"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="manager_mobile"
			      label="联系电话"
			      show-overflow-tooltip>
			    </el-table-column>

			    <el-table-column label="操作" width="180" fixed="right">
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
			      :page-sizes="[100, 200, 300, 400]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="400">
			    </el-pagination>
			</div>


	</div>
</template>
<script>
	export default{
		data(){
			return {
				accountList:[],
				accountGroupList:[],
				currentPage:1,
				tableHeight:200,
				levelList:[{
					uuid:"system",
					name:"系统",
				},{
					uuid:"platform",
					name:"平台",
				},{
					uuid:"group",
					name:"公会",
				}],
				statusList:[{
					uuid:"stop",
					name:"已停用",
				},{
					uuid:"start",
					name:"已启用",
				}],
				filter:{
					name:"",
					account_group:"",
					status:"",
					platform:"",
					group:"",
					manager:"",
					manager_mobile:""
				}
			}
		},
		methods:{
			handleEdit(){
				
			},
			handleDelete(){

			},
			handleSizeChange(){

			},
			handleCurrentChange(){

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
		},
		mounted(){
	    	setTimeout(() => {
	    		this.setHeight();
	    	})
	    },
		created(){
			const list = []
			for(var i=0;i<30;i++){
				var temp = {
					uuid:i+1,
					name:"账号名称"+(i+1),
					create_date:new Date().getTime(),
					password:"123456",
					account_group:"平台组1",
					level:"平台",
					platform:"平台"+(i+1),
					group:"公会"+(i+1),
					status:"已启用",
					manager:"管理员1",
					manager_mobile:"18311344273",

				}
				list.push(temp);
			}
			this.accountList = list;
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
