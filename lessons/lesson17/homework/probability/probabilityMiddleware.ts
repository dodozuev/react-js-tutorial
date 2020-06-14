import { Dispatch } from "react";
import { ProbableAction } from "./probableAction";

/*

Курс React, урок 17: Middlewares

Домашнее задание 3
src/lesson17/homework/probability.ts

Напишите свой probablity middleware:
Если action имеет поле `meta.probability` то пусть он исполнится с этой вероятностью
probablity это число от 0 до 1

// Пример с 50% вероятностью
`dispatch({ type: 'ANALYTICS_CLICK', meta: { probability: 0.5 }})` 

+1 балл за свой probablity middleware и подключение в приложение
+1 балл за тесты

*/

// TODO: спросить, как правильно написать здесь store по ts
export const probabilityMiddleware = () => (
  next: Dispatch<ProbableAction>
) => async (action: ProbableAction) => {
  if (typeof action?.meta?.probability !== "number") {
    return next(action);
  }
  const randomNumber = Math.random();
  return action.meta.probability > randomNumber ? next(action) : void 0;
};
