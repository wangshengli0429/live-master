<template>
	<div class="child_container">
		{{user}}
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
		computed: {
			...mapGetters({
				user: 'userStore/user/user',
			})
	    },
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.child_container{
  		padding: 20px;
  		box-sizing: border-box;
  	}




</style>

