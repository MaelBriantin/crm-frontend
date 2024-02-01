import { theme } from '../assets/themes';

/**
 * Returns the variant style object based on the provided variant.
 * @param variant - The variant of the style ('default' or 'mini').
 * @returns The variant style object.
 */
export const getVariantStyle = (variant: 'default' | 'mini') => {
    const variantStyle = {
        padding: 0,
        paddingPlus: 0,
        fontSize: '',
        borderSize: 0,
        height: ''
    };

    switch (variant) {
        default:
        case 'default':
            variantStyle.padding = 10;
            variantStyle.paddingPlus = 20;
            variantStyle.fontSize = theme.fonts.size.P1;
            variantStyle.borderSize = 2;
            variantStyle.height = theme.materialDesign.height.default;
            break;
        case 'mini':
            variantStyle.padding = 5;
            variantStyle.paddingPlus = 10;
            variantStyle.fontSize = theme.fonts.size.P0;
            variantStyle.borderSize = 1;
            variantStyle.height = theme.materialDesign.height.mini;
            break;
    }

    return variantStyle;
};