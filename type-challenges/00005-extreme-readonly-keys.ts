/*
 * @Author: zhangjicheng
 * @Date: 2022-08-04 16:42:27
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-04 19:04:42
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00005-extreme-readonly-keys.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}


// ============= Your Code Here =============

type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

// type A = {a:1, b: 2, readonly c: 2}

type a = MyEqual<{[K in keyof A]: A[K]}, {-readonly [P in keyof A]: A[P]}> extends true ? never : A;

// type Readonly<T> = MyEqual<{[K in keyof T]: T[K]}, {-readonly [P in keyof T]: T[P]}> extends true ? never : T;

type b = Readonly<A>

// type GetReadonlyKeys<T> = keyof { [P in keyof T as ReadonlyKey<T, P>]: 1 }

// type ReadonlyKey<
//   T, 
//   K extends keyof T,
//   Original = { [P in K]: T[K] },
//   Readonly = { readonly [P in K]: T[K] }
// > =
//   (<V>() => V extends Original ? 1 : 0) extends
//   (<V>() => V extends Readonly ? 1 : 0) ? K : never

type C = GetReadonlyKeys<Todo1>

type E = keyof Todo1;

type D = C[keyof C]

// todo error
// type GetReadonlyKeys<T> = keyof {
//   [K in keyof T as Equal<T[K], Readonly<T[K]>> extends true ? K : never]: T[K]
// }

// type GetReadonlyKeys<T> = {
//   [P in keyof T]-?: MyEqual<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }> extends true ? never : P
// };

/**
 * 将非 readonly 项的值设为 never
 * 将readonly 项的值设为 key
 * 通过[keyof T] 取出非空值，即readonly 的key
 */
// {
//   readonly title: "title";
//   description: never;
//   completed: never;
// }
type GetReadonlyKeys<T> = {
  [K in keyof T]-? : // -? 
  MyEqual< // 新建类型（去除readonly标记）与原类型每一项对比，相同则表示该项为非readonly，赋值never，否则赋值该项的key，即为readonly项的key
    {[P in K]: T[P]}, 
    {-readonly [Q in K]: T[Q]}
  > extends true ? never : K
}[keyof T] // 取出readonly项的key
