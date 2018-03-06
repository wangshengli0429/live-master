<template>
	<div ref="container" class="actor_assign">
		<div ref="filter" class="filter clearfix">
			<div class="filter_items">
				<div class="name">
					平台：
				</div>
				<div class="content">
					<el-select v-model="filter.platform" @change="" placeholder="请选择平台">
					    <el-option
							v-for="item in platFromList"
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
					工会：
				</div>
				<div class="content">
					<el-select v-model="filter.group" @change="" placeholder="请选择工会">
					    <el-option
							v-for="item in groupList"
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
					经纪人：
				</div>
				<div class="content">
					<el-select v-model="filter.agent" @change="" placeholder="请选择经纪人">
					    <el-option
							v-for="item in agentList"
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
					ID：
				</div>
				<div class="content">
					<el-input v-model="filter.id" placeholder="请输入ID"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					昵称：
				</div>
				<div class="content">
					<el-input v-model="filter.nick_name" placeholder="请输入昵称"></el-input>
				</div>
			</div>
			<div class="filter_items">
				<div class="name">
					直播平台ID：
				</div>
				<div class="content">
					<el-input v-model="filter.live_id" placeholder="请输入直播平台ID"></el-input>
				</div>
			</div>
			<div class="opt_btn">
				<el-button @click="goFilter" type="primary">查询</el-button>
			</div>
		</div>
		<div ref="operate" class="operate">
			<el-button @click="" type="danger">删除</el-button>
		</div>

		<div class="filter_list">
			<el-table
			    ref="multipleTable"
			    :data="actorList"
			    :height="tableHeight"
			    stripe
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			    	type="selection"
			    	fixed="left"
			    	width="55">
			    </el-table-column>
			    <el-table-column
			    	prop="id"
			    	label="ID">
			    </el-table-column>
			    <el-table-column
			      label="入驻时间"
			      width="122">
			      <template slot-scope="scope">{{ scope.row.create_date | timesToDate('yyyy-MM-dd') }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="platform"
			      label="平台"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="nick_name"
			      label="平台昵称"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="plat_id"
			      label="平台ID"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="group"
			      label="工会"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="agent"
			      label="经纪人"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="真实姓名"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="mobile"
			      label="联系方式"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="settlement_method"
			      label="结算方式"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="treatment"
			      label="待遇"
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
		<div ref="page" class="page">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage4"
		      :page-sizes="[100, 200, 300, 400]"
		      :page-size="100"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400">
		    </el-pagination>
		</div>
	
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import ModifyActor from '@/modules/widget/modify-actor'


	export default{
		data(){
			return {
				filter:{
					platform:"",
					group:"",
					agent:"",
					status:"",
					id:"",
					nick_name:"",
					live_id:"",
				},
				statusList:[{
					name:"已分配",
					uuid:"assigned"
				},{
					name:"未分配",
					uuid:"unallocated"
				}],
				multipleSelection:[],
				tableHeight:250,
				currentPage4:2
			}
		},
		computed: {
			...mapGetters({
				platFromList: 'actorStore/actor/platFromList',
				groupList: 'actorStore/actor/groupList',
				agentList: 'actorStore/actor/agentList',
				actorList: 'actorStore/actor/actorList',
			})
	    },

	    methods:{
	    	...mapActions({
				getPlatFormList: 'actorStore/actor/getPlatFormList',
				getGroupList: 'actorStore/actor/getGroupList',
				getAgentList: 'actorStore/actor/getAgentList',
				getActorList: 'actorStore/actor/getActorList',



		    }),
	    	goFilter(){
	    		console.log(this.filter)
	    	},
	    	handleEdit(){
	    		ModifyActor({
	    			
	    		})
	    	},
	    	handleSelectionChange(val) {
		        this.multipleSelection = val;
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
		    handleSizeChange(){

		    },
		    handleCurrentChange(){

		    }
	    },
	    mounted(){
	    	setTimeout(() => {
	    		this.setHeight();
	    	})
	    },
	    created(){
	    	this.getPlatFormList();
	    	this.getGroupList();
	    	this.getAgentList();
	    	this.getActorList();
	    },
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.actor_assign{
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
