/*
 * @Author: zhangjicheng
 * @Date: 2022-08-16 16:37:39
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-23 17:37:00
 * @FilePath: \typeScriptDemo\type-challenges\00055-hard-union-to-intersection.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]

// ============= Your Code Here =============

// 涉及 逆变，参数处于逆变位置，
// 而根据ts规范，在逆变位置上，同一个类型的多个候选会被推断成交叉类型
type UnionToIntersection<U> = 
  (
    U extends U 
    ? (args: U) => void
    : never
  ) extends (args: infer T) => void
  ? T
  : never;

/** -------------------------------------- */

type Args = number | string;

// 生成联合类型的方法
type Fn<T> = T extends T ? (args: T) => void : never;

// 将联合类型转为交叉类型
type GetArgs<T> = T extends (args: infer U) => void ? U : never;

type ArgsFn = Fn<Args>

type A = GetArgs<ArgsFn>

// https://github.com/type-challenges/type-challenges/issues/10984
