<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	// 同一个文件夹下,要引入，并注册
	import listItem from './list-item.vue'
	export default {
		name:"list",
		components: {
			listItem
		},
		data() {
			return {
				list:[],
				// 为了避免闪烁问题,这里有一个缓存数据的地方
				// js 的限制 listCatchData[index] = data
				listCatchData:{}
			}
		},
		props:{
			activeIndex: {
				type: Number,
				default: 0
			},
			tab: {
				type: Array,
				default () {
					return []
				}
			},
		},
		watch:{
			tab(newVal){
				if(newVal.length === 0) return
				this.getList(this.activeIndex)
			}
		},
		// onLoad 在页面 ，created 在组件
		created() {
			// this.getList("全部")
		},
		methods:{
			change(e){
				// let current = e.detail.current;
				const {
					current
				} = e.detail
				this.$emit("change" ,current);
				// TODO 当数据不存在 或者 长度是 0 的情况下，才去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current){
				this.$api.get_list({
						name: this.tab[current].name
					}).then((res) => {
					console.log(res);
					const {data} = res;
					console.log(data);
					// this.list = data
					// this.listCatchData[current] = data;
					// 懒加载
					this.$set(this.listCatchData, current, data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>