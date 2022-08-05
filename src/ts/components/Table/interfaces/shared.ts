import type { ITableColumn } from './Column';

export interface IOverflowMenu {
  label: string, // название опции
  value: string, // значение опции
  callback: Function, // колбэк на изменение опции
  isHidden?: boolean, // опция скрыта
}

export interface ITableConfig {
  config: ITableColumn[],
}
