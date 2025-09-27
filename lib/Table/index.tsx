import React from 'react';
import { Table, TableProps } from 'antd';
import './ResizableTable.less';
import { AnyObject } from 'antd/es/_util/type';
import TableHeaderCell from './table-header-cell';

const ResizableTable = <RecordType = AnyObject,>({
  columns: originalColumns,
  dataSource
}: TableProps<RecordType>) => {
  const resizableColumns = (originalColumns || []).map((column) => ({
    ...column,
    onHeaderCell: (column: Record<string, any>) => ({
      width: column.width,
      onResize: (e: React.SyntheticEvent<Element>, data: any) => {
        console.log('Resized!', e, data);
      }
    })
  }));

  return (
    <Table
      columns={resizableColumns}
      dataSource={dataSource}
      components={{
        header: { cell: TableHeaderCell }
      }}
    />
  );
};

export default ResizableTable;
