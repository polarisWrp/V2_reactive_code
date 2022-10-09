import observe from './observe'
import Watcher from './Watcher'

const obj = {
  a: {
    b: {
      c: 8
    },
    d: 89
  },
  b: 99,
  g: [333,444]
}

observe(obj)
new Watcher(obj, 'a.b.c', (val) => {
  console.log('输出了。。。。***', val);
})
obj.a.b.c = 44

// obj.b ++
// obj.g.push([8889, 222])
// obj.g.splice(1, 1, [111,5555])
// console.log(obj.g)


// const kk = {
//   a: 'kkkkk'
// }
// Object.defineProperty(kk, 'kkkkk', {
//   value: '大白',
//   enumerable: false
// })
// console.log('kk.....................', kk)

// const arrr = [1, 22, 55]
// for (const key in arrr) {
//   console.log(key, arrr);
// }