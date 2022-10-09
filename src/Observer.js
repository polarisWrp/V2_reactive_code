import defineReactive from './defineReactive'
import {def} from './utils'
import { arrayMethods } from './array' 
import observe from './observe'
import Dep from './Dep'

/* 
  定义Observer 工具类 
  将一个对象的所有层级属性都转为响应式
*/
export default class Observer {
  constructor(val) {
    // 实例化一个Dep实例，用于依赖收集;挂载在Observer实例上
    this.dep = new Dep()
    // this指代实例本身， 
    // 给对象新增不可枚举的__ob__属性,值为Observer实例
    def(val, '__ob__', this)

    if (Array.isArray(val)) {
      // 数组，需要将此数组的原型指向新定义的数组原型
      Object.setPrototypeOf(val, arrayMethods)
      this.observeArray(val)
    } else {
      // 对象
      this.walk(val)
    }
  }
  // 遍历
  walk(data) {
    // 循环遍历对象，对属性逐个劫持
    for (const key in data) {
      defineReactive(data, key)
    }
  }
  // 数组的遍历
  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])      
    }
  }

}
