class Crud {
  constructor(model) {
    this.model = model
  }
  configs(resource) {
    const models = {
      menu: {
        sort: 'sort'
      },
      role: {
        populate: 'menus'
      }
    }
    return models[resource]
  }
  // 查询全部
  async query(parame = {}, configs = {}) {
    return new Promise(resolve => {
      this.model.countDocuments({}, async (error, count) => {
        if (parame.pageSize && parame.pageNum) {
          const result = await this.model.find({}).sort(configs.sort).skip((parame.pageNum - 1) * parame.pageSize).limit(Number(parame.pageSize)).populate(configs.populate)
          resolve({
            data: result,
            total: count
          })
        } else {
          const result = await this.model.find({}).sort(configs.sort).populate(configs.populate)
          resolve(result)
        }
      })
    })
  }
  // 创建
  async create(parame = {}) {
		return await this.model.create(parame)
  }
  // 更新
	async update(parame = {}) {
		const query = { _id: parame._id }
		return await this.model.updateOne(query, parame)
  }
  // 删除
	async delete(parame = {}) {
    const id = parame._id
		return await this.model.findByIdAndDelete(id)
  }
  // 返回
  async send(req, res) {
    const parame = req.method === 'GET' ? req.query : req.body
    // 参数1: 要操作的模型 参数2: 增删改查
    const { resource, mode } = req.params
    const model = require(`../model/${resource}`)
    const crud = new Crud(model)
    const result = await crud[mode](parame, this.configs(resource))
    res.send({
      code: 200,
      message: 'success',
      resource: resource,
      mode: mode,
      data: result
    })
  }
}

module.exports = Crud