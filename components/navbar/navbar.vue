<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<!-- #ifndef MP-ALIPAY -->
			<div :style="{height: statusBarHeight + 'px'}"></div>
			<!-- #endif -->
			
			<view class="navbar-content" :style="{height:navBarHeight + 'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="20"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app、vue</view>
				</view>
			</view>
		</view>
		
		
		<!-- 占位 -->
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"navbar",
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth: 375,
			};
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo);
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			
			this.windowWidth = menuButtonInfo.left
			// #endif
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0
			// #endif
			
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed{
			position: fixed;
			top: 0px;
			left: 0px;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;
		.navbar-content {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			height: 45px;
			box-sizing: border-box;
			
			.navbar-search {
				display: flex;
				align-items: center;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border-radius: 30px;
				background-color: #fff;
				.navbar-search_icon {
					margin-right: 10px;
				}
				.navbar-search_text {
					width: 100%;
					font-size: 14px;
					color: #999;
				}
			}
		}
	}
}
</style>