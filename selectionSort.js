/*
Сортировка выбором O(n * n). Медленная сортировка.
Нужна доп. функция поиска наименьшего числа в массиве.
1) Проходимся по исходному массиву и каждый раз ищем наименьшее число
2) Удаляем это число из массива и добавляем его в новый
3) После окончания цикла возвращаем новый отсортированный массив
*/

const arr = [2, 6, 1, 3, 5, 4, 0];

const findSmallest = (arr) => {
  // Изначально определяем первый элемент как наименьший
  let smallest = arr[0];
  let smallestIndex = 0;

  // В цикле сравниваем текущий элемент с наименьшим
  // Если текущий меньше наименьшего, то обновляем наименьший
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallestIndex = i;
    }
  }
  return smallestIndex;
};

const selectionSort = (arr) => {
  const copyArr = [...arr];
  const length = copyArr.length;
  const newArr = [];

  for (let i = 0; i < length; i++) {
    // В цикле проходимся по исходному массиву. Каждый раз находим
    // наименьшее число и добавляем его в новый массив, удаляя из исходного
    const smallest = findSmallest(copyArr);
    newArr.push(copyArr[smallest]);
    copyArr.splice(smallest, 1);
  }
  return newArr;
};

console.log(selectionSort(arr));
