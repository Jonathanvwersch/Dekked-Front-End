export function moveArrayItem(arr: any[], fromIndex: number, toIndex: number) {
  var element = arr[fromIndex];
  arr.splice(toIndex, 0, element);
}
