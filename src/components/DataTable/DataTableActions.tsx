import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight, VscBlank } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { Dropdown } from '../global/Dropdown';

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
        { value: '5', label: '5' },
        { value: '10', label: '10' },
        { value: '15', label: '15' },
        { value: 'Infinity', label: 'Tous' }
    ];
    return (
        <TableActions>
            <span>Résultats : {dataNumber}</span>
            <ResultPerPage>Résultats par page :
                <Dropdown
                    handleSelectChange={(e) => { setRowsPerPage(e === 'Infinity' ? Infinity : parseInt(e)) }}
                    openOnTop
                    defaultValue={defaultRowsPerPage}
                    options={rowsPerPageOptions}
                    width={60}
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