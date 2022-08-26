<template>
	<list-scroll class="list-scroll" @loadmore = "loadmore">
		<list-card mode="base" :item="item" v-for="item in list" :key="item._id"></list-card>
<!-- 		<list-card mode="column"></list-card>
		<list-card mode="image"></list-card> -->
		
		<!-- 一次请求10条数据，判断一下是否显示组件 -->
		<uni-load-more v-if="list.length === 0 || list.length > 9" iconType="snow" :status="load.loading"></uni-load-more>

	</list-scroll>
</template>

<script>
	export default {
		name:"list-item",
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return{
						loading:"loading"
					}
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			loadmore(){
				// console.log("触发上拉事件")
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
