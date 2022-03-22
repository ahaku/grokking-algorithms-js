/*
Рекурсивный бинарный поиск (Вызываем с указанием границ поиска и ищем всегда по начальному массиву, уменьшая границы поиска)
1) Базовый случай: Находим середину массива, и если это искомое число то возвращаем индекс
2) Если искомое число меньше числа в середине, вызываем функцию с указанием границ от начала до середины минус 1
Если искомое число больше числа в середине, вызываем функцию с указанием границ от середины + 1 до конца
В противном случае, если ничего не найдено возвращаем null
*/

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

const binarySearch = (arr, target, start, end) => {
  let mid = ~~((start + end) / 2);
  if (target === arr[mid]) {
    return mid;
  }
  if (target < arr[mid]) {
    return binarySearch(arr, target, 0, mid - 1);
  } else if (target > arr[mid]) {
    return binarySearch(arr, target, mid + 1, end);
  }
  return null;
};

console.log(binarySearch(arr, 5, 0, arr.length));
