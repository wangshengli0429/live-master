<template>
	<div ref="container" class="agent_list">
		<div ref="filter" class="filter clearfix">
			<div class="filter_items">
				<div class="name">
					归属平台：
				</div>
				<div class="content">
					<el-input v-model="filter.platform" placeholder="请输入归属平台"></el-input>
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
					经纪人名称：
				</div>
				<div class="content">
					<el-input v-model="filter.name" placeholder="请输入经纪人名称"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					经纪人ID：
				</div>
				<div class="content">
					<el-input v-model="filter.uuid" placeholder="请输入经纪人ID"></el-input>
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
			    :data="agentList"
			    :height="tableHeight"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      prop="uuid"
			      label="经纪人ID">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="经纪人名称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      width="120">
				    <template slot-scope="scope">{{ scope.row.create_date | timesToDate('yyyy-MM-dd') }}</template>
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
			      prop="agent_account"
			      label="经纪人账号"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="divided"
			      label="分成比例"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="tax"
			      label="个税"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="live_nick_name"
			      label="主播昵称"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="live_uuid"
			      label="主播直播ID"
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
				agentList:[],
				accountGroupList:[],
				currentPage:1,
				tableHeight:200,
				platformList:[{
					uuid:"system",
					name:"平台1",
				},{
					uuid:"platform",
					name:"平台12",
				},{
					uuid:"group",
					name:"平台13",
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
					uuid:"",
					group:"",
					status:"",
					platform:"",
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
					name:"公会名称"+(i+1),
					create_date:new Date().getTime(),
					platform:"平台"+(i+1),
					group:"公会"+(i+1),
					status:"已启用",
					agent_account:"wddds2",
					divided:"40%",
					tax:"5%",
					live_nick_name:"张三丰",
					live_uuid:"DouYu123"
				}
				list.push(temp);
			}
			this.agentList = list;
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.agent_list{
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
