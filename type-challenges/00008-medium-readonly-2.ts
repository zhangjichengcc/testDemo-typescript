/*
 * @Author: zhangjicheng
 * @Date: 2022-08-05 16:13:48
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-05 19:08:30
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00008-medium-readonly-2.ts
 */
// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============

/** ---------------------------------------------------- */

type MyReadonly21<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P ]: T[P]
}

/** ---------------------------------------------------- */

// Omit
type MyReadonly22<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & Omit<T, K>

/** ---------------------------------------------------- */

// Exclude
type MyReadonly23<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

/** ---------------------------------------------------- */

type MyReadonly2<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? readonly P : P]: T[P]
}

type A = MyReadonly2<Todo1, 'title'>