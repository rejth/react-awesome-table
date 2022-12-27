/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import type { ITable } from './interfaces/Table';
import type { ITableRow, RowId } from './interfaces/Row';
import type { ITableColumn } from './interfaces/Column';
import type { ITableConfig } from './interfaces/shared';

import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import calculateColumnWidth from './helpers/calculateTableWidth';
import getColumnConfigs from './helpers/getColumnConfigs';

import './styles/index.scss';

function getColumnsWithProps(children: any) {
  return React.Children.map(children, (child: React.ReactChild) => {
    if (!React.isValidElement(child)) return null;
    return child.props;
  });
}

function Table(props: ITable): JSX.Element | null {
  const {
    rows = [],
    children,
    sortConfig,
    updateSortConfig,
    onRowSelectionChange,
    onRowExpansionRender,
    onRowClick,
    isBlockedRow,
  } = props;
  if (!rows || !rows.length) return null;

  const columns = getColumnsWithProps(children);
  const tableConfig = getColumnConfigs(columns);
  const stickyColumns = [...tableConfig.config].filter((col) => col?.isFixed);

  const [rowList, setRows] = React.useState<ITableRow[]>([...rows]);
  const [columnConfigs, setColumnConfigs] = React.useState<ITableConfig>(tableConfig);
  React.useEffect(() => setRows(rows), [rows]);

  const centerResizeLine = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const measuredRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const scrollBodyRef = React.useRef<HTMLDivElement>(null);

  const setShadow = (scrollLeft: number): void => {
    if (measuredRef.current) {
      const initial = measuredRef.current.getAttribute('data-shadow');
      if (scrollLeft === 0) {
        if (initial !== 'false') measuredRef.current.setAttribute('data-shadow', 'false');
      } else if (initial !== 'true') measuredRef.current.setAttribute('data-shadow', 'true');
    }
  };

  React.useLayoutEffect(() => {
    const handleScroll = (e: any) => {
      if (stickyColumns.length) {
        requestAnimationFrame(() => {
          setShadow(e.target.scrollLeft);
        });
      }
    };
    const scrollBody = measuredRef.current;
    if (scrollBody) {
      scrollBody.addEventListener('scroll', handleScroll);
      return () => scrollBody.removeEventListener('scroll', handleScroll);
    }
    return () => {};
  }, [stickyColumns.length]);

  React.useLayoutEffect(() => {
    const updateTableWidth = (): void => {
      if (!tableConfig) return;
      const newColumnConfigs = calculateColumnWidth(measuredRef, tableConfig);
      setColumnConfigs(newColumnConfigs);
    };
    window.addEventListener('resize', updateTableWidth);
    updateTableWidth();
    return () => window.removeEventListener('resize', updateTableWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSelected = (row: ITableRow) => row?.selected || false;
  const getRowId = (row: ITableRow) => row?.id;

  const handleRowClick = (id: RowId): void => {
    const rowData = rowList.find((row: ITableRow) => getRowId(row) === id);
    onRowClick?.(id, rowData);
  };

  const handleCheckboxChange = (id: RowId): void => {
    const updatedRows = rowList.map((row: ITableRow) => {
      const value = getRowId(row) === id ? !row.selected : !!row.selected;
      return { ...row, selected: value || false };
    });
    if (onRowSelectionChange) {
      const selectedRows = updatedRows.filter(isSelected);
      onRowSelectionChange(selectedRows, selectedRows.map(getRowId));
    }
    setRows(updatedRows);
  };

  const handleHeaderCheckboxChange = (): void => {
    const someRowsChecked = rowList.some(isSelected);
    const updatedRows = rowList.map((row: ITableRow) => {
      const isBlocked = isBlockedRow ? isBlockedRow(row) : false;
      return { ...row, selected: isBlocked ? false : !someRowsChecked };
    });
    if (onRowSelectionChange) {
      const selectedRows = updatedRows.filter(isSelected);
      onRowSelectionChange(selectedRows, selectedRows.map(getRowId));
    }
    setRows(updatedRows);
  };

  const handleExpansionChange = (id: RowId): void => {
    const updatedRows = rowList.map((row: ITableRow) => {
      const value = getRowId(row) === id ? !row.expanded : !!row.expanded;
      return {
        ...row,
        expanded: value || false,
        expandedRowRender: row?.expandedRowRender || onRowExpansionRender,
      };
    });
    setRows(updatedRows);
  };

  const resizeColumnWidth = (activeId: number, resizedWidth: number): void => {
    const columnsWithChangedWidth = columnConfigs.config.map(
      (config: ITableColumn, index: number) => {
        if (index === activeId) return { ...config, width: resizedWidth };
        return { ...config };
      },
    );
    setColumnConfigs({ config: columnsWithChangedWidth });
  };

  const dropColumn = (tempColumns: ITableColumn[]): void => {
    setColumnConfigs({ config: tempColumns });
  };

  return (
    <div
      ref={measuredRef}
      className="table"
      data-shadow={false}
    >
      <div
        ref={centerResizeLine}
        className="table-resize-line"
        data-column="0"
      />
      <TableHead
        resizeLine={centerResizeLine}
        columns={columnConfigs.config}
        rows={rowList}
        sortConfig={sortConfig}
        updateSortConfig={updateSortConfig}
        updateDraggableColumn={dropColumn}
        updateColumnWidth={resizeColumnWidth}
        handleHeaderCheckboxChange={handleHeaderCheckboxChange}
      />
      <TableBody
        ref={scrollBodyRef}
        rows={rowList}
        columns={columnConfigs.config}
        handleCheckboxChange={handleCheckboxChange}
        handleExpansionChange={handleExpansionChange}
        handleRowClick={handleRowClick}
        isBlockedRow={isBlockedRow}
      />
    </div>
  );
}

Table.defaultProps = {
  rows: [],
  sortConfig: {},
  updateSortConfig: () => {},
  isBlockedRow: () => false,
};

export default Table;
