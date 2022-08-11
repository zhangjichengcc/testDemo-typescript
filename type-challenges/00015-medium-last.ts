/*
 * @Author: zhangjicheng
 * @Date: 2022-08-11 17:25:41
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-11 18:18:35
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00015-medium-last.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]


// ============= Your Code Here =============
type Last1<T extends any[]> = 
  T extends [infer R] 
  ? R
  : T extends [infer J, ...infer K]
    ? Last<K>
    : never

/** ---------------------------------------- */

type Last<T extends any[]> =
  T extends [...infer U, infer R]
  ? R : never;