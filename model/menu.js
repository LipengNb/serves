const db = require('./db')
const menuScheme = {
	name: {
		type: String,
		required: [true, '菜单名称是必填项']
	},
	icon: {
		type: String
	},
	path: {
		type: String,
		required: [true, '访问地址是必填项']
	},
	filePath: {
		type: String,
		required: [true, '文件路径是必填项']
	},
	icon: {
		type: String
	},
	sort: {
		type: Number,
		required: [true, '排序是必填项']
	},
	status: {
		type: Boolean,
		required: [true, '状态是必填项']
	},
	pid: String
}
const menuModel = db.model('menus', menuScheme)

module.exports = menuModel