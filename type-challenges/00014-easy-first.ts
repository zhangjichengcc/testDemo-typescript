/*
 * @Author: zhangjicheng
 * @Date: 2022-08-11 17:10:05
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-11 17:11:37
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00014-easy-first.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]


// ============= Your Code Here =============
type First<T extends any[]> = T[number] extends never ? never : T[0];
