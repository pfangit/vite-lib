import type React from 'react';
import { useState } from 'react';
import { Resizable, type ResizeCallbackData } from 'react-resizable';
import './table-header-cell.less';

interface TitlePropsType {
  width: number;
  onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void;
}

const TableHeaderCell: React.FC<Readonly<React.HTMLAttributes<any> & TitlePropsType>> = (props) => {
  const { onResize: onTitleResize, width, children, ...restProps } = props;

  const [draggableWidth, setDraggableWidth] = useState(width);

  // 没有宽度的 不允许被拖拽
  if (!width) {
    return <th {...restProps} />;
  }

  const onResize = (_: any, data: ResizeCallbackData) => {
    const nowWidth = data?.size?.width || draggableWidth;
    setDraggableWidth(nowWidth);
  };

  const onResizeStop = (e: any, data: ResizeCallbackData) => {
    onTitleResize(e, data);
    console.log(e, data);
  };

  return (
    <th {...restProps}>
      <Resizable
        width={draggableWidth}
        height={0}
        axis="x"
        handle={<span className="react-draggable react-resizable-handle"></span>}
        onResize={onResize}
        onResizeStop={onResizeStop}
      >
        <div style={{ width: draggableWidth }}></div>
      </Resizable>
      {children}
    </th>
  );
};

export default TableHeaderCell;
