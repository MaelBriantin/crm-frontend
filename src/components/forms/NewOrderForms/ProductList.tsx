import React, { useEffect } from 'react';
import { useModal } from '../../../contexts';

export const ProductList: React.FC = () => {

    const { setSubTitle } = useModal();

    useEffect(() => {
        setSubTitle("Séléction des produits");
    }, [setSubTitle]);

    return (
        <div>
            <h1>ProductList</h1>
        </div>
    );
}