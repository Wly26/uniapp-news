<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]" :load=load[index] @loadmore = "loadmore"></list-item>
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
				listCatchData:{},
				load:{},
				// page:1,
				pageSize:10
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
			loadmore(){
				if(this.load[this.activeIndex].loading === 'noMore') return
				// console.log("触发上拉事件")
				// this.page++,
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
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
				if(!this.load[current]){
					this.load[current] = {
						page: 1,
						loading:'loading'
					}
				}
				this.$api.get_list({
						name: this.tab[current].name,
						page: this.load[current].page,
						pageSize: this.pageSize
					}).then((res) => {
					console.log(res);
					const {data} = res;
					// 数据已经加载完成时
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						// 强制重新渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					// 懒加载
					this.$set(this.listCatchData, current, oldList)
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