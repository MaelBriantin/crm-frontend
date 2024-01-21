export const dataTableTypeList = ['chips', 'text', 'number', 'boolean', 'date', 'currency', 'percentage', 'link'];

export type DataTableType = typeof dataTableTypeList[number];

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
  color?: { background: string | undefined, text: string | undefined } | undefined;
  onClick?: () => void | undefined;
};

export type TableCellProps = {
  even?: boolean;
};

export type ColumnColorProps = { value: string | number, background?: string, text?: string };

export type ColumnProps = {
  text: string;
  value: string;
  sortable: boolean;
  type?: string;
  color?: ColumnColorProps[] | undefined;
};

export type RowDataType = {
  [key: string]: string | number | string[] | number[] | undefined | null;
};

export type DataTableProps<T extends RowDataType> = {
  data: T[];
  columns: ColumnProps[];
  selectable?: boolean;
  rowsPerPage?: number;
};

export type TableRowProps = {
  even?: boolean;
};
