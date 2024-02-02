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
  [key: string]: RowDataValueTypes;
};

export type RowDataValueTypes = string | number | string[] | number[] | undefined | null;

export type DataTableProps<T extends RowDataType> = {
  data: T[];
  columns: ColumnProps[];
  rowsPerPage?: number;
  onClickOnRow?: (row: RowType) => void;
  onDoubleClickOnRow?: (row: RowType) => void;
  hoverable?: boolean;
};

export type TableRowProps = {
  even?: boolean;
};

export type DataTableSearchProps<T extends RowDataType> = {
  onSearch: (search: string) => void;
  data: T[];

};
