/*
 Задача найти максимально покрытие штатов для радиостанций.
 statesNeeded - какие штаты надо покрыть
 stations - хеш-таблица покрытий для каждой станции
*/

Set.prototype.intersection = function (setB) {
  const intersection = new Set();
  for (const elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
};

Set.prototype.difference = function (setB) {
  const difference = new Set(this);
  for (const elem of setB) {
    difference.delete(elem);
  }
  return difference;
};
let statesNeeded = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

const stations = new Map([
  ["kone", new Set(["id", "nv", "ut"])],
  ["ktwo", new Set(["wa", "id", "mt"])],
  ["kthree", new Set(["or", "nv", "са"])],
  ["kfour", new Set(["nv", "ut"])],
  ["kfive", new Set(["ca", "az"])],
]);

const finalStations = new Set();

// Нужно найти все пересечения
while (statesNeeded.size !== 0) {
  // Находим станцию с наибольшим покрытием
  let bestStation = null;
  let statesCovered = new Set();

  for (let [station, statesForStation] of stations) {
    const covered = statesNeeded.intersection(statesForStation);
    if (covered.size > statesCovered.size) {
      bestStation = station;
      statesCovered = covered;
    }
  }

  // Лучшую станцию добавляем в финальный сет
  finalStations.add(bestStation);

  // Удаляем из необходимых станций те станции, которые уже покрыли, и так пока не покроем все станции
  statesNeeded = statesNeeded.difference(statesCovered);
}
console.log("finalStations :", finalStations);
