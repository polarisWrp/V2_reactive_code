import Dep from "./Dep"
import observe from "./observe"

/**
 * @description: 二次封装defineProperty，劫持对象属性的get,set实现响应式
 * @param {*} data 被监测的对象
 * @param {*} key 对象的属性key
 * @param {*} val 属性值
 */
export default function defineReactive(data, key, val) {
  const dep = new Dep()
  // console.log('defineReactive', key)
  // console.log('arguments...', arguments)
  if (arguments.length == 2) {
    //说明属性值就是对象里对应的key的属性值
    val = data[key]
  }
  // 检测子元素，子元素为对象则遍历劫持属性，实现响应式
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可以配置，例如可被delete
    configurable: true,
    // getter 收集依赖
    get() {
      // console.log(`读取值get...${key}属性`, val)
      if (Dep.target) {
        // 当前处于依赖收集阶段
        dep.depend()
        // 监测子元素
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    // setter 更新依赖
    set(newVal) {
      // console.log(`设置值set...${key}属性`, newVal)
      if (val === newVal) return
      val = newVal
      // 新值传入之后也需要被监听，因为传入的新值也可能是一个对象
      childOb = observe(newVal)
      // 发布订阅模式, 通知依赖变更
      dep.notify()
    }
  })
}