module.exports = {
  // 数据库集合靠函数去传递
  insert(CollectionName, insertData) {
    return new Promise((resolve, reject) => {
      CollectionName.insertMany(insertData, (err) => {
        if (err) throw err;
        resolve();
      });
    });
  },
  /**
   *
   * @param {CollectionName} mongodb的数据模型
   * @param {Data}  查询添加删除对应的数据
   * @method save
   * @description 数据库中保存数据
   */
  save(CollectionName, Data) {
    return new Promise((resolve, reject) => {
      CollectionName.create(Data, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  /**
   *
   * @param {数据模型} CollectionName
   * @param {查找的数据条件} Data
   * @param {属性过滤对象} fields
   * @param {可选参数} options
   */
  find(CollectionName, Data, fields = null, options = {}) {
    return new Promise((resolve, reject) => {
      CollectionName.find(Data, fields, options, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  /**
   * @method findOne
   * @param {设置查询后的输出参数， username:1 _id:0 1表示输出，0表示不输出} opt
   * @description 数据库的查询操作
   */
  findOne(CollectionName, Data, opt) {
    return new Promise((resolve, reject) => {
      CollectionName.findOne(Data, opt, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  /**
   * @method remove
   * @param {conditions} 移除条件
   * @description 数据库删除数据
   */
  remove(CollectionName, conditions) {
    return new Promise((resolve, reject) => {
      CollectionName.remove(conditions, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  /**
   * @method update
   * @param {数据模型} CollectionName
   * @param {查询条件} conditions
   * @param {更新后的对象值} updateData
   */
  update(CollectionName, conditions, updateData) {
    return new Promise((resolve, reject) => {
      CollectionName.update(conditions, updateData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  /**
   * @method findByIdAndUpdate
   * @param {数据模型} CollectionName
   * @param {查询的id} id
   * @param {要更新的数据} updateData
   */
  findByIdAndUpdate(CollectionName, id, updateData) {
    return new Promise((resolve, reject) => {
      CollectionName.findByIdAndUpdate(id, updateData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};
