/*
 * @Author: zhangjicheng
 * @Date: 2022-08-17 10:35:36
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-17 18:51:12
 * @FilePath: \typeScriptDemo\src\covariant.ts
 */
/** 协变 逆变 双向逆变 */

import { Equal } from "../type-challenges/test-utils";

export namespace Demo {
  /** 动物类 */
  export class Animal {
    public weight: number = 1;
  }
  
  /** 狗 */
  export class Dog extends Animal {
    public wang() {
      console.log('wang');
    }
  }
  
  /** 猫 */
  class Cat extends Animal {
    public miao() {
      console.log('miao');
    }
  }
  
  declare const cat: Cat;
  
  const animal: Animal = cat;
  
  F1: () => Cat
  F2: () => Animal
  
  const f1: (cat: Cat) => void = (cat) => {
    cat.miao();
  }
  
  const f2: (animal: Animal) => void = (animal) => {
    console.log(animal.weight)
  }
  
  // !error, 入参逆变 因为不是所有的animal都能miao
  const f3: (animal: Animal) => void = f1;
  
  f3(new Animal());
  
  // ?success, 所有的cat都有weight
  const f4: (cat: Cat) => void = f2;
  
  
  
  
  type Parent = 'a' | 'b' | 'c';
  type Child = 'a' | 'b';
  
  declare const c: Child;
  
  const p: Parent = c;
}

export namespace Demo2 {
  interface Animal {
    weight: number;
  }
  
  interface Dog extends Animal {
    wang: () => void;
  }
  

  type IsChild<T, U> = T extends U ? true : false;

  // Dog <= Animal
  type DA = IsChild<Dog, Animal>;

  // 协变
  type FnA = (animal: Animal) => void;
  type FnD = (dog: Dog) => void;

  type FnDA = IsChild<FnD, FnA>
  type FnAD = IsChild<FnA, FnD>

  // 逆变
  type FnA2 = () => Animal;
  type FnD2 = () => Dog;

  type FnDA2 = IsChild<FnD2, FnA2>;
  type FnAD2 = IsChild<FnA2, FnD2>

  //
  type A = IsChild<(animal: Animal) => Dog, (dog: Dog) => Animal>

  type Fn1 = (dog: Dog) => Animal;
  type Fn2 = (animal: Animal) => Dog;

  declare const fn1: Fn1;
  const fn2: Fn2 = fn1;

  //
  type Arr1 = Animal[];
  type Arr2 = Dog[];
  type test = IsChild<Arr2, Arr1>
}

export {}

https://github.com/type-challenges/type-challenges/issues/10984

https://github.com/type-challenges/type-challenges/issues/14497
