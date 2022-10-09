
/* 
  负责依赖收集，在每个Observer实例上存在一个Dep实例
*/
let uid = 0
export default class Dep {
  constructor() {
    // console.log('Dep.....');
    this.id = uid++
    // 存储订阅者,即Watcher实例对象
    this.subs = []
  }
  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    // 指定一个全局唯一的位置，使用window.target也行
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 通知依赖更新
  notify() {
    // console.log('notify');
    const subs = this.subs.slice()
    for (let i = 0, len = subs.length; i < len; i++) {
      subs[i].update()
    }
  }
}