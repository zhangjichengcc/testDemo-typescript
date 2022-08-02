/*
 * @Author: zhangjicheng
 * @Date: 2022-06-16 14:13:07
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-06-16 17:08:24
 * @FilePath: \typeScriptDemo\src\interface-type.ts
 */
// 对constructor定义类型检查接口
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// 定义 Clock 类接口
interface ClockInterface {
  tick(): void;
}

// 定义类实例化方法
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

// 创建 DigitalClock 类
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}

// 创建 AnalogClock 类
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// class Shape {
//   color: string;
//   constructor() {
//     this.color = '#000';
//   }
// }

interface Shape {
  color: string;
  name: string;
}

class Circle implements Shape {
  color: string;
  name: string;
  constructor() {
    // super();
    this.color = '#000';
    this.name = 'Circle';
  }
}


interface A {
  a: string;
  A: A;
}
type PP = string;
type P = Array<PP>



const a: A = { a: '', b:2}