import React from 'react';
import { styled } from 'styled-components';
import { theme } from '../../assets/themes';
import { sortBy, extractBetween } from '../../utils/helpers/spells';
import { RowType } from '../../types/DataTableTypes';
import { RowDataType, ColumnProps, DataTableProps } from '../../types/DataTableTypes';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';
import { DataTableActions } from './DataTableActions';
import { DataTableTopBar } from './DataTableTopBar';
import { useModal } from '../../contexts/global/ModalContext';
import { SectorForm } from '../forms/SectorForm';

export const DataTable = <T extends RowDataType>({ 
    data, 
    columns, 
    onClickOnRow, 
    onDoubleClickOnRow, 
    hoverable = false, 
    searchbar = false, 
    emptyMessage,
    sort,
    setSort,
    sortDirection,
    setSortDirection }: DataTableProps<T>): React.ReactElement => {

    const selectable = onClickOnRow !== undefined || onDoubleClickOnRow !== undefined;

    // const [sort, setSort] = React.useState<string | null>(null);
    // const [sortDirection, setSortDirection] = React.useState<boolean>(true);
    const [page, setPage] = React.useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [searchResults, setSearchResults] = React.useState<T[]>([]);
    const [searchedValue, setSearchedValue] = React.useState<string | number>('');

    const { showModal } = useModal();

    const openModal = () => {
        showModal(<SectorForm />, 'Créer un secteur');
    };

    let dataNumber = data.length;

    if (searchResults.length > 0) {
        dataNumber = searchResults.length;
    }

    const sortedData = searchbar
        ? sortBy(searchResults, sort, sortDirection)
        : sortBy(data, sort, sortDirection);

    let dataOnPage = sortedData;
    let maxPageNumber: number | undefined = undefined;

    if (rowsPerPage !== Infinity) {
        maxPageNumber = Math.ceil(dataNumber / rowsPerPage);
        if (maxPageNumber < page) {
            setPage(maxPageNumber);
        }
        dataOnPage = extractBetween(sortedData, (page - 1) * rowsPerPage, page * rowsPerPage);
    } else {
        maxPageNumber = 1;
    }

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
            {searchbar &&
                <DataTableTopBar
                    withAdvancedSearch
                    setSearchedValue={setSearchedValue}
                    data={data as T[]}
                    columns={columns}
                    onSearch={setSearchResults}
                    onClick={openModal}
                />
            }
            <Table>
                <DataTableHeader
                    columns={columns}
                    sort={sort}
                    sortDirection={sortDirection || false}
                    handleSort={handleSort}
                />
                <DataTableBody
                    searchedValue={searchedValue}
                    data={dataOnPage as RowType[]}
                    columns={columns}
                    onClickOnRow={onClickOnRow}
                    onDoubleClickOnRow={onDoubleClickOnRow}
                    selectable={selectable}
                    hoverable={hoverable}
                />
            </Table>
            {sortedData.length > 0 &&
                <DataTableActions
                    page={page}
                    setPage={setPage}
                    dataNumber={dataNumber}
                    setRowsPerPage={setRowsPerPage}
                    defaultRowsPerPage={rowsPerPage}
                    maxPageNumber={maxPageNumber ? maxPageNumber : undefined}
                />
            }
            {(sortedData.length === 0 && searchedValue === '') &&
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    {emptyMessage ? emptyMessage : 'Aucun résultat trouvé'}
                </div>
            }
            {(sortedData.length === 0 && searchedValue !== '') &&
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    {'Aucun résultat trouvé pour cette recherche'}
                </div>
            }
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