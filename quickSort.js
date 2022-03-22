/**
Быстрая сортировка О(n log n)
Выбираем опорный пункт, например случайно. И все элементы, которые меньше опорного добавляем в один массив,
а элементы, которые больше в другой. Затем для каждого из этих массивов выполняется такое же. И так делается
до тех пор, пока длина массива не станет равна 1. Затем подмассивы склеиваются в 1 большой
1) Базовый случай. Длина массива равна 1.
2) Находим опорный элемент (середина массива). Создаём два массива для меньших и больших чисел.
В цикле проходимся по исходному массиву, пропуская опорный эл., и элементы, которые меньше опорного добавляем в массив для меньших чисел,
для больших чисел то же самое. И возвращаем массив склеенный из результата рекурсивного вызова функции с массивом меньших чисел плюс сам опорный эл. и плюс
массив склеенный из результата рекурсивного вызова функции с массивом больших чисел
 */

const arr = [3, 12, 53, 86, 2, 267, 109, 1, 0, 123];

const quickSort = (arr) => {
  if (arr.length < 2) return arr;

  const pivotIndex = ~~(arr.length / 2);
  const pivot = arr[pivotIndex];

  const greater = [];
  const less = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;

    if (arr[i] < pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }

  return [...quickSort(less), pivot, ...quickSort(greater)];
};

console.log(quickSort(arr));
