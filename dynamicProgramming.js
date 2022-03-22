/**
 * Динамическое программирование применяется при оптимизации необходимой характеристики. Оно работает только в ситуациях,
 * когда задача может быть разбита на автономные задачи.
 */

/**
 * Например мы собираем рюкзак в поход. Вместимость рюкзака 6 кг,
 * и у нас есть набор предметов, каждый из которых имеет ценность (чем она выше, тем важнее предмет)
 * Как будет выглядеть оптимальный набор предметов?
 */

const BACKPACK_CAPACITY = 6; // вместимость рюкзака в килограммах

// Набор предметов для похода с указанием веса и ценности
const items = {
  water: {
    weight: 3,
    value: 10,
  },
  book: {
    weight: 1,
    value: 3,
  },
  food: {
    weight: 2,
    value: 9,
  },
  jacket: {
    weight: 2,
    value: 5,
  },
  camera: {
    weight: 1,
    value: 6,
  },
};

// Таблицы имён и ценности
const valuesTable = [];
const namesTable = [];

const entries = Object.entries(items);
// Для каждого предмета последовательно заполняем таблицу
entries.forEach(([name, data], row) => {
  valuesTable[row] = [];
  namesTable[row] = [];

  // Каждая колонка представляет рюкзак меньшего размера
  for (let col = 0; col < BACKPACK_CAPACITY; col++) {
    const columnWeight = col + 1; // Значение колонки (для колонки с индексом 0 значение будет 1кг.)

    if (row === 0) {
      // Заполняем самый первый ряд

      // Если предмет помещается в рюкзак, помещаем ценность и название этого предмета в соответствующие таблицы
      const doesItFit = data.weight <= columnWeight;
      valuesTable[row][col] = doesItFit ? data.value : 0;
      namesTable[row][col] = doesItFit ? [name] : [];
    } else {
      // Остальные ряды

      // Предыдущий максимум
      const prevMaximum = valuesTable[row - 1][col];

      // Если вес предмета равен вместимости рюкзака
      const fullyComplete = data.weight === columnWeight;
      const exactValue = fullyComplete ? data.value : 0;

      // Остаток (если вес предмета меньше, чем вместимость рюкзака)
      const hasEmptySpace = data.weight < columnWeight;
      const remainderColumnIndex = columnWeight - data.weight - 1;
      const remainder = hasEmptySpace
        ? valuesTable[row - 1][remainderColumnIndex]
        : 0;

      // Потенциальная ценность (с учетом заполнения свободного места)
      const potentialValue = hasEmptySpace ? data.value + remainder : 0;

      // Находим максимальное значение ценности и записываем в таблицу ценностей
      const maximum = Math.max(prevMaximum, potentialValue, exactValue);
      valuesTable[row][col] = maximum;

      // Заполняем таблицу названий
      if (maximum === prevMaximum) {
        namesTable[row][col] = namesTable[row - 1][col];
      } else if (maximum === potentialValue) {
        namesTable[row][col] = [
          name,
          ...namesTable[row - 1][remainderColumnIndex],
        ];
      } else if (maximum === exactValue) {
        namesTable[row][col] = [name];
      }
    }
  }
});

// В данном случае результатом будет последняя ячейка таблицы
const { length: rowsNumber } = namesTable;
const { length: colsNumber } = namesTable[rowsNumber - 1];
const resultNames = namesTable[rowsNumber - 1][colsNumber - 1];
const resultValue = valuesTable[rowsNumber - 1][colsNumber - 1];

console.log(
  `Вы должны взять: ${new Intl.ListFormat("ru-RU", {
    style: "long",
    type: "conjunction",
  }).format(resultNames)}`
);
console.log(`Ценность набора составляет: ${resultValue}`);
