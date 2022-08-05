import React, { useState } from 'react';
import type { ITableColumn } from '../../interfaces/Column';

interface ITableCellListProps {
  config: ITableColumn,
  values: any,
}

function getFullList(cellValues: any) {
  return cellValues.join(', ');
}

function getShortList(
  cellValues: any,
  length: number,
  showDetails: boolean,
  setShowDetails: Function,
) {
  const firstItem = cellValues.shift();
  return (
    <>
      <div className="table-cell--list-title">
        <span className="table-cell--list-text">
          {firstItem}
        </span>
        <span className="table-cell--list-number">
          {`+${length - 1}`}
        </span>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="table-cell--list-more"
        onKeyDown={() => { setShowDetails(!showDetails); }}
        onClick={() => { setShowDetails(!showDetails); }}
      >
        Развернуть список
      </div>
    </>
  );
}

function TableCellList(props: ITableCellListProps): JSX.Element {
  const { config, values } = props;
  const { width } = config;
  const cellValues = (values || [])[0].split(', ') || [];
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const { length } = cellValues;
  let content: any = cellValues.join(' ');

  if (length > 1) {
    content = showDetails
      ? getFullList(cellValues)
      : getShortList(cellValues, length, showDetails, setShowDetails);
  }

  return (
    <div
      className="table-cell"
      title={content}
      style={{ width }}
    >
      <div className="table-cell--string">
        {content}
      </div>
    </div>
  );
}

export default TableCellList;
