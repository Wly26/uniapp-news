<template>
	<list-scroll class="list-scroll">
		<list-card mode="base" :item="item" v-for="item in list" :key="item._id"></list-card>
		<uni-load-more iconType="snow" status="noMore"></uni-load-more>
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
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
