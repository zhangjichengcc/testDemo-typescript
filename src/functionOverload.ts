function createOverload<T>() {
  const fnMap = new Map();

  function overload(this: any, ...args: any[]) {
    const key = args.map((i) => typeof i).join(",");
    const fn = fnMap.get(key);
    if (!fn) {
      throw TypeError("无匹配方法");
    }
    return fn.call(this, ...args);
  }

  overload.addImpl = function (...args: any[]) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw TypeError("最后一项必须为函数！");
    }
    const key = args.join(",");
    fnMap.set(key, fn);
  };
  return overload as T & {
    addImpl(...args: any[]): any;
  };
}

interface Fn {
  (): void;
}
interface Fn {
  (str: string): void;
}
interface Fn {
  (str1: string, str2: string): void;
}
interface Fn {
  (str1: string, str2: string, str3: string): void;
}

const fn = createOverload<Fn>();

fn.addImpl(function () {
  console.log("没有入参");
});
fn.addImpl("string", (str: string) => {
  console.log("字符串：", str);
});
fn.addImpl("string", "string", (str1: string, str2: string) => {
  console.log("字符串：", str1, str2);
});
fn.addImpl(
  "string",
  "string",
  "string",
  (str1: string, str2: string, str3: string) => {
    console.log("字符串：", str1, str2, str3);
  }
);

fn();
fn("a");
fn("a", "b");
fn("a", "b", "c");

debugger;
