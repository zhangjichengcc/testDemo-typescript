/*
 * @Author: zhangjicheng
 * @Date: 2022-06-15 15:13:05
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-06-15 19:15:21
 * @FilePath: \typeScriptDemo\src\interface.ts
 */

/* --------------------只读属性-------------------- */

interface SquareConfig {
  readonly color: string;
}

const config: SquareConfig = {
  color: '#000',
}

config.color = '#FFF'

/** ------------------------------------------------- */


/* ---------------------类接口----------------------- */

interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  // currentTime: Date;
  a: Date;
  private b: string;
  constructor(h: number, m: number) {
    // this.currentTime = new Date();
    this.a = new Date();
    this.b = 'a';
  }

  log() {
    this.b = '2'
  }
}

interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}