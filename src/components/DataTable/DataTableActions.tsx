import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight, VscBlank } from "react-icons/vsc";
import { theme } from '../../assets/themes';

type DataTableActionsProps = {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    dataNumber: number,
    rowsPerPage: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    maxPageNumber?: number
};

export const DataTableActions = ({ page, setPage, dataNumber, rowsPerPage, setRowsPerPage, maxPageNumber }: DataTableActionsProps) => {
    return (
        <TableActions>
            <span>Résultats : {dataNumber}</span>
            <span>Résultats par page :
                <select defaultValue={rowsPerPage} name="rowsPerPage" id="rowsPerPage" onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                    <option value="10" >10</option>
                    <option value="15" >15</option>
                    <option value="20" >20</option>
                    <option value="Infinity" >Tous</option>
                </select>
            </span>
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