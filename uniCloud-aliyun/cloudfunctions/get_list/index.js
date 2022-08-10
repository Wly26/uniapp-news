'use strict';
// 获取数据库的引用
const db = uniCloud.database()
// 聚合操作符
const $ = db.command.aggregate

exports.main = async (event, context) => {
	// var name = event.name  等同于下面的写法：
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event
	
	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name
		}
	}
	
	const userinfo = await db.collection('user').doc(user_id).get()
	//console.log('userinfo',userinfo)
	const article_likes_ids = userinfo.data[0].article_likes_ids
	console.log('article_likes_ids',article_likes_ids)
	
	// 聚合 ： 更精细化的去处理数据 求和 、分组、指定那些字段
	const list = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.match(matchObj)
		.project({
			// true 值返回这个字段，false 表示不返回
			content: false
		})
		// 要跳过多少数据
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()
		console.log(list)
		
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
