/*
 * @Author: zhangjicheng
 * @Date: 2022-06-14 17:26:50
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-06-15 15:12:56
 * @FilePath: \typeScriptDemo\src\guard.ts
 * @Description: 类型守卫
 */

// in 关键字
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

// 自定义守卫
function isNumber(value: any): value is number {
  return typeof value === "number";
}

function isString(value: any): value is string {
  return typeof value === 'string';
}

function isType<T extends string>(value: any, prop: T): value is T {
  return typeof value === prop;
}


/*------------------- is + 泛型 ------------------- */

// 定义动物接口
interface Animal {
  age: number;
  sound: string;
}

// 定义人类接口
interface People {
  age: number;
  phoneNum: string;
}

// 创建动物对象
const tom: Animal = {
  age: 3,
  sound: 'miao',
}

// 创建人类对象
const tony: People = {
  age: 12,
}

// 定义类型保护
function isTypeOf<T>(target: unknown, prop: keyof T): target is T{
  return !!(target as T)[prop];
}

// 输出信息
function consoleInfo(target: Animal | People) {
  if (isTypeOf(target, 'sound')) console.log(target.sound);
  if (isTypeOf(target, 'phoneNum')) console.log(target.phoneNum);
}

/* --------------------------------------------------- */







type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;