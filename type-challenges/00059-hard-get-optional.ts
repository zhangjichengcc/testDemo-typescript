// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];

// ============= Your Code Here =============
type GetOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

// 这种方式无法识别出 undefined 的可选
// type GetOptional<T> = {
//   [K in keyof T as Partial<T>[K] extends T[K] ? K : never]: T[K];
// }

type B = Partial<{ foo: undefined; bar?: undefined }>;
type C = Required<{ foo: undefined; bar?: undefined }>;

type A = GetOptional<{ foo: undefined; bar?: undefined }>;
