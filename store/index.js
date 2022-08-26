// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		historylists: uni.getStorageSync("__history") || []
	},
	mutations: {
		SET_HISTORY_LISTS(state, history) {
			state.historylists = history
		},
		CLEAR_HISTORY(state) {
			state.historylists = []
		}
	},
	actions: {
		set_history({commit,state}, history){
			let list = state.historylists
			list.unshift(history)
			uni.setStorageSync('__history', list)
			commit('SET_HISTORY_LISTS', list)
		},
		clearHistory({
			commit
		}) {
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})
export default store
