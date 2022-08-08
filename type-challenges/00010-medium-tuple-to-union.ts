/*
 * @Author: zhangjicheng
 * @Date: 2022-08-08 11:48:15
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-08 14:27:38
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00010-medium-tuple-to-union.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


// ============= Your Code Here =============
type TupleToUnion1<T extends Array<any>> = T extends Array<infer R> ? R : never;

/** ------------------------------------------------ */

type TupleToUnion<T extends Array<any>> = T[number]
