<template>
	<li :class="{'expand':isExpand}">
		<div @click="goSwtich" class="title">{{items.name}}<i v-if="items.children && items.children.length > 0" class="el-icon" :class="{'el-icon-arrow-right':!isExpand,'el-icon-arrow-down':isExpand}"></i></div>
		<ul v-if="items.children && items.children.length > 0">
			<nav-items v-for="item in items.children" :key="item.uuid" :items="item"></nav-items>
		</ul>
	</li>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import {Link} from '@/config/utils'

	export default{
		props:["items"],
		name:"nav-items",
		computed:{
			...mapGetters({
        		openKeys: 'homeStore/home/openKeys',
			}),
			isExpand(){
				var result = this.openKeys.indexOf(this.items.uuid) >=0?true:false
				return result;
			}
		},
		methods:{
			...mapActions({
		        setOpenKeys: 'homeStore/home/setOpenKeys',
		        setBreadCrumb: 'homeStore/home/setBreadCrumb',
		    }),
			goSwtich(){
				if(this.items.children && this.items.children.length > 0){//有子，展开子
					this.setOpenKeys(this.items.uuid);
				}else{
					let bread_crumb = [];
					bread_crumb.push(this.items);
					if(this.items.parent){
						bread_crumb.unshift(this.items.parent);
					}
					this.setBreadCrumb(bread_crumb);
					Link(this.items.path);
				}
			}
		}
	}
</script>


