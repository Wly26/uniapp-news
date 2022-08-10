'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		// 前端传过来两个参数：用户的id，文章的id
		user_id,
		article_id
	} = event
	
	// 用户信息
	const userinfo = await db.collection('user').doc(user_id).get()
	// 文章的id
	const article_id_ids = userinfo.data[0].article_likes_ids
	
	let dbCmdFuns = null
	if (article_id_ids.includes(article_id)) {
		// 删除
		dbCmdFuns = dbCmd.pull(article_id)
	} else {
		// 添加
		dbCmdFuns = dbCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns
	})
	//event为客户端上传的参数
	console.log('event : ' + event)
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: userinfo.data[0]
	}
};
