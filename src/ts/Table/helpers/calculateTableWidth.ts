import type { ITableColumn } from '../interfaces/Column';
import type { ITableConfig } from '../interfaces/shared';
import getColumnConfigs from './getColumnConfigs';

function calculateColumnWidth(tableRef: any, userSettings: ITableConfig): ITableConfig {
  const actualColumnConfigs = userSettings.config.filter(({ isShow }: ITableColumn) => isShow);

  // Columns with calculated width
  const countColumns = (actualColumnConfigs || [])
    .filter(({ isFixed }: ITableColumn) => !isFixed).length;

  // Columns with fixed width
  const fixedWidth = actualColumnConfigs
    .filter(({ isFixed }: ITableColumn) => isFixed)
    .reduce((sum: number, { width = 150 }: ITableColumn) => (sum + width), 0);

  // @ts-ignore
  const tableWidth = tableRef.current.offsetWidth - fixedWidth;
  const calculatedColumnWidth = Math.max(tableWidth / countColumns, 150);
  return getColumnConfigs(
    actualColumnConfigs,
    calculatedColumnWidth,
  );
}

export default calculateColumnWidth;
