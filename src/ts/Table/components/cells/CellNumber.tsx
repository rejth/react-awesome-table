import React from 'react';
import type { ITableColumn } from '../../interfaces/Column';

interface ITableCelNumberProps {
  config: ITableColumn,
  values: any,
}

function TableCellNumber(props: ITableCelNumberProps): JSX.Element {
  const { config, values } = props;
  const { formatter = [], width } = config;
  let cellValuesFormatted: any[] = [];

  // for prevent error with null callback due to JSON.stringify()
  if (formatter.findIndex((func) => !func) !== -1) {
    cellValuesFormatted = values;
  } else if (formatter?.length > 1) {
    formatter.forEach((format: Function, index: number) => {
      const formattedValue = format(values[index]);
      cellValuesFormatted.push(formattedValue);
    });
  } else if (formatter?.length === 1) {
    values.forEach((_value: any, index: number) => {
      const formattedValue = formatter[0](values[index]);
      cellValuesFormatted.push(formattedValue);
    });
  }

  return (
    <div
      className="table-cell table-cell--number"
      style={{ width }}
    >
      {cellValuesFormatted.join(' ') ?? ''}
    </div>
  );
}

export default TableCellNumber;
