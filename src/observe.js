
// 引入Observer类，将对象所有属性都转为响应式侦测
import Observer from './Observer'

/**
 * @description: 入参转为响应式前的判断与处理
 * @description: 给传入的对象所有属性添加不可枚举的 __ob__ 属性；并且返回该对象
 * @param {*} obj 被检测的对象
 */
export default function observe(obj) {
  // 非对象，终止以下逻辑
  // 因为默认 observe 执行过一次，非对象就不用重复执行了
  if (typeof obj !== 'object') return

  let ob;
  // 根据对象身上的 __ob__ 属性判断对象是否已被监测（是不是响应式）
  if (
    typeof obj.__ob__ !== 'undefined'
  ) {
    // 传入对象身上存在 __ob__ 属性，直接取 【已经是响应式了】
    ob = obj.__ob__
  } else {
    //实例化一个响应式的对象
    ob = new Observer(obj)
  }
  // console.log('最后的。。。。。。。。。。。。。。ob:', ob)
  return ob
}
