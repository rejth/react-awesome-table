import React from 'react';

import type { ITableColumn } from '../../interfaces/Column';
import getFormattedValues from '../../helpers/formatter';

interface ITableCellStringProps {
  config: ITableColumn,
  values: any,
}

function TableCellString(props: ITableCellStringProps): JSX.Element {
  const { config, values } = props;
  const { formatter, prefixes, width } = config;
  const cellValues = getFormattedValues(values, formatter, prefixes);
  const value = cellValues.join(' ') ?? '';

  return (
    <div
      className="table-cell"
      title={value}
      style={{ width }}
    >
      <div className="table-cell--string">
        {value}
      </div>
    </div>
  );
}

export default TableCellString;
