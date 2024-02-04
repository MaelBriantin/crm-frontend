import { theme } from '../assets/themes';

export const getVariantStyle = (variant: 'large' | 'regular' | 'small', textColor: string, backgroundColor: string) => {
    const variantStyle = {
        fontSize: '',
        borderSize: 0,
        height: '',
        textColor: '',
        backgroundColor: '',
        padding: ''
    };

    switch (variant) {
        default:
        case 'large':
            variantStyle.fontSize = theme.fonts.size.P0;
            variantStyle.borderSize = 2;
            variantStyle.height = theme.materialDesign.height.default;
            variantStyle.textColor= textColor;
            variantStyle.backgroundColor= backgroundColor;
            variantStyle.padding = theme.materialDesign.padding.default;
            break;
        case 'regular':
            variantStyle.fontSize = theme.fonts.size.P0;
            variantStyle.borderSize = 2;
            variantStyle.height = theme.materialDesign.height.medium;
            variantStyle.textColor= textColor;
            variantStyle.backgroundColor= backgroundColor;
            variantStyle.padding = theme.materialDesign.padding.default;
            break;
        case 'small':
            variantStyle.fontSize = theme.fonts.size.P0;
            variantStyle.borderSize = 1;
            variantStyle.height = theme.materialDesign.height.mini;
            variantStyle.textColor= textColor;
            variantStyle.backgroundColor= backgroundColor;
            variantStyle.padding = theme.materialDesign.padding.dense;
            break;
    }
    return variantStyle;
};