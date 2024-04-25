import React, { useEffect } from 'react';
import { useModal } from '../../../contexts';

export const CustomerList: React.FC = () => {

    const { setSubTitle } = useModal();

    useEffect(() => {
        setSubTitle("Sélectionnez un client");
    }, [setSubTitle]);

    return (
        <div>
            <h1>CustomerList</h1>
        </div>
    );
}