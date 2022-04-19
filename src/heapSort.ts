/*
 * @Author: zhangjicheng
 * @Date: 2022-04-19 17:35:13
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-04-19 18:58:37
 * @FilePath: \typeScriptDemo\src\heapSort.ts
 */

/**
 * 工具方法，以树结构打印数组
 * @param arr 
 */
function log(arr: number[]) {
  let _arr = JSON.parse(JSON.stringify(arr));
  let str = '', i = 1;
  while(_arr.length) {
    str += `${_arr.splice(0, i)}\n`;
    i = i * 2;
  }
  console.log(str);
}

/**
 * 生成单位大顶堆
 * @param arr 需要处理的数组
 * @param i 指定当前大顶堆根节点的idx
 * @param len 指定需要处理的数组范围（长度）
 */
function heaping(arr: number[], i: number, len: number) {
  let largestIdx = i;      // 设置最大值index, 默认当前i
  const leftIdx = 2*i+1, rightIdx = 2*i+2;
  if (leftIdx < len && arr[leftIdx] > arr[largestIdx]) largestIdx = leftIdx;
  if (rightIdx < len && arr[rightIdx] > arr[largestIdx]) largestIdx = rightIdx;
  if (largestIdx !== i) { // 最大值idx发生变化，则表示堆结构变化，更新largestIdx并回调验证堆
    // 将最大值移到堆顶
    [arr[largestIdx], arr[i]] = [arr[i], arr[largestIdx]];
    // 由于当前堆改变，将影响到对应子堆，
    heaping(arr, largestIdx, len);
  }
}

// 建立大顶堆
function buildMaxHeap(arr: number[]) {
  const len = arr.length;
  // Math.ceil(len / 2) - 1 为当前完全二叉树的最后一项非叶子节点
  for (let i = Math.ceil(len/2) - 1; i >= 0; i--) {
    heaping(arr, i, len);
  }
}

// // 排序
// function heapSort(arr: number[]) {
//   buildMaxHeap(arr);     // 首先建立大顶堆
//   log(arr);
//   let len = arr.length;  // 记录当前未排序数组长度
//   for(let i = arr.length - 1; i >= 0; i--) { // ? 注意，此处循环从 arr.length - 1 开始并非从子节点开始构建，而是用来记录当前未排序的元素下标
//     // 每次循环将最后一位（根据len变化）与堆顶元素交换位置，最大值始终插入最后（index = len）至数组有序
//     [arr[0], arr[len - 1]] = [arr[len - 1], arr[0]];
//     len --; // 每次操作完成，len减1
//     heaping(arr, 0, len);
//     log(arr);
//   }
//   return arr;
// }

/**
 * 排序 bad
 * @param arr 
 * @returns 
 */
function heapSort(arr: number[]) {
  log(arr);
  let len = arr.length;  // 记录当前未排序数组长度
  for(let i = arr.length - 1; i >= 0; i--) { // ? 注意，此处循环从 arr.length - 1 开始并非从子节点开始构建，而是用来记录当前未排序的元素下标
    // 重新构建大顶堆
    for (let j = Math.ceil(len/2) - 1; j >= 0; j--) {
      heaping(arr, j, len);
    }
    // 每次循环将最后一位（根据len变化）与堆顶元素交换位置，最大值始终插入最后（index = len）至数组有序
    [arr[0], arr[i]] = [arr[i], arr[0]];
    len --; // 每次操作完成，len减1
    log(arr);
  }
  return arr;
}

heapSort([2,9,3,1,4,5,6,7,8])
