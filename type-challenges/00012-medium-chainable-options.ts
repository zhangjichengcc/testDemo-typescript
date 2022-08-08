/*
 * @Author: zhangjicheng
 * @Date: 2022-08-08 17:22:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-08 18:23:08
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00012-medium-chainable-options.ts
 */
// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}


// ============= Your Code Here =============

type Chainable<T = {}> = {
  option: <K extends PropertyKey, V>(
    key: K,
    value: K extends keyof T ? (V extends T[K] ? never : V) : V
  ) => Chainable<{
    [key in K | keyof T]: key extends K
      ? V
      : key extends keyof T
      ? T[key]
      : never;
  }>;
  get(): T;
}
