import React from 'react';
import { styled, css, RuleSet } from 'styled-components';
import { theme } from '../../assets/themes';
import { sortBy, extractBetween } from '../../utils/helpers/spells';
import { VscChevronUp, VscBlank, VscChevronLeft, VscChevronRight } from "react-icons/vsc";
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
    color?: ComumnColorProps[] | undefined;
};

type ComumnColorProps = { value: string | number, background?: string, text?: string };

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


    /**
     * Get the color based on the columnColor array and the specified value.
     *
     * @param {Array} columnColor - An array of objects representing the column colors.
     * Each object should have the following properties:
     *   - {string|number} value - The value to match.
     *   - {string} background - The background color associated with the value.
     *   - {string} text - The text color associated with the value.
     *   - If the value is '*', the color will be applied to all values.
     *   - If the value is '*<number', the color will be applied to all values below the number.
     *   - If the value is '*>number', the color will be applied to all values above the number.
     *   - If the value is a string or a number, the color will be applied to that specific value.
     * @param {string|number} value - The value to match against the column names in the columnColor array.
     * @returns {Object|undefined} - An object containing background and text colors associated with the matched column name,
     * or undefined if no match is found.
     */
    const getColor = (columnColor: ComumnColorProps[] | undefined, value: string) => {
        if (columnColor && Array.isArray(columnColor)) {
            const wildcard = columnColor.find((color) => typeof color.value === 'string' && color.value.startsWith('*'));
            if (wildcard) {
                if (wildcard.value === '*') {
                    return {
                        background: wildcard.background,
                        text: wildcard.text
                    };
                }
                if (typeof wildcard.value === 'string' && wildcard.value.startsWith('*<')) {
                    const threshold = parseInt(wildcard.value.substring(2));
                    if (parseInt(value) < threshold) {
                        return {
                            background: wildcard.background,
                            text: wildcard.text
                        };
                    }
                }
                if (typeof wildcard.value === 'string' && wildcard.value.startsWith('*>')) {
                    const threshold = parseInt(wildcard.value.substring(2));
                    if (parseInt(value) > threshold) {
                        return {
                            background: wildcard.background,
                            text: wildcard.text
                        };
                    }
                }
            }
            const color = columnColor.find((color) => color.value == value);
            if (color && color.value == value) {
                return {
                    background: color.background,
                    text: color.text
                };
            }
        }
        return undefined;
    };

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
                                            ? <VscChevronUp />
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
                                    color={getColor(column.color, row[column.value])}
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
                    {page != maxPageNumber ? <VscChevronRight className={'changePage'} onClick={() => setPage(page => Math.min(page + 1, maxPageNumber))} />
                        : <VscBlank />}
                </PageChanger>
            </TableActions>
        </Container>

    );
};

const Container = styled.div`
    padding: 10px 20px;
    width: 100%;
    max-height: 550px;
    //overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    height: 100%;
    margin: auto;
    overflow: auto;
    border-collapse: collapse;
    border: 1px solid #f9f9f9;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;

const TableHeader = styled.th<{ $sort: boolean, $sortable: boolean }>`
    padding: 8px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #f9f9f9;
    text-align: left;
    vertical-align: middle;
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
    justify-content:space-between;
    align-items: center;
    gap: 5px;
    min-width: 50px;
    .sortIcon{
        ${({ $sort }): false | RuleSet<object> => $sort && css`color: ${theme.colors.primary};`}
        font-size: ${theme.fonts.size.P0};
        transition: all 250ms;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0;
        transform: rotate(0);
        ${({ $sortDirection }): false | RuleSet<object> => $sortDirection && css`transform: rotate(-180deg);`}
    }
`;

const TableRow = styled.tr<TableRowProps>`
    transition: all 250ms;
    background-color: white;
    height: 40px;
    overflow: hidden;
    width: 100%;
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
                transform: scale(1.01);
                box-shadow: ${theme.shadows.default};
                cursor: pointer;
                border-radius: ${theme.materialDesign.borderRadius.rounded};
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