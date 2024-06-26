import React, { useEffect } from 'react';
import { keyframes, styled } from 'styled-components';
import { theme } from '../../assets/themes';
import { sortBy, extractBetween, isEmpty } from '../../utils/helpers/spells';
import { RowType } from '../../types/DataTableTypes';
import { RowDataType, ColumnProps, DataTableProps } from '../../types/DataTableTypes';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';
import { DataTableActions } from './DataTableActions';
import { DataTableTopBar } from './DataTableTopBar';

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
    setSortDirection,
    onClickTopBar,
    iconTopBar,
    topBar,
    buttonValueTopBar,
    disabledRow,
}: DataTableProps<T>): React.ReactElement => {

    const selectable = onClickOnRow !== undefined || onDoubleClickOnRow !== undefined;

    const [page, setPage] = React.useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
    const [searchResults, setSearchResults] = React.useState<T[]>([]);
    const [searchedValue, setSearchedValue] = React.useState<string | number>('');
    const [advancedSearch, setAdvancedSearch] = React.useState<boolean>(false);

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
        if (maxPageNumber < page && maxPageNumber > 0) {
            setPage(maxPageNumber);
        }
        dataOnPage = extractBetween(sortedData, (page - 1) * rowsPerPage, page * rowsPerPage);
    } else {
        maxPageNumber = 1;
    }

    useEffect(() => {
        rowsPerPage === Infinity && setPage(1);
    }, [rowsPerPage]);

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
            {topBar &&
                <DataTableTopBar
                    withAdvancedSearch={searchbar}
                    setSearchedValue={setSearchedValue}
                    onSearch={setSearchResults}
                    isAdvancedSearchEnabled={setAdvancedSearch}
                    data={data as T[]}
                    columns={columns}
                    icon={iconTopBar || null}
                    buttonValue={buttonValueTopBar || ''}
                    onClick={onClickTopBar ? onClickTopBar : () => undefined}
                />
            }
            {(sortedData.length > 0) &&
                <Table>
                    <DataTableHeader
                        columns={columns}
                        sort={sort}
                        sortDirection={sortDirection || false}
                        handleSort={handleSort}
                    />

                    <DataTableBody
                        disabledRow={disabledRow}
                        searchedValue={searchedValue}
                        data={dataOnPage as RowType[]}
                        columns={columns}
                        onClickOnRow={onClickOnRow}
                        onDoubleClickOnRow={onDoubleClickOnRow}
                        selectable={selectable}
                        hoverable={hoverable}
                    />
                </Table>}
            {(isEmpty(sortedData) && searchedValue === '' && !advancedSearch) &&
                <FakeTableContainer>
                    <EmptyMessage>
                        {emptyMessage ? emptyMessage : 'Désolé, il semblerait qu\'il n\'y ait rien à afficher ici pour le moment...'}
                    </EmptyMessage>
                </FakeTableContainer>
            }
            {((isEmpty(sortedData) && searchedValue !== '') || (isEmpty(sortedData) && advancedSearch && searchedValue !== '')) &&
                <FakeTableContainer>
                    <EmptyMessage>
                        {'Aucun résultat trouvé pour cette recherche'}
                    </EmptyMessage>
                </FakeTableContainer>
            }
            {
                (isEmpty(sortedData) && advancedSearch && searchedValue === '') &&
                <FakeTableContainer>
                    <EmptyMessage>
                        {'Nous attendons vos instructions pour lancer la recherche'}
                    </EmptyMessage>
                </FakeTableContainer>
            }
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
        </Container>

    );
};

const emptyMessageDisplay = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;


const Container = styled.div`
    padding: 10px 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const FakeTableContainer = styled.div`
    position: relative;
    display: block;
    min-width: 100%;
    table-layout: fixed;
    height: 85%;
    overflow: auto;
    margin: auto;
    border-collapse: collapse;
    border: 1px solid #f9f9f9;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;

const Table = styled.table`
    position: relative;
    display: block;
    min-width: 100%;
    table-layout: fixed;
    height: 85%;
    overflow: auto;
    margin: auto;
    border-collapse: collapse;
    border: 1px solid #f9f9f9;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;

const EmptyMessage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${theme.fonts.size.P1};
    color: ${theme.colors.greyDark};
    /* font-weight: bold; */
    font-family: ${theme.fonts.family.source};
    animation: ${emptyMessageDisplay} 0.5s;
`;