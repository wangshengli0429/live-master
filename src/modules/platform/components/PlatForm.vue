<template>
	<div ref="container" class="platform">
		<div ref="operate" class="operate">
			<el-button type="danger">删除</el-button>
		</div>
		<div class="platform_list">
			<el-table
			    ref="multipleTable"
			    :data="platformList"
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
			      label="平台ID"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="平台名称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      width="120">
				    <template slot-scope="scope">{{ scope.row.create_date | timesToDate('yyyy-MM-dd') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="divided"
			      label="平台分成"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="threshold"
			      label="入账阀值"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="account_group"
			      label="账号组"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="manager.account"
			      label="管理员账号"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="manager.name"
			      label="管理员"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="manager.mobile"
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
	</div>
</template>
<script>
	import newAccountGroup from '@/modules/widget/new-account-group'
	export default{
		data(){
			return {
				platformList:[],
				tableHeight:250,

			}
		},
		methods:{
			handleEdit(){
				newAccountGroup({
					
				})
			},
			handleDelete(){

			},
			setHeight(){
		    	var container = this.$refs.container.offsetHeight;
		    	var operate = this.$refs.operate.offsetHeight;
		    	var tableHeight = container - operate -24;
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
					name:"平台"+(i+1),
					create_date:new Date().getTime(),
					divided:"40%",
					threshold:"10000",
					status:"已启用",
					account_group:"系统",
					manager:{
						account:"wedddd",
						name:"张飒",
						mobile:"18311322222"
					}
				}
				list.push(temp);
			}
			this.platformList = list;
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.platform{
  		padding-left: 20px;
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		bottom: 0;
  		overflow: auto;
  		.operate{
  			margin-bottom: 20px;
  		}
  	}
</style>
