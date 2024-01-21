export type RowType = {
    [key: string]: string | string[] | number | boolean;
  };

export type ColumnType = {
    value: string;
    type?: DataTableType;
  };

export type DataTableCellProps = {
    row: RowType;
    column: ColumnType;
    columnIndex: number;
    color?: { background: string | undefined, text: string | undefined} | undefined;
    onClick?: () => void | undefined;
};

export type TableCellProps = {
    even?: boolean;
};

export type DataTableType = typeof dataTableTypeList[number];

export const dataTableTypeList = ['chips', 'text', 'number', 'boolean', 'date', 'currency', 'percentage', 'link'];
