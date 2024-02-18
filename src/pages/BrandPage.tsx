import { useEffect } from 'react';
import { fetchAllBrands } from '../services/api/brands/fetchAllBrands';

export const BrandPage = () => {
    
    useEffect(() => {
        fetchAllBrands();
    }, []);

    return (
        <div>
            <h1>Brand Page</h1>
        </div>
    );
}