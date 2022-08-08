/*
 * @Author: zhangjicheng
 * @Date: 2022-08-08 10:59:49
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-08 11:47:31
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00009-medium-deep-readonly.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}


// ============= Your Code Here =============
type DeepReadonly1<T> = {
  readonly [K in keyof T]: T[K] extends Function ? 
    T[K]: 
    T[K] extends Object ? 
    DeepReadonly<T[K]> :
    T[K]
}

/** ---------------------------------------- */

type DeepReadonly<T> = keyof T extends never ? T : { readonly [key in keyof T]: DeepReadonly<T[key]> }

type A = DeepReadonly<X>;