import { Dispatch, SetStateAction } from "react";

export const dataTableTypeList = ['chips', 'text', 'number', 'boolean', 'date', 'currency', 'percentage', 'link'];

export type DataTableType = typeof dataTableTypeList[number];

export type RowType = {
  [key: string]: string | string[] | number | boolean;
};

export type ColumnType = {
  value: string;
  type?: DataTableType;
  actions?: ColumnActionType[];
};

export type DataTableCellProps = {
  row: RowType;
  column: ColumnType;
  columnIndex: number;
  columnWidth?: string;
  columnMaxWidth?: string;
  align?: AlignType | undefined;
  color?: { background: string | undefined, text: string | undefined } | undefined;
  searchedValue?: string | number;
  arrayLimit?: number;
  isHovered?: boolean;
};

export type TableCellProps = {
  even?: boolean;
};

export type ColumnColorProps = { value: string | number, background?: string, text?: string };

export type AlignType = 'start' | 'end' | 'center';

export type ColumnProps = {
  text: string;
  value: string;
  sortable: boolean;
  type?: string;
  limit?: number;
  color?: ColumnColorProps[] | undefined;
  width?: string;
  maxWidth?: string;
  align?: AlignType;
  actions?: ColumnActionType[] | undefined;
};

type ColumnActionType = {
  icon: React.ReactElement;
  onClick: (row: RowType) => void;
  color?: string;
};

export type RowDataType = {
  [key: string]: RowDataValueTypes;
};

export type RowDataValueTypes = string | number | string[] | number[] | object | undefined | null;

export type DataTableProps<T extends RowDataType> = {
  data: T[];
  columns: ColumnProps[];
  rowsPerPage?: number;
  onClickOnRow?: (row: RowType) => void;
  onDoubleClickOnRow?: (row: RowType) => void;
  hoverable?: boolean;
  searchbar?: boolean;
  advancedSearch?: boolean;
  emptyMessage?: string;
  sort: string | null;
  setSort: Dispatch<SetStateAction<string | null>>;
  sortDirection?: boolean;
  setSortDirection: Dispatch<SetStateAction<boolean>>;
  onClickTopBar?: () => void;
  iconTopBar?: React.ReactElement;
  topBar?: boolean;
  search?: boolean;
  buttonValueTopBar?: string;
  loading?: boolean;
};

export type TableRowProps = {
  even?: boolean;
};

export type DataTableSearchProps<T extends RowDataType> = {
  searchedValue: Dispatch<SetStateAction<string | number>>;
  onSearch: Dispatch<SetStateAction<T[]>>;
  data: T[];
  columns: ColumnProps[];
  clearable?: boolean;
  advancedSearch?: boolean;
  isAdvancedSearchEnabled: Dispatch<SetStateAction<boolean>>;
};
