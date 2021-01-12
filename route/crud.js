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
      },
      account: {
        populate: 'roles'
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
          console.log(result)
          resolve(result)
        }
      })
    })
  }
  // 查找一个
  async queryOne(parame = {}, configs = {}) {
    return await this.model.findOne(parame).populate(configs.populate)
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
    const { method, resource } = req.params
    const model = require(`../model/${resource}`)
    const crud = new Crud(model)
    try{
      const result = await crud[method](parame, this.configs(resource))
      console.log(result)
      res.send({
        code: 200,
        message: 'success',
        resource: resource,
        mode: method,
        data: result
      })
    }catch(error) {
      res.send({
        code: 508,
        message: 'error',
        data: error
      })
    }
    
    
  }
}

module.exports = Crud