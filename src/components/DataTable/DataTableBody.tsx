import { ColumnProps, RowType } from '../../types/DataTableTypes';
import { DataTableRow } from './DataTableRow';

type DataTableBodyProps = {
    data: RowType[];
    columns: ColumnProps[];
    onClickOnRow?: (row: RowType) => void;
    onDoubleClickOnRow?: (row: RowType) => void;
    selectable: boolean;
    hoverable: boolean;
    searchedValue?: string | number;
};

export const DataTableBody = ({ data, columns, onClickOnRow, onDoubleClickOnRow, selectable, hoverable, searchedValue }: DataTableBodyProps) => {
    return (
        <tbody>
            {data.map((row, rowIndex) => (
                <DataTableRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    columns={columns}
                    onClickOnRow={onClickOnRow}
                    onDoubleClickOnRow={onDoubleClickOnRow}
                    selectable={selectable}
                    hoverable={hoverable}
                    searchedValue={searchedValue}
                />
            ))}
        </tbody>
    );
};
