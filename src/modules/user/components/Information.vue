<template>
	<div class="user_info">
		<div class="items">
			<div class="name">名字</div>
			<div class="content">
				<el-input :value="user.nickname" placeholder="" :readonly="true"></el-input>
			</div>
		</div>
		<div class="items">
			<div class="name">登录账号</div>
			<div class="content">
				<el-input :value="user.loginName" placeholder="" :readonly="true"></el-input>
			</div>
		</div>
		<div class="items">
			<div class="name">手机号</div>
			<div class="content">
				<el-input :value="user.mobile" placeholder="" :readonly="true"></el-input>
			</div>
		</div>
		<div class="items">
			<div class="name">所属平台</div>
			<div class="content">
				<el-input :value="user.platName" placeholder="" :readonly="true"></el-input>
			</div>
		</div>
		<div class="items">
			<div class="name">所属公会</div>
			<div class="content">
				<el-input :value="user.unionName" placeholder="" :readonly="true"></el-input>
			</div>
		</div>
		<div class="items">
			<div class="name">权限</div>
			<div class="content">
				<el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                     placeholder="设置权限" :value="filterLimit" :readonly="true"></el-input>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	export default{
		computed: {
			...mapGetters({
				user: 'userStore/user/user',
				authorities: 'userStore/user/authorities',
			}),
			filterLimit(){
				if(this.user.userType == 'SUPER_ADMIN'){
					return '超级管理员';
				}else{
					var result = [];
	                if(this.authorities && this.authorities.length > 0){
	                    for(var items of this.authorities){
	                        if(items.readStatus || items.writeStatus){
	                            result.push(items.summary);
	                        }
	                    }
	                }
	                return result.join('，');
				}
            }
	    },
	}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  	@import "~@/config/config.less";
  	.user_info{
  		padding: 20px;
  		box-sizing: border-box;
  		width: 600px;
  		margin: 0 auto;
  		.items{
  			font-size: 14px;
  			height: 30px;
  			line-height: 30px;
  			margin-bottom: 15px;
  			.name{
  				font-size: 14px;
  				width: 90px;
  				float: left;
  				text-align: right;
  			}
  			.content{
  				margin-left: 110px;
  				input{

  				}
  			}
  		}
  	}




</style>

