/*
 * @Author: zhangjicheng
 * @Date: 2022-08-16 16:37:39
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-17 18:56:31
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00055-hard-union-to-intersection.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


// ============= Your Code Here =============
type UnionToIntersection<U> = 