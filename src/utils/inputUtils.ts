import { theme } from '../assets/themes';

export const getVariantStyle = (variant: 'large' | 'regular' | 'small', textColor: string) => {
    const variantStyle = {
        fontSize: '',
        borderSize: 0,
        height: '',
        textColor: ''
    };

    switch (variant) {
        default:
        case 'large':
            variantStyle.fontSize = theme.fonts.size.P1;
            variantStyle.borderSize = 2;
            variantStyle.height = theme.materialDesign.height.default;
            variantStyle.textColor= textColor;
            break;
        case 'regular':
            variantStyle.fontSize = theme.fonts.size.P0;
            variantStyle.borderSize = 2;
            variantStyle.height = theme.materialDesign.height.medium;
            variantStyle.textColor= textColor;
            break;
        case 'small':
            variantStyle.fontSize = theme.fonts.size.P0;
            variantStyle.borderSize = 1;
            variantStyle.height = theme.materialDesign.height.mini;
            variantStyle.textColor= textColor;
            break;
    }
    return variantStyle;
};