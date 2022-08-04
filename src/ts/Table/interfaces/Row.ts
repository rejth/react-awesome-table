import React from 'react';

export type RowId = string | number;

export interface ITableRow {
  id: RowId;
  className?: string;
  /** Строка в состоянии selected */
  selected?: boolean;
  /** Строка в раскрытом состоянии (детализация строки) */
  expanded?: boolean;
  /** Функция рендера содержимого раскрытой части строки (детализации строки) */
  expandedRowRender?: (row: ITableRow) => React.ReactNode;
}
