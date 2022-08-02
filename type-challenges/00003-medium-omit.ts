/*
 * @Author: zhangjicheng
 * @Date: 2022-08-02 18:17:32
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-02 19:12:48
 * @FilePath: \webpack-demoe:\webspace\typeScriptDemo\type-challenges\00003-medium-omit.ts
 */
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}


// ============= Your Code Here =============


type MyExclude<T, K extends T> = T extends K ? never : T;

type P = MyExclude<keyof Todo, 'title'>;

type MyOmit<T, K extends keyof T> = {
  [P in (keyof T extends K ? never : keyof T)]: T[P]
}

type OmitTodo = MyOmit<Todo, 'title'>


