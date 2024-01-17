export type RowType = {
    [key: string]: string | string[] | number | boolean;
  };

export type ColumnType = {
    value: string;
    type?: 'chips' | 'text';
  };

export type DataTableCellProps = {
    row: RowType;
    column: ColumnType;
    columnIndex: number;
    color?: { background: string | undefined, text: string | undefined} | undefined;
};

export type TableCellProps = {
    even?: boolean;
};
