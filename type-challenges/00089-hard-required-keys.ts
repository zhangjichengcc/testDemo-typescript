// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, "a">>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, "a">>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
];

// ============= Your Code Here =============

// type RequiredKeys<T, K = keyof T> = K extends keyof T
//   ? T extends Required<Pick<T, K>>
//     ? K
//     : never
//   : never;

type RequiredKeys<T> = keyof {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: never;
};
