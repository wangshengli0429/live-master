<template>
	<div ref="container" class="account_group">
		<div ref="operate" class="operate">
			<el-button @click="handleEdit">添加</el-button>
			<el-button type="danger">删除</el-button>
		</div>
		<div class="account_group_list">
			<el-table
			    ref="multipleTable"
			    :data="groupList"
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
			      label="组名称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="创建时间"
			      width="120">
				    <template slot-scope="scope">{{ scope.row.create_date | timesToDate('yyyy-MM-dd') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="level"
			      label="数据级别"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="limit"
			      label="权限"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="状态"
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
				groupList:[],
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
					name:"平台管理员"+(i+1),
					create_date:new Date().getTime(),
					level:"平台",
					limit:"已配置",
					status:"已启用",
				}
				list.push(temp);
			}
			this.groupList = list;
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.account_group{
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
