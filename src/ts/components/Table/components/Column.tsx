import React from 'react';

import type { ITableColumn } from '../interfaces/Column';
import type { ITableRow } from '../interfaces/Row';

function Column(props: ITableColumn): JSX.Element {
  const {
    template,
    callback,
    overflowMenu,
    properties,
    prefixes,
    suffixes,
    formatter,
    title,
    isDisabled,
    isFixed,
    isSortable,
    isResizable,
    isDraggable,
    isShow,
    width,
  } = props;

  return (
    <>
      {{
        template,
        callback,
        overflowMenu,
        properties,
        prefixes,
        suffixes,
        formatter,
        title,
        isDisabled,
        isFixed,
        isSortable,
        isResizable,
        isDraggable,
        isShow,
        width,
      }}
    </>
  );
}

Column.defaultProps = {
  title: '',
  prefixes: [''],
  suffixes: [''],
  formatter: [(value: any) => value],
  isDisabled: false,
  isFixed: false,
  isSortable: false,
  isResizable: false,
  isDraggable: false,
  isShow: true,
  width: 150,
  overflowMenu: [],
  callback: (row: ITableRow) => row,
};

export default Column;
