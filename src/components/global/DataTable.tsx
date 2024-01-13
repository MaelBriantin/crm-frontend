import React from 'react';
import { styled, css, RuleSet } from 'styled-components';
import { theme } from '../../assets/themes';
import { sortBy, extractBetween } from '../../utils/helpers/spells';
import { VscChevronDown, VscBlank, VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { DataTableCell } from './DataTableCell';

type DataTableProps<T> = {
    data: T[];
    columns: ColumnProps[];
    selectable?: boolean;
    rowsPerPage?: number;
};

type ColumnProps = {
    text: string;
    value: string;
    sortable: boolean;
    type?: string;
};

type TableRowProps = {
    even?: boolean;
};

export const DataTable: React.FC<DataTableProps<any>> = ({ data, columns, selectable = false, rowsPerPage = 10 }) => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);
    const [page, setPage] = React.useState<number>(1);

    const dataNumber = data.length;
    const maxPageNumber = Math.ceil(dataNumber / rowsPerPage);

    if (maxPageNumber < page) {
        setPage(maxPageNumber);
    };

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
                <thead>
                    <TableRowHeader>
                        {columns.map((column, index) => (
                            <TableHeader key={index}
                                onClick={() => handleSort(column)}
                                $sort={sort === column.value}
                                $sortable={column.sortable}
                            >
                                <ColumnTitle $sort={sort === column.value} $sortDirection={sortDirection}>
                                    <span className={'columnTitle'}>{column.text}</span>
                                    <span className={'sortIcon'}>
                                        {(column.sortable && column.value) === sort
                                            ? <VscChevronDown />
                                            : <VscBlank />}
                                    </span>
                                </ColumnTitle>
                            </TableHeader>
                        ))}
                    </TableRowHeader>
                </thead>
                <tbody>
                    {dataOnPage.map((row, rowIndex) => (
                        <TableRowBody
                            key={rowIndex}
                            $selectable={selectable}
                        >
                            {columns.map((column, columnIndex) => (
                                <DataTableCell
                                    key={columnIndex}
                                    row={row}
                                    column={column}
                                    columnIndex={columnIndex}
                                />
                            ))}
                        </TableRowBody>
                    ))}
                </tbody>
            </Table>
            <TableActions>
                <span>Lignes totales : {dataNumber}</span>
                <span>Résultats par page : {rowsPerPage}</span>
                <PageChanger>
                    {page != 1 ? <VscChevronLeft className={'changePage'} onClick={() => setPage(page => Math.max(page - 1, 1))} />
                        : <VscBlank />}
                    <span>Page {page} sur {maxPageNumber}</span>
                    { page != maxPageNumber ? <VscChevronRight className={'changePage'} onClick={() => setPage(page => Math.min(page + 1, maxPageNumber))} />
                        : <VscBlank />}
                </PageChanger>
            </TableActions>
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
    border-collapse: collapse;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;

const TableHeader = styled.th<{ $sort: boolean, $sortable: boolean }>`
    padding: 8px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 1;
    user-select: none;
    cursor: default;
    transition: all 250ms;
    ${({ $sortable }): false | RuleSet<object> => $sortable && css`
        &:hover {
            background-color: ${theme.colors.white};
            cursor: pointer;
            box-shadow: inset ${theme.shadows.default};
        }
    `}
`;

const ColumnTitle = styled.div<{ $sort: boolean, $sortDirection: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    .sortIcon{
        ${({ $sort }): false | RuleSet<object> => $sort && css`color: ${theme.colors.primary};`}
        font-size: ${theme.fonts.size.P0};
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0;
        ${({ $sortDirection }): false | RuleSet<object> => $sortDirection && css`transform: rotate(180deg);`}
    }
`;

const TableRow = styled.tr<TableRowProps>`
    transition: all 250ms;
    background-color: white;
    &:nth-child(even) {
        background-color: #f5f5f5;
    }
`;

const TableRowBody = styled(TableRow) <{ $selectable: boolean }>`
    transition: all 250ms;
    outline: 1px solid ${theme.colors.transparent};
    ${({ $selectable }): false | RuleSet<object> =>
        $selectable &&
        css`
            &:hover {
                outline: 1px solid ${theme.colors.primary};
                cursor: pointer;
            }
        `}
`;

const TableRowHeader = styled(TableRow)`
    font-family: ${theme.fonts.family.dancing};
    font-size: ${theme.fonts.size.P2};
`;

const TableActions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 40px;
    padding: 10px 0;
    font-size: ${theme.fonts.size.P0};
`;

const PageChanger = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    span{
        font-size: ${theme.fonts.size.P0};
    }
    .changePage{
        font-size: ${theme.fonts.size.P0};
        cursor: pointer;
        &:hover{
            color: ${theme.colors.primary};
        }
    }
`;