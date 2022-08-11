/*
 * @Author: zhangjicheng
 * @Date: 2022-08-11 17:07:58
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-11 17:08:44
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00013-warm-hello-world.ts
 */
// ============= Test Cases =============
import type { Equal, Expect, NotAny } from './test-utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]


// ============= Your Code Here =============
type HelloWorld = string // expected to be a string
