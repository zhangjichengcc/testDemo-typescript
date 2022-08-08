/*
 * @Author: zhangjicheng
 * @Date: 2022-08-08 10:46:51
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-08 11:05:36
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00006-hard-simple-vue.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})


// ============= Your Code Here =============
declare function SimpleVue(options: {
  data: object,
  computed: 
}): any
