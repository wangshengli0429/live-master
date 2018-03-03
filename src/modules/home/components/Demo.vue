<template>
	<div class="box">
		this.is demo

		<el-button>默认按钮</el-button>
		<el-button type="primary" @click="goSwitch">主要按钮</el-button>
		<el-button type="success">成功按钮</el-button>
		<el-button type="info">信息按钮</el-button>
		<el-button type="warning">警告按钮</el-button>
		<el-button type="danger">危险按钮</el-button>





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
	.box{
		input{
			width: 200px;
			background: pink;
		}
	}

</style>






