import Dep from "./Dep"

/* 
  watcher作为中转，通知组件数据变更
*/
let uid = 0
export default class Watcher {
  // 依次目标对象，对象key， 回调函数
  constructor(
    target,
    expression,
    callback
  ) {
    // console.log('Watcher。。。')
    this.id = uid++
    this.target = target
    // expression 传入的值可能是 ‘a.b.c’;parsePath用于拆分取值
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  get() {
    // 进入依赖收集阶段；将全局的Dep.target设置为Watcher本身
    Dep.target = this
    const obj = this.target

    let value
    try {
      value = this.getter(obj)
    } finally {
      Dep.target = null
    }
    return value
  }
  update() {
    this.run()
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {
    const val = this.get()
    if (val !== this.value || typeof val === 'object') {
      const oldVal = this.value
      this.value = val
      cb.call(this.target, val, oldVal)
    }
  }
}

/**
 * @description: 用于返回嵌套对象的最终值
 * @param {*} obj 被监测的对象
 */
function parsePath(val) {
  const segments = val.split('.') 
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]      
    }
    return obj
  }
}
// 使用例子
// const fn = parsePath('a.b.c')
// const res = fn({
//   a: {
//     b: {
//       c: 55
//     }
//   }
// })