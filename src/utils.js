// 工具函数

/**
 * @description: 给传入对象设置__ob__属性，并且设置为不可枚举
 * @param {Object} obj 对象
 * @param {String} key 属性key
 * @param {*} val key对于修改或新增的值
 * @param {Boolean} enumerable 是否可枚举
 */
export const def = function (
  obj,
  key,
  value,
  enumerable = false
) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true,
  })
}