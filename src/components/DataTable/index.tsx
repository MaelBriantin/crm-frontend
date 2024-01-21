import React from 'react';
import { styled } from 'styled-components';
import { theme } from '../../assets/themes';
import { sortBy, extractBetween } from '../../utils/helpers/spells';
import { RowType } from '../../types/DataTableTypes';
import { RowDataType, ColumnProps, DataTableProps } from '../../types/DataTableTypes';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';
import { DataTableActions } from './DataTableActions';

export const DataTable = <T extends RowDataType>({ data, columns, selectable = false, rowsPerPage = 10 }: DataTableProps<T>): React.ReactElement => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);
    const [page, setPage] = React.useState<number>(1);

    const dataNumber = data.length;
    const maxPageNumber = Math.ceil(dataNumber / rowsPerPage);

    if (maxPageNumber < page) {
        setPage(maxPageNumber);
    }

    const sortedData = sortBy(data, sort, sortDirection);
    const dataOnPage = extractBetween(sortedData, (page - 1) * rowsPerPage, page * rowsPerPage);

    const handleSort = (column: ColumnProps) => {
        if (column.sortable) {
            if (sort === column.value) {
                setSortDirection(!sortDirection);
            } else {
                setSortDirection(true);
                setSort(column.value);
            }
        }
    };

    return (
        <Container>
            <Table>
                <DataTableHeader columns={columns} sort={sort} sortDirection={sortDirection} handleSort={handleSort} />
                <DataTableBody data={dataOnPage as RowType[]} columns={columns} selectable={selectable} />
            </Table>
            <DataTableActions page={page} setPage={setPage} dataNumber={dataNumber} rowsPerPage={rowsPerPage} maxPageNumber={maxPageNumber} />
        </Container>

    );
};

const Container = styled.div`
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    margin: auto;
    overflow: auto;
    border-collapse: collapse;
    border: 1px solid #f9f9f9;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;