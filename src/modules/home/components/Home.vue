<template>
	<div class="container">
		<div class="aside">
			<ul>
				<li>导航一</li>
				<li>导航二</li>
				<li>导航三</li>
				<li>导航四</li>
			</ul>
		</div>
		<div class="wrapper">
    		<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
		methods:{
			...mapActions({
		        switchScope: 'homeStore/home/switchScope',
		    }),
		    goSwitch(){
		    	this.switchScope('task');
		    }
		}

	}
</script>


<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
	.container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		*{
			box-sizing: border-box;
		}
		.aside{
			width: 300px;
			background: #f4f4f4;
			flex-shrink: 0;
			border-right: 1px solid #e4e4e4;
			ul{
				li{
					height: 40px;
				    line-height: 40px;
				    padding: 0 16px 0 20px;
				    cursor: pointer;
				    font-size: 14px;
				    &.active,&:hover{
				    	background: #fff;
				    }
				}
			}
		}
		.wrapper{
			flex-grow: 1;
		}
	}

</style>






