import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight, VscBlank } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { Dropdown } from '../global';

type DataTableActionsProps = {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    dataNumber: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    defaultRowsPerPage: number,
    maxPageNumber?: number
};

export const DataTableActions = ({ page, setPage, dataNumber, setRowsPerPage, defaultRowsPerPage, maxPageNumber }: DataTableActionsProps) => {
    const rowsPerPageOptions = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
        { value: 'Infinity', label: 'Tous' }
    ];
    const filteredOptions = dataNumber > 100 ? rowsPerPageOptions.filter(option => option.value !== 'Infinity') : rowsPerPageOptions.filter(option => option.value !== '100');

    const matchingOptions = rowsPerPageOptions.find(option => option.value === defaultRowsPerPage.toString());
    return (
        <TableActions>
            <span>Résultats : {dataNumber}</span>
            <ResultPerPage>Résultats par page :
                <Dropdown
                    onChange={(e) => { setRowsPerPage(e.value === 'Infinity' ? Infinity : parseInt(String(e.value))) }}
                    variant='small'
                    openOnTop
                    defaultValue={matchingOptions}
                    options={filteredOptions}
                    width={'60px'}
                />
            </ResultPerPage>
            {maxPageNumber &&
                <PageChanger>
                    {page != 1 ? <VscChevronLeft className={'changePage'} onClick={() => setPage(page => Math.max(page - 1, 1))} />
                        : <VscBlank />}
                    <span>Page {page} sur {maxPageNumber}</span>
                    {page != maxPageNumber ? <VscChevronRight className={'changePage'} onClick={() => setPage(page => Math.min(page + 1, maxPageNumber))} />
                        : <VscBlank />}
                </PageChanger>}
        </TableActions>
    );
};

const TableActions = styled.div`
    user-select: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 40px;
    padding: 10px 0;
    font-size: ${theme.fonts.size.P0};
`;

const ResultPerPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
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