'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	// var name = event.name  等同于下面的写法：
	const {
		name
	} = event
	
	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name
		}
	}
	
	// 聚合 ： 更精细化的去处理数据 求和 、分组、指定那些字段
	const list = await db.collection('article')
		.aggregate()
		.match(matchObj)
		.project({
			// true 值返回这个字段，false 表示不返回
			content: false
		})
		.end()
		console.log(list)
		
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
