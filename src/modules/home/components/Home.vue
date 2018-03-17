<template>
	<div class="app_wrapper">
		<div class="header">
			<div class="logo">
				星火传媒
			</div>
			<div class="user">
				{{user.nickname}}<i class="el-icon el-icon-caret-bottom"></i>
			</div>
		</div>
		<div class="container">
			<div class="aside">
				<ul class="root">
					<nav-items v-for="items in nav" :key="items.uuid" :items="items"></nav-items>
				</ul>
			</div>
			<div class="wrapper">
				<div class="bread_crumb">
					<bread-crumb></bread-crumb>
				</div>
				<div class="router_container">
	    			<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
	

</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import BreadCrumb from './BreadCrumb';
	import NavItems from './NavItems'

	export default{
		components:{
			BreadCrumb,
			NavItems
		},
		computed: {
			...mapGetters({
				user: 'userStore/user/user',
			})
	    },
		data(){
			return {
				nav:[{
						name:"我的信息",
						path:"/information",
						uuid:"nav_information"
					},{
						name:"账号与权限",
						uuid:"nav_limit",
						children:[{
								name:"账号管理",
								path:"/limit/account",
								uuid:"nav_limit_account",
								parent:{
									name:"账号与权限",
									uuid:"nav_limit",
								}
							},{
								name:"账号组管理",
								path:"/limit/account_group",
								uuid:"nav_limit_account_group",
								parent:{
									name:"账号与权限",
									uuid:"nav_limit",
								}
							}
						]
					},{
						name:"平台管理",
						path:"/platform",
						uuid:"nav_platform"
					},{
						name:"公会管理",
						path:"/group",
						uuid:"nav_group"
					},{
						name:"艺人管理",
						uuid:"nav_actor",
						children:[{
								name:"艺人分配",
								path:"/actor/assign",
								uuid:"nav_actor_assign",
								parent:{
									name:"艺人管理",
									uuid:"nav_actor",
								}
							},{
								name:"艺人信息管理",
								path:"/actor/management",
								uuid:"nav_actor_management",
								parent:{
									name:"艺人管理",
									uuid:"nav_actor",
								}
							}
						]
					},{
						name:"经纪人管理",
						path:"/agent",
						uuid:"nav_agent",

					},{
						name:"财务管理",
						uuid:"nav_finance",
						children:[{
								name:"入账管理",
								path:"/finance/account",
								uuid:"nav_finance_account",
								parent:{
									name:"财务管理",
									uuid:"nav_finance",
								}
							},{
								name:"财务流水",
								path:"/finance/flow",
								uuid:"nav_finance_flow",
								parent:{
									name:"财务管理",
									uuid:"nav_finance",
								}
							},{
								
								name:"提现管理",
								path:"/finance/reflect",
								uuid:"nav_finance_reflect",
								parent:{
									name:"财务管理",
									uuid:"nav_finance",
								}
							},{
								
								name:"艺人薪资结算",
								path:"/finance/actor",
								uuid:"nav_finance_actor",
								parent:{
									name:"财务管理",
									uuid:"nav_finance",
								}
							},{
								
								name:"经纪人薪资结算",
								path:"/finance/agent",
								uuid:"nav_finance_agent",
								parent:{
									name:"财务管理",
									uuid:"nav_finance",
								}
							}
						]
					},{
						name:"统计分析",
						path:"/analyze",
						uuid:"nav_analyze",
					},{
						name:"操作日志",
						path:"/logs",
						uuid:"nav_logs",
					},
				]
			}
		},
		methods:{
			...mapActions({
		    }),
		    switchNav(){
		    }
		}

	}
</script>


<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.app_wrapper{
  		width: 100%;
  		height: 100%;
  		display: flex;
  		flex-direction: column;
  		.header{
  			height: 48px;
  			line-height: 48px;
  			width: 100%;
  			padding: 0 20px;
  			flex-shrink: 0;
			min-height: 48px;
		    background-color: hsla(0,0%,100%,.95);
		    box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
		    position: relative;
		    z-index: 10;
		    box-sizing: border-box;
		    .logo{
		    	float: left;
		    	font-size: 20px;
		    }
		    .user{
		    	cursor: pointer;
		    	float: right;
		    	.el-icon{
		    		margin-left: 4px;
		    	}
		    }
  		}
  		.container{
  			flex-grow: 1;
			display: flex;
			flex-direction: row;
			*{
				box-sizing: border-box;
			}
			.aside{
				width: 240px;
				background: #f4f4f4;
				flex-shrink: 0;
				border-right: 1px solid #e4e4e4;
				position: relative;
				ul{
					&.root{
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						overflow: auto;
					}
					/deep/ li{
						.title{
							height: 40px;
						    line-height: 40px;
						    padding: 0 16px 0 20px;
						    cursor: pointer;
						    font-size: 14px;
						    position: relative;
						    &.active,&:hover{
						    	background: #fff;
						    }
						    .el-icon{
								position: absolute;
								right: 4px;
								top: 12px;
								font-size: 16px;
							}
						}
						ul{
							display: none;
						}
						&.expand{
							ul{
								display: block;
							}
						}
					}
					/deep/ ul{
						li{
							.title{
								padding-left: 40px;
							}
						}
					}
				}
			}
			.wrapper{
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				.bread_crumb{
					height: 40px;
					flex-shrink: 0;
				}
				.router_container{
					flex-grow: 1;
					position: relative;
					height: 0;
				}
			}
		}
  	}
	

</style>






