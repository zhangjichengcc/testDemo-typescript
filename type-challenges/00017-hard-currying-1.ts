/*
 * @Author: zhangjicheng
 * @Date: 2022-08-11 18:23:29
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-12 10:34:29
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00017-hard-currying-1.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
]


// ============= Your Code Here =============
declare function Currying<Fn>(fn: Fn): CurrentFn<Fn>

type CurrentFn<Fn> = Fn extends (...args: infer Args) => infer R
  ? Args extends [infer F, ...infer Rest]
    ? (arg: F) => CurrentFn<(...rest: Rest) => R>
    : R
  : never