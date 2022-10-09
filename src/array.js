import { def } from "./utils"

// 原数组原型
const originProto = Array.prototype
// 以Array.prototype原型创建新对象
export const arrayMethods = Object.create(Array.prototype) 

 // 重写以下七个方法
const methodNeedChange = [
  'pop',
  'shift',
  'unshift',
  'push',
  'splice',
  'sort',
  'reverse',
]

methodNeedChange.forEach(mName => {
  // 原来的方法
  const original = originProto[mName]
  
  // 定义新方法
  def(
    arrayMethods,
    mName,
    function () {
      // 不适用箭头函数，需要保证正确的上下文以及参数
      const result = original.apply(this, arguments)

      // 取出数组身上的__ob__属性,调用遍历监测数组的方法
      const ob = this.__ob__
      // 三种方法push，unshift,splice能够插入新项
      let inserted = []
      switch (mName) {
        case 'push':
        case 'unshift':
          inserted = [...arguments]
          break;
        case 'splice': // (下标， 数量，插入的新项)
          inserted = [...arguments].slice(2) //截取插入的项
          break;
      }
      if (inserted) {
        ob.observeArray(inserted)
      }
      // 通知数据变更
      ob.dep.notify()
      
      console.log('输出了。。。。。')
      return result
    }
  )

})