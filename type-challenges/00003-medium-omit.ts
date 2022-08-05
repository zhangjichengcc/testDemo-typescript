/*
 * @Author: zhangjicheng
 * @Date: 2022-08-04 00:27:03
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-05 11:39:44
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00003-medium-omit.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}


// ============= Your Code Here =============

/** Omit<T, K> 去除T中K项 */ 


/** ---------------------------------------------------------- */

// 工具方法，取差集
type MyExclude<T, K extends T> = T extends K ? never : T;


type MyOmit1<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P]
}

/** ---------------------------------------------------------- */

// 通过 as 关键字，将Exclude内置到方法内
type MyOmit<T, K extends keyof T> = {
  // 将 P 设置为 keyof T 再通过 as 断言key的范围
  [P in keyof T as P extends K ? never : P]: T[P];
}
