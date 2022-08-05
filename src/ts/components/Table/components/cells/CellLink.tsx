import React from 'react';
import { Link } from 'react-router-dom';

import type { ITableColumn } from '../../interfaces/Column';
import getFormattedValues from '../../helpers/formatter';

interface ITableCellLinkProps {
  config: ITableColumn,
  values: any,
}

function TableCellLink(props: ITableCellLinkProps): JSX.Element {
  const { config, values } = props;
  const { formatter, prefixes, width } = config;
  const cellValues = getFormattedValues(values, formatter, prefixes);

  const links = cellValues.map((data: any) => (
    <Link
      key={`${data[0]}`}
      className="table-cell--link"
      to={`${data[0]}`}
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      {data[1] || 'ссылка'}
    </Link>
  ));

  return (
    <div
      className="table-cell"
      style={{ width }}
    >
      <div className="table-cell--link">
        {links}
      </div>
    </div>
  );
}

export default TableCellLink;
