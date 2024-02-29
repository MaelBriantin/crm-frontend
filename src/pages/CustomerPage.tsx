import React, { useEffect } from 'react';
import { isEmpty } from '../utils/helpers/spells';
import { useCustomers } from '../contexts/data/customers';

export const CustomerPage: React.FC = () => {

    const { customers, refreshCustomers } = useCustomers();

    useEffect(() => {
        isEmpty(customers) && refreshCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Customer Page</h1>
        </div>
    );
}