/*
 * @Author: zhangjicheng
 * @Date: 2022-08-15 14:59:09
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-15 15:15:00
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00020-medium-promise-all.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]


// ============= Your Code Here =============
declare function PromiseAll<T extends unknown[]>(value: readonly [...T]): Promise<{
  [key in keyof T]: T[key] extends Promise<infer R> ? R : T[key] 
}>
