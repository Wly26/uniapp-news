'use strict';
// 引入数据库
const db = uniCloud.database()

exports.main = async (event, context) => {

	// 拿到数据
	let label = await db.collection('label').get()
	
	//返回数据给客户端
	return{
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
};
