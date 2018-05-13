<template>
	<div ref="container" class="logs_wrapper">
		<div class="logs_list">
			<ul>
				<li v-for="items in logs">
					<span class="time">{{items.createDate | timesToDate('yyyy-MM-dd HH:mm:ss')}}</span>
					用户
					<span class="items"> {{items.creator.nickname}} </span>在
					<span class="items">{{logs_maps[items.subjectType]}}</span>
					菜单进行了操作
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
				logs_types: 'logsStore/logs/logs_types',
				logs_maps: 'logsStore/logs/logs_maps',
				user: 'userStore/user/user',
			})
	    },
		methods:{
			
			handleSizeChange(limit){
				this.getLogsList(1,limit);
			},
			handleCurrentChange(page){
				this.getLogsList(page);
			},
			
		    getLogsList(currentPage,limit){//获取账号列表
		    	currentPage = currentPage || this.currentPage;
		    	limit = limit || this.limit;
		    	if(!this.logs_types || this.logs_types.length == 0){
		    		this.$store.dispatch('logsStore/logs/getLogsTypes',{}).then(() => {
		    			this.$store.dispatch('logsStore/logs/getLogsList',{currentPage,limit}).then(() => {

						})
					})
		    	}else{
		    		this.$store.dispatch('logsStore/logs/getLogsList',{currentPage,limit}).then(() => {

					})
		    	}
				
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
				    .time{
				    	margin-right:6px;
				    }
				    .items{
				    	color:@COMMON_BLUE;
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
