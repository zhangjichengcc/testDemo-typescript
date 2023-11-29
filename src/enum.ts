/*
 * @Author: zhangjicheng
 * @Date: 2022-05-30 11:08:09
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-06-16 09:54:46
 * @FilePath: \typeScriptDemo\src\enum.ts
 */
enum Name {
  firstName = "zhang",
  fullName = "zhangjicheng",
}

Name["firstName"];

enum week {
  "日",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
}

console.log("周" + week[new Date().getDay()]);

let obj: object;

obj = 1;

let Obj: Object;

Obj = 1;

Obj = null;

let b: object = {
  toString() {
    return 123;
  }, // Error
};

let strictTypeHeaders: { [key: string]: string } = {};

let header: object = {};

header = strictTypeHeaders; // OK

strictTypeHeaders = header;

interface Point {
  x: number;
  y: number;
}

const point = {
  x: 3,
  y: 4,
} as const;

function fn(a: Point) {}

type Value = string | number | boolean;

function controlFlowAnalysisWithNever(value: Value) {
  if (typeof value === "number") {
    // 这里 foo 被收窄为 number 类型
    // ...
  } else if (typeof value === "string") {
    // 这里 foo 被收窄为 string 类型
    // ...
  } else {
    // value 此时应为 never 类型
    const check: never = value;
  }
}

function fn(value: string | undefined | null) {
  const onlyString: string = value;
  const ignoreUndefinedAndNull: string = value!;
}

type NumGenerator = () => number;

function fn(numberGenerator: NumGenerator | null) {
  numberGenerator();
  numberGenerator!();
}

let x!: number;
initialize();
// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error

function initialize() {
  x = 10;
}

export {};
