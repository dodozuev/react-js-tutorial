/* eslint-disable no-console */

import { AnyAction } from "redux";
import { Dispatch } from "react";
import { FetchAction } from "../asyncFlow/actions";

/*

Курс React, урок 17: Middlewares

Домашнее задание 2
src/lesson17/homework/thunk.ts

Напишите свой thunk middleware и подключите в приложение

+1 балл за свой thunk middleware и подключение в приложение
+1 балл за тесты

*/

// For demonstration purpose only
let __dispatchCounter = 0;
export const counterMiddleware = ({}) => (next: Dispatch<AnyAction>) => async (
  action: FetchAction
) => {
  const resultAction = next(action);
  console.log(`Dispatched ${++__dispatchCounter} times`);

  return resultAction;
};
