/**
 * Creates an overloaded function that allows multiple implementations based on the argument types.
 *
 * @template T - The type of the overloaded function.
 * @returns {T & { addImpl(...args: any[]): any }} - The overloaded function with the ability to add implementations.
 */
// function createOverload<T extends any>() {
//   const fnMap = new Map();

//   function overload(this: any, ...args: any[]) {
//     const key = args.map((i) => typeof i).join(",");
//     const fn = fnMap.get(key);
//     if (!fn) {
//       throw TypeError("无匹配方法");
//     }
//     return fn.call(this, ...args);
//   }

//   overload.addImpl = function (...args: any[]) {
//     const fn = args.pop();
//     if (typeof fn !== "function") {
//       throw TypeError("最后一项必须为函数！");
//     }
//     const key = args.join(",");
//     fnMap.set(key, fn);
//   };
//   return overload as T & {
//     addImpl(...args: any[]): void;
//   };
// }

// interface Fn {
//   (): void;
//   (str: string): void;
//   (str1: string, str2: string): void;
//   (str1: string, str2: string, str3: string): void;
// }

// const fn = createOverload<Fn>();

// fn.addImpl(function () {
//   console.log("没有入参");
// });
// fn.addImpl("string", (str: string) => {
//   console.log("字符串：", str);
// });
// fn.addImpl("string", "string", (str1: string, str2: string) => {
//   console.log("字符串：", str1, str2);
// });
// fn.addImpl(
//   "string",
//   "string",
//   "string",
//   (str1: string, str2: string, str3: string) => {
//     console.log("字符串：", str1, str2, str3);
//   }
// );

// fn();
// fn("a");
// fn("a", "b");
// fn("a", "b", "c");

/**
 * 定义函数重载方法
 * @returns {T & { addImpl(...args: any[]): any }}
 */
function createOverload<T extends any>() {
  // 记录重载方法
  const fnMap = new Map();

  type Overload = T & {
    /** 添加函数重载 */
    addImpl(...args: any[]): void;
  };

  // 方法主体
  function overload(this: any, ...args: any[]) {
    const key = args.map((i) => typeof i).join(",");
    const fn = fnMap.get(key);
    if (!fn) {
      throw TypeError("无匹配方法");
    }
    return fn.apply(this, args);
  }

  /**
   * 添加函数重载
   * @param args
   */
  overload.addImpl = function (...args: [...string[], Function]) {
    const fn = args.pop();
    const key = args.join(",");
    if (typeof fn !== "function") {
      throw TypeError("最后一项必须为函数");
    }
    fnMap.set(key, fn);
  };

  return overload as Overload;
}

/**
 * 函数重载类型
 */
interface Fun {
  (): void;
  (name: string): string;
  (name: string, age: number): { name: string; age: number };
}

const fn = createOverload<Fun>();

// 实现重载方法
fn.addImpl(function () {
  console.log("没有入参");
});
fn.addImpl("string", (name: string) => {
  console.log("字符串：", name);
  return name;
});
fn.addImpl("string", "number", (name: string, age: number) => {
  console.log("字符串&数字：", name, age);
  return { name, age };
});

fn();
fn("a");
fn("a", 1);

function fn1(): void;
function fn1(name: string): string;
function fn1(name: number): number;

function fn1(name?: string | number): void | string | number {
  if (!name) {
    console.log("没有入参");
  }
  if (typeof name === "string") {
    console.log("字符串：", name);
    return name;
  }
  if (typeof name === "number") {
    console.log("数字：", name);
    return name;
  }
}
