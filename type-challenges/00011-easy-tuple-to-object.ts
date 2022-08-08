/*
 * @Author: zhangjicheng
 * @Date: 2022-08-08 15:24:16
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-08 16:37:12
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00011-easy-tuple-to-object.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
]

type error = TupleToObject<[[1, 2], {}]>


// ============= Your Code Here =============
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K
}

type A = keyof typeof tuple