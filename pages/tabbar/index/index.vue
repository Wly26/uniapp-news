<template>
	<view class="home">
		<!-- 自定义组件 -->
		<navbar></navbar>
		<tab :tabList="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
		
	</view>
</template>

<script>
	// 组件名一致,可以不用import导入,components注册
	// import navbar from "@/components/navbar/navbar.vue"
	export default {
		name:"index",
		// components:{
		// 	navbar
		// },
		data() {
			return {
				tabList:[],
				tabIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel(){
				// uniCloud.callFunction({
				// 	name:'get_label'
				// }).then((res) =>{
				// 	const {result} = res;
				// 	this.tabList = result.data
				// })
				
				// 调用云函数方法
				this.$api.get_label().then((res) => {
					const {data} = res
					// console.log('标签 ',data);
					// 在前方加了一个数据
					data.unshift({
						name:'全部'
					})
					this.tabList = data
					// 	console.log(this.tabList);
				})
			},
			
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab({data,index}){
				// console.log(data,index);
				this.activeIndex = index
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		// overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
			overflow: hidden;
			// .list-scroll{
			// 	height: 100%;
			// 	display: flex;
			// 	flex-direction: column;
			// }
		}
	}
</style>
