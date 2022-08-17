/*
 * @Author: zhangjicheng
 * @Date: 2022-08-15 15:18:28
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-16 15:51:17
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00043-easy-exclude.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>,
]


// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T;
