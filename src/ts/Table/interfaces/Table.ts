import React from 'react';

import type { RowId } from './Row';
import { ITableRow } from './Row';

export interface ITable extends React.HTMLAttributes<HTMLDivElement> {
  /** Столбцы */
  children: React.ReactNode[],
  /** Строки */
  rows: ITableRow[] | any,
  /** Конфиг с фильтрами и параметром сортировки */
  sortConfig?: any,
  /** Колбек на фильтрацию строк и сортировку */
  updateSortConfig?: Function,
  /** Колбек на выбор/снятие выбора со строки (на нажатие по чекбоксу строки).
  * * ids - массив id выбранных строк таблицы,
  */
  onRowSelectionChange?: (rows: ITableRow[], ids: RowId[]) => void;
  /** Функция рендера содержимого раскрытой части строки (детализации строки) */
  onRowExpansionRender?: (row: ITableRow) => React.ReactNode;
  /** Колбек для клика по строке таблицы
   * rowId - id объекта строки (id, uuid, code и т.д.),
   * data - данные строки, опциональный параметр
   * */
  onRowClick?: (rowId: RowId, data?: ITableRow) => void;
  /** Колбек для проверки заблокирована строка или нет
   * В первом варианте отталкивался от Checkbox, но понял, что причина блокировки может быть любая
   * */
  isBlockedRow?: (row: ITableRow) => boolean;
}
