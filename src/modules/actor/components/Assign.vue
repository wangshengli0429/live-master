<template>
	<div class="actor_assign">
<!-- 		<el-select v-model="platform" placeholder="请选择">
		    <el-option
				v-for="item in options"
				:key="item.uuid"
				:label="item.label"
				:value="item.value">
		    </el-option>
		</el-select> -->
	</div>
</template>
<script>
	export default{
		data(){
			return {
				platform:""
			}
		}
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.actor_assign{
  		padding-left: 20px;

  	}
</style>
