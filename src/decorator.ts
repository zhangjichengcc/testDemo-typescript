/*
 * @Author: zhangjicheng
 * @Date: 2022-05-13 16:37:09
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-05-13 18:34:40
 * @FilePath: \typeScriptDemo\src\decorator.ts
 * @description: 装饰器
 */
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    public hello: string;
    constructor(...args: any[]) {
      super(constructor);
      this.hello = args[0] + '1111';
    }
    textFn() {
      console.log(this.hello);
    }
  }
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
  getHello() {
    return this.hello;
  }
}

const greeter = new Greeter('666');

debugger
// console.log(new Greeter("world"));