import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {emptyProductSize, ProductType} from '../../types/ProductTypes';
import {Icon, Input} from '../global';
import {VscAdd, VscRemove} from "react-icons/vsc";
import {theme} from "../../assets/themes";

type ProductSizeProps = {
    productForm: ProductType;
    setProductForm: React.Dispatch<React.SetStateAction<ProductType>>;
};

export const ProductSizeForm: React.FC<ProductSizeProps> = ({ productForm, setProductForm }) => {

    const productSizesInit = (productForm.product_sizes && productForm.product_sizes.length ) ? productForm.product_sizes : [{...emptyProductSize}];
    const [productSizes, setProductSizes] = useState(productSizesInit);

    useEffect(() => {
        setProductForm(prevProductForm => ({
            ...prevProductForm,
            product_sizes: productSizes
        }));
    }, [productSizes, setProductForm]);

    const noEmptyProductSize = productSizes.every(size => size.size !== null && size.size !== '' && size.stock !== null && size.stock !== 0);
    const disableRemoveButton = !noEmptyProductSize && productSizes.length === 1;

    const incrementSizeCount = () => {
        if (noEmptyProductSize) {
            setProductSizes(prevProductSizes => [
                ...prevProductSizes,
                {...emptyProductSize}
            ]);
        }
    };
    const removeSizeCount = (index: number) => {
        if(productSizes.length === 1) {
            setProductSizes([{...emptyProductSize}]);
        } else {
            setProductSizes(productSizes && productSizes.filter((_, i) => i !== index));
        }
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newProductSizes = [...productSizes];
        newProductSizes[index].size = event.target.value;
        setProductSizes(newProductSizes);
    };

    const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newProductSizes = [...productSizes];
        newProductSizes[index].stock = Number(event.target.value);
        setProductSizes(newProductSizes);
    }

    return (
        <ProductSizeContainer>
            {productSizes && productSizes.map((size, index) => (
                <AddSize key={index}>
                    <Input
                        name='size'
                        label='Taille'
                        type='text'
                        placeholder='Taille'
                        width='140px'
                        value={size.size || ''}
                        onChange={(e) => handleSizeChange(e, index)}
                    />
                    <Input
                        name="quantity"
                        label="Stock"
                        type="number"
                        placeholder="Stock"
                        noNegativeNumber
                        width="100px"
                        value={size.stock || ""}
                        onChange={(e) => handleStockChange(e, index)}
                    />
                    <Icon disabled={disableRemoveButton} variant={'small'} icon={<VscRemove />} onClick={() => removeSizeCount(index)} color={`${theme.colors.error}`} />
                    { index === productSizes.length - 1 && <Icon disabled={!noEmptyProductSize} variant={'small'} icon={<VscAdd/>} onClick={() => incrementSizeCount()}/>}
                </AddSize>
            ))}
            {/*<Icon variant={'small'} icon={<VscAdd/>} onClick={() => incrementSizeCount()}/>*/}
        </ProductSizeContainer>
    );
};

const ProductSizeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const AddSize = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;