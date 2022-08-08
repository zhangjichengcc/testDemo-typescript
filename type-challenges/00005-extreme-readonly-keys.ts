/*
 * @Author: zhangjicheng
 * @Date: 2022-08-04 16:42:27
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-08 10:46:15
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

// 工具方法 MyEqual<X, Y> 判断 X, Y类型是否相同
type MyEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

// 工具方法 MyReadonly<T> 将T的所有属性设为只读
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

/** -------------------------------------------------------- */

/**
 * 将所有readonly 属性构造为新的类型
 * 通过keyof获取key
 */
type GetReadonlyKeys1<T> = keyof {
  [K in keyof T as 
    Equal< // 原属性与构建的readonly属性对比，若相对则表示该项为 readonly
      {[P in K]: T[P]},
      MyReadonly<{[P in K]: T[P]}> // 将属性设为readonly
    > extends true ? K : never
  ]: T[K]
}

/** --------------------------------------------------------- */

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
