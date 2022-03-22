/** Поиск в ширину в графе O(V+E) V - кол-во вершин, Е - кол-во рёбер.
 * Он помогает ответить на два вопроса
 * 1) Существует ли путь от А до Б
 * 2) Как выглядит кратчайший путь от А до Б
 *
 * Создаём очередь с именами, затем извлекаем из очереди очередного человека,
 * проверяем является ли ли он нужным нам (продавцом манго в данном случае),
 * если да, завершаем, если нет, то добавляем в очередь всех его соседей и пока очередь не пуста продолжаем цикл.
 * Если очередь пуста, значит ничего не найдено.
 */

const graph = {};
graph.you = ["alice", "bob", "claire"];
graph.bob = ["anuj", "peggy"];
graph.alice = ["peggy"];
graph.claire = ["thom", "jonny"];
graph.anuj = [];
graph.peggy = [];
graph.thom = [];
graph.jonny = [];

const personIsSeller = (person) => {
  return person.startsWith("j");
};

const search = (graph, first) => {
  let sequence = graph[first];
  const checked = [];
  while (sequence.length) {
    const person = sequence.pop();

    // Чтобы не проверять дважды одного и того же, нужно добавить персону
    // в массив с уже проверенными, и затем проверять нет ли их в этом списке
    if (!(person in checked)) {
      if (personIsSeller(person)) return `${person} is mango seller`;
      sequence = [...sequence, ...graph[person]];
      checked.push(person);
    }
  }
  return "There are no mango seller in the sequence";
};

console.log(search(graph, "you"));
