/** 图形接口 */
interface Figure {
  name: string;
}

/** 圆形接口 */
interface Circular extends Figure {
  type: 'circular';
  radius: number;
}

/** 方形接口 */
interface Square extends Figure {
  type: 'square';
  width: number;
  height: number;
}

/** 三角形接口 */
interface Triangle extends Figure {
  type: 'triangle';
  length: [number, number, number];
}

// ? instance

type Values<T> = T[keyof T];

interface FigureTypes {
  Circular: Circular,
  Square: Square,
  Triangle: Triangle,
}

// ? instance end

// type Types = Circular | Square | Triangle;
type Types = Values<FigureTypes>

// Types 类型会根据 type 属性判断属于哪一个联合子类型

const circular: Types = {
  type: 'circular',
  name: '圆形1',
  radius: 5,
}

const square: Types = {
  type: 'square',
  name: '方形1',
  width: 12,
  height: 6,
}

const Triangle: Types = {
  type: 'triangle',
  name: '三角形1',
  length: [3, 4, 5]
}

const circular2: Types = {
  type: 'circular',
  name: '圆形2',
  /**
   * 不能将类型“{ type: "circular"; name: string; width: number; }”分配给类型“Types”。
   * 对象字面量只能指定已知属性，并且“width”不在类型“Circular”中。ts(2322)
   */
  width: 12,
}
