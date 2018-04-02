<template>
	<div ref="container" class="logs_wrapper">
		<div class="logs_list">
			<ul>
				<li>
					2017-12-26 15:32 张三申请提现
				</li>
				<li>
					2017-12-26 15:32 李四新增了账号组 系统管理员
				</li>
			</ul>
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

			}
		},
		computed: {
			...mapGetters({
				logs: 'logsStore/logs/logs',
				total: 'logsStore/logs/total',
				currentPage: 'logsStore/logs/currentPage',
				limit: 'logsStore/logs/limit',
				user: 'userStore/user/user',
			})
	    },
		methods:{
			
			handleSizeChange(limit){
				this.getAgentList(1,limit);
			},
			handleCurrentChange(page){
				this.getAgentList(page);
			},
			
		    getLogsList(currentPage,limit){//获取账号列表
		    	currentPage = currentPage || this.currentPage;
		    	limit = limit || this.limit;
				this.$store.dispatch('logsStore/logs/getLogsList',{currentPage,limit}).then(() => {

				})
		    },
		    
		},
		mounted(){
	    	
	    },
		created(){
			this.getLogsList();
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.logs_wrapper{
  		padding:0 20px;
  		position: absolute;
  		left: 0;
  		top: 0;
  		right: 0;
  		bottom: 0;
  		overflow: auto;
  		display: flex;
  		flex-direction: column;
  		.logs_list{
  			flex-grow: 1;
  			height: 0;
  			ul{
				background: #f4f4f4;
				padding: 12px 10px;
	  			li{
	  				height: 39px;
				    line-height: 39px;
				    border-bottom: 1px solid #f4f4f4;
				    font-size: 12px;
				    color: #333;
				    padding-left: 6px;
				    background: #fff;
				    &:hover{
				    	background: #eaf5ff;
				    }
	  			}
	  		}
  		}
  		
  		
  		.page{
  			padding: 10px 0;
  			flex-shrink: 0;
  		}
  	}
</style>
