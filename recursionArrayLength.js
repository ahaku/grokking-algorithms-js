/*
Подсчитать кол-во элементов в массиве
1) Базовый случай: если длина массива равна нулю, то вернуть 0
2) Иначе вернуть единицу плюс результат выполнения этой же функции от уменьшенного на единицу массива
2*) Или можно вернуть максимальное число из длины текущего массива и вызова этой же функции от уменьшенного на единицу массива
return Math.max(arr.length, getArrayLength(arr.slice(1)))
*/

const arr = [1, 2, 3, 4, 5, 6];

const getArrayLength = (arr) => {
  if (arr.length === 0) return 0;
  return 1 + getArrayLength(arr.slice(1));
};

console.log(getArrayLength(arr));
