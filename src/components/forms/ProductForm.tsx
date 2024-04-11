import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import { Dropdown, Input, Textarea, Text } from '../global';
import { ProductType, emptyProduct } from '../../types/ProductType';
import { useStoreProducts } from '../../stores/useStoreProducts';
import { DropdownOptions } from '../global/Dropdown';
import { isEmpty } from '../../utils/helpers/spells';
import { roundPrice,validateProductForm } from '../../utils/productUtils';
import { useFormActions, useModal } from '../../contexts';
import { useStoreBrands } from '../../stores/useStoreBrands';
import { useKeyboardShortcut } from '../../hooks/system/useKeyboardShortcut';
import { theme } from '../../assets/themes';
import { ProductSizeForm } from './ProductSizeForm.tsx';

type ProductFormProps = {
    product?: ProductType;
};

export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {

    const [productForm, setProductForm] = useState(product || emptyProduct as ProductType);
    const [vatPrice, setVatPrice] = useState('');
    const [totalProductSizeStock, setTotalProductSizeStock] = useState(0);

    const { productOptions, fetchProductOptions, productTypes, vatRates, measurementUnits, loadingOptions } = useStoreProducts();
    const { brandsOptions, fetchBrands, loadingBrands } = useStoreBrands();

    const { closeModal } = useModal();
    const { setData, setIsDisableSave } = useFormActions();

    const firstInputRef = useRef<HTMLInputElement>(null);

    useKeyboardShortcut({
        'Escape': () => {
            closeModal();
        }
    });

    useEffect(() => {
        if (firstInputRef.current) {
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 250);
        }
    }, []);

    useEffect(() => {
        isEmpty(productOptions) && fetchProductOptions();
        isEmpty(brandsOptions) && fetchBrands();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!product) {
            setProductForm(prevProductForm => ({
                ...prevProductForm,
                product_type: productTypes.find(e => e.value === 'default') as DropdownOptions,
                vat_rate: vatRates.find(e => e.value === '20')?.value as string,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, productTypes]);

    useEffect(() => {
        if (product?.selling_price == 0 || product?.selling_price === undefined) {
            setVatPrice('0.00');
            setProductForm(prevProductForm => ({
                ...prevProductForm,
                selling_price_with_vat: 0,
            }))
        }
        if (productForm.selling_price && productForm.vat_rate) {
            const multiplication = Number(productForm.selling_price) * (Number(productForm.vat_rate) / 100);
            const priceWithVat = roundPrice(productForm.selling_price + multiplication);
            setVatPrice(String(priceWithVat));
            setProductForm(prevProductForm => ({
                ...prevProductForm,
                selling_price_with_vat: priceWithVat,
            }))
        }
    }, [product?.selling_price, productForm.selling_price, productForm.vat_rate]);

    const productSizeTotal = React.useCallback(() => {
        let total = 0;
        if (productForm.product_sizes) {
            productForm.product_sizes.forEach((s) => {
                const stock = s.stock || 0;
                total += stock;
            });
        }
        setTotalProductSizeStock(total);
    }, [productForm.product_sizes, setTotalProductSizeStock]);


    React.useEffect(() => {
        productSizeTotal();
        setIsDisableSave(!validateProductForm(productForm));
        setData(!!product);
    }, [product, setData, productSizeTotal, productForm, setIsDisableSave]);

    return (
        <Container>
            <LeftContainer>
                <NameContainer>
                    <Input
                        ref={firstInputRef}
                        name='name'
                        label='Nom du produit'
                        type='text'
                        placeholder='Nom du produit'
                        width='396px'
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    />
                </NameContainer>
                <BrandContainer>
                    <Input
                        name='reference'
                        label='Reference'
                        type='text'
                        placeholder='Reference'
                        width='100px'
                        value={productForm.reference || ''}
                        onChange={(e) => setProductForm({ ...productForm, reference: e.target.value })}
                    />
                    <Dropdown
                        loading={loadingOptions}
                        openOnBottom
                        placeholder='Marque'
                        label='Marque'
                        options={brandsOptions || []}
                        value={brandsOptions.find(e => Number(e.value) === productForm.brand_id) || undefined}
                        onChange={(e) => setProductForm({
                            ...productForm,
                            brand_id: Number(e.value),
                        })}
                        width='300px'
                    />
                </BrandContainer>
                <PriceContainer>
                    <Input
                        name='price'
                        label="Prix HT"
                        symbol='€'
                        type='number'
                        noNegativeNumber
                        placeholder="Prix HT"
                        maxLength={10}
                        width='115px'
                        value={productForm.selling_price || ''}
                        onChange={(e) => setProductForm({ ...productForm, selling_price: Number(e.target.value) })}
                    />
                    <Dropdown
                        openOnBottom
                        loading={loadingBrands}
                        placeholder='TVA'
                        openOnTop
                        width='60px'
                        label='TVA'
                        options={vatRates || []}
                        value={vatRates.find(e => e.value === productForm.vat_rate) || undefined}
                        onChange={(e) => setProductForm({ ...productForm, vat_rate: e.value })}
                    />
                    <Text
                        text={String(vatPrice)}
                        symbol='€'
                        width='60px'
                        label='Prix TTC'
                    />
                </PriceContainer>
                <Textarea
                    name='description'
                    label='Description'
                    placeholder='Description'
                    width='396px'
                    height='100px'
                    maxHeight='200px'
                    maxWidth='90%'
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
            </LeftContainer>
            <Divider />
            <RightContainer>
                <Dropdown
                    loading={loadingOptions}
                    openOnBottom
                    placeholder='Type de produit'
                    label='Type de produit'
                    options={productTypes || []}
                    value={productTypes.find(e => e.value === productForm.product_type?.value) || undefined}
                    onChange={(e) => setProductForm({
                        ...productForm,
                        product_type: e as DropdownOptions
                    })}
                    maxHeight='200px'
                />
                {productForm.product_type && productForm.product_type.value === 'default'
                    &&
                    <MeasurementContainer>
                        <Input
                            name='measurement_quantity'
                            label='Quantité'
                            type='number'
                            maxLength={10}
                            placeholder='Quantité'
                            width='120px'
                            value={productForm.measurement_quantity || ''}
                            onChange={(e) => setProductForm({ ...productForm, measurement_quantity: Number(e.target.value) })}
                        />
                        <Dropdown
                            loading={loadingOptions}
                            openOnBottom
                            placeholder='Unité de mesure'
                            label='Unité de mesure'
                            options={measurementUnits}
                            value={measurementUnits.find(e => e.value === productForm.measurement_unit) || undefined}
                            onChange={(e) => setProductForm({ ...productForm, measurement_unit: String(e.value) })}
                            width='160px'
                        />
                    </MeasurementContainer>}
                {productForm.product_type && productForm.product_type.value === 'clothes'
                    &&
                    <ProductSizeForm
                        productForm={productForm}
                        setProductForm={setProductForm}
                    />
                }
                <StockContainer>
                    { productForm.product_type?.value === 'default' && <Input
                        name='stock'
                        label={'Stock actuel'}
                        type='number'
                        placeholder={'Stock actuel'}
                        width='120px'
                        value={productForm.stock || ''}
                        onChange={(e) => setProductForm({...productForm, stock: Number(e.target.value)})}
                    />}
                    { productForm.product_type?.value !== 'default' && <Text
                        label={'Stock total'}
                        text={String(totalProductSizeStock)}
                        width='125px'
                    />}
                    <Input
                        name="stock_alert"
                        label="Alerte de stock"
                        type='number'
                        placeholder='Alerte de stock'
                        width='120px'
                        value={productForm.alert_stock || ''}
                        onChange={(e) => setProductForm({ ...productForm, alert_stock: Number(e.target.value) })}
                    />
                </StockContainer>
            </RightContainer>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    gap: 20px;
`;

const LeftContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 400px;
`;

const RightContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 400px;
`;

const Divider = styled.div`
    width: 2px;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    height: 100%;
    background-color: ${theme.colors.greyLight};
`;

const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BrandContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const MeasurementContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const PriceContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const StockContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;