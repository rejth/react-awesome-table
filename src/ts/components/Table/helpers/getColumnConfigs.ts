import type { ITableColumn } from '../interfaces/Column';
import type { ITableConfig } from '../interfaces/shared';

function defineColumnWidth(
  config: ITableColumn,
  calculatedColumnWidth: number,
): number {
  return config.isFixed ? config.width || 150 : calculatedColumnWidth;
}

function getColumnConfigs(
  shownColumnsConfig: ITableColumn[] = [],
  calculatedColumnWidth = 150,
): ITableConfig {
  const commonConfig = shownColumnsConfig.map((config: ITableColumn) => ({
    ...config,
    width: defineColumnWidth(config, calculatedColumnWidth),
  }));

  const middle = Math.floor(commonConfig.length / 2);
  const config = [
    ...commonConfig
      .filter((column: ITableColumn, index: number) => column.isFixed && index <= middle),
    ...commonConfig
      .filter((column: ITableColumn) => !column.isFixed),
    ...commonConfig
      .filter((column: ITableColumn, index: number) => column.isFixed && index > middle),
  ];

  return { config };
}

export default getColumnConfigs;
