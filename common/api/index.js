// 批量导出文件
const requireApi = require.context(
	// api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
)

let module = {}
// 遍历
requireApi.keys().forEach((key,index)=>{
	if(key === './index.js') return
	// console.log(key);
	// 合并
	Object.assign(module,requireApi(key))
})

export default module
