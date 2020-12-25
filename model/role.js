const db = require('./db')

const mongoose = require('mongoose')

const roleScheme = {
	name: {
		type: String,
		required: [true, '角色名称是必填项']
	},
	menus: [
		{ type: mongoose.SchemaTypes.ObjectId, ref: 'menus' }
	],
	status: Boolean
}

const ruleModel = db.model('roles', roleScheme)

module.exports = ruleModel