/* 
Задача: Даны размеры поля (ширина и высота). Нужно разделить это поле на одинаковые квадраты максимального размера. 
Для поля 1680 х 640 максимальный квадрат будет 80 х 80
Принцип "Разделяй и властвуй".
1) Найти простейший случай как базовый
2) Придумать, как свести задачу к базовому случаю
*/

/*
1) Базовый случай здесь - это когда длина одной стороны кратна длине другой стороны,
т.е. площадь можно поделить без остатка на одинаковые квадраты
2) Если есть остаток от деления, то вызвать функцию с уменьшенной площадью. 
Одна сторона будет минимальной стороной, а вторая остатком от деления максимальной стороны на минимальную
*/

const biggestSquare = (w, h) => {
  // Найдем наибольшую и наименьшую стороны поля
  const [max, min] = [Math.max(w, h), Math.min(w, h)];

  // Находим остаток от деления
  const rest = max % min;

  // Если делится без остатка (базовый случай), т.е. rest равен нулю, то возвращаем наименьшую сторону.
  // Это и будет максимально возможная сторона квадрата для задачи.
  if (rest === 0) return min;

  // Иначе возвращаем вызов этой функции с оставшейся площадью (минимальная сторона
  // и остаток от деления максимальной стороны на минимальную)
  return biggestSquare(min, rest);
};

console.log(biggestSquare(1680, 640));
