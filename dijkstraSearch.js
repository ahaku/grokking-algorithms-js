/** Алгоритм Дейкстры. Поиск самого быстрого пути во взвешенном графе.
 * Алгоритм работает только с направленными ациклическими графами (DAG Directed Acyclic Graph). И не должно быть отрицательных весов
 * 1) Найти узел с наименьшей стоимостью (самый быстрый путь)
 * 2) Обновить стоимость соседей этого узла
 * 3) Повторять, пока это не будет сделано для всех узлов
 * 4) Вычислить итоговый путь
 */

const graph = {};
graph.start = {};
graph.a = {};
graph.b = {};
graph.fin = {};
graph.start.a = 6;
graph.start.b = 2;

graph.a.fin = 1;
graph.b.a = 3;
graph.b.fin = 5;

// Таблица стоимостей
const costs = {};
costs.a = 6;
costs.b = 2;
costs.fin = Infinity;

// Таблица родительских узлов
const parents = {};
parents.a = "start";
parents.b = "start";
parents.fin = null;

// Массив обработанных узлов (один узел не должен обрабатываться дважды).
const processed = [];

// Пошаговый алгоритм
/* 1) Пока есть необработанные узлы:
    2) Взять узел, ближайший к началу
    3) Обновить стоимость для его соседей
    4) Если стоимость какого-нибудь соседа была обновлена, 
    то обновить его родительский узел 
    5) Пометить узел как обработанный. Перейти к пункту 1.
  */

const findLowestCostNode = (costs) => {
  let lowerCostNode = null;
  let lowerCost = Infinity;
  for (const node in costs) {
    const cost = costs[node];
    if (cost < lowerCost && processed.indexOf(node) === -1) {
      // Находим наименьшую стоимость и проверяем нет ли
      // этого узла в массиве уже проверенных
      lowerCost = cost;
      lowerCostNode = node;
    }
  }

  // Вернет null, если все узлы уже обработаны
  return lowerCostNode;
};

const dijkstraSearch = () => {
  // Находим узел с наименьшей стоимостью
  let node = findLowestCostNode(costs);

  // Цикл завершится, если все узлы обработаны, т.к. node
  // в случае будет null
  while (node !== null) {
    const cost = costs[node];
    const neighbors = graph[node];

    for (const n in neighbors) {
      // Вычисляем можно ли добраться к соседу быстрее
      // через текущий узел (node)
      const newCost = cost + neighbors[n];
      if (costs[n] > newCost) {
        // Если можно, то обновляем таблицы.
        // Обновляем стоимость для этого узла
        costs[n] = newCost;

        // Текущий узел становится родительским для соседа, т.к.
        // в него можно попасть по более короткому пути
        parents[n] = node;
      }
    }

    // Помечаем текущий узел как обработанный
    processed.push(node);

    // Находим новый узел с наименьшей стоимостью,
    // игнорируя уже обработанные
    node = findLowestCostNode(costs);
  }
};

// В итоге получаем за сколько можно быстрее добраться к каждому узлу и
// через какой узел
dijkstraSearch();
console.log(costs, parents);
