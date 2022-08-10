<template>
	<list-scroll class="list-scroll" @loadmore = "loadmore">
		<list-card mode="base" :item="item" v-for="item in list" :key="item._id"></list-card>
<<<<<<< HEAD
<!-- 		<list-card mode="column"></list-card>
		<list-card mode="image"></list-card> -->
		
		<!-- 一次请求10条数据，判断一下是否显示组件 -->
		<uni-load-more v-if="list.length === 0 || list.length > 9" iconType="snow" :status="load.loading"></uni-load-more>
=======
		<uni-load-more iconType="snow" status="noMore"></uni-load-more>
>>>>>>> 8973d2b6c34c1c33486fe0806a5f98d71a1ca3f6
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
