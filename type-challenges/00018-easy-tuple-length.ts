/*
 * @Author: zhangjicheng
 * @Date: 2022-08-15 11:10:22
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-15 14:51:29
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00018-easy-tuple-length.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]


// ============= Your Code Here =============
type Length<T extends readonly any[]> = T['length']
