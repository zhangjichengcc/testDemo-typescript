/*
 * @Author: zhangjicheng
 * @Date: 2022-08-11 18:19:37
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-11 18:20:32
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00016-medium-pop.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd' ]>, ['a', 'b', 'c']>>,
]


// ============= Your Code Here =============
type Pop<T extends any[]> = T extends [...infer A, infer B] ? A : never;
