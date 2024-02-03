import React, { ChangeEvent, useState, useEffect } from 'react';
import { Input } from '../global/Input';
import { RowDataType, DataTableSearchProps, RowDataValueTypes } from '../../types/DataTableTypes';
import { VscSearch } from "react-icons/vsc";

export const DataTableSearch = <T extends RowDataType>({ data, onSearch, searchedValue }: DataTableSearchProps<T>): React.ReactElement => {

    const [search, setSearch] = useState<string | number>('');

    useEffect(() => {
        const searchMethod: T[] = data.filter((row: RowDataType) => {
            return Object.values(row).some((value: RowDataValueTypes) => {
                return String(value).toLowerCase().includes(String(search).toLowerCase());
            });
        });
    
        onSearch(searchMethod as T[]);
        searchedValue(search);
    }, [search, data, onSearch, searchedValue]);

    return (
        <Input
            textColor='black'
            placeholder="Rechercher"
            width={400}
            value={search}
            onInput={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            icon={<VscSearch />}
        />
    );

};