import type { IOverflowMenu } from './shared';

export type ColumnType = 'STRING' | 'NUMBER' | 'CHECKBOX' | 'EXPAND' | 'MENU' | 'LINK' | 'LIST' | 'DROPDOWN';

/** Тип столбца определяет тип содержимого всех ячеек столбца */
export enum ColumnTypesEnum {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  /** Столбец содержит компонент Checkbox */
  CHECKBOX = 'CHECKBOX',
  /** Столбец содержит кнопку для детализации строки */
  EXPAND = 'EXPAND',
  /** Столбец содержит компонент OverflowMenu  */
  MENU = 'MENU',
  /** Столбец содержит ссылку  */
  LINK = 'LINK',
  /** Столбец содержит список строковых значений  */
  LIST = 'LIST',
  /** Столбец содержит компонент Dropdown  */
  DROPDOWN = 'DROPDOWN',
}

export interface ITableColumn {
  /** Тип столбца */
  template: ColumnType,
  /** Уникальный ключ столбца */
  properties: string[],
  /** Заголовок столбца */
  title?: string,
  /** Префиксы для заголовка столбца */
  prefixes?: string[],
  /** Суффиксы для заголовка столбца (%, $ и т.д.) */
  suffixes?: string[],
  /** Функция для форматирования данных в столбце */
  formatter?: Function[],
  /** Столбец заблокирован для взаимодействия */
  isDisabled?: boolean
  /** Отображение столбца как фиксированного (который остается при скролле на месте).
  * Фиксированные столбцы располагаются по левому краю таблицы и идут друг за другом
  */
  isFixed?: boolean,
  /** Сортировка столбца */
  isSortable?: boolean,
  /** Изменение ширины столбца */
  isResizable?: boolean,
  /** Drag-and-Drop столбца */
  isDraggable?: boolean,
  /** Видимость столбца */
  isShow?: boolean,
  /** Ширина столбца */
  width?: number,
  /** Массив опций для компонента OverflowMenu */
  overflowMenu?: IOverflowMenu[],
  /** Колбэк для действия над строкой */
  callback?: Function,
}
