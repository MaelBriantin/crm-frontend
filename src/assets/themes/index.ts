const colors = {
    dark: "#17161a",
    incognito: "#333",
    white: "#fff",
    background_white: "#f5f5f7",
    ancient_white: '#fdf5df',
    background_dark: "#292729",
    // primary: "#67b6b9",
    // primary: "#BB2649", // viva magenta 
    // primary: "#317773", // teal
    // primary: "#3fbac2", // blue
    // primary: "#4D4DFF", // neon blue
    // primary: "#DC582A", // orange
    primary: "#5f4b8b", // ultra violet
    primary_cake: "#3f7f8e",
    green: "green",
    success: "#60bd4f",
    red: "#e25549",
    redSecondary: "#c4151c",
    error: "#cc0202",
    blue: "#51a7e1",
    greyUltraLight: "#f9f9f9",
    greyLight: "#e4e5e9",
    greyMedium: "#a7a8ad",
    greySemiDark: "#93a2b1",
    greyDark: "#6f737e",
    greyBlue: "#747b91",
    loginLine: "#254f68",
    vivaMagenta: "#BB2649",
    veryPeri: "#6667AB",
    transparent: "rgba(0, 0, 0, 0)"
};

const spacing = {
    xxs: "4px",
    xs: "8px",
    sm: "12px",
    md: "20px",
    lg: "32px",
    xl: "52px",
    xxl: "84px",
};

const fonts= {
    size: {
        XXXS: "8px",
        XXS: "10px",
        XS: "12px",
        S: "14px",
        P0: "16px",
        P1: "18px",
        P2: "20px",
        P3: "24px",
        P4: "36px",
        P5: "48px",
        P6: "60px",
    },
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        heavy: 800,
    },
    family: {
        source: "'Source Sans 3', sans-serif",
        dancing: "'Dancing Script', sans-serif"
    }
};
const materialDesign = {
    height: {
        default: '36px',
        medium: '32px',
        mini: '24px',
    },
    padding: {
        dense: '12px',
        default: '16px'
    },
    fontSize: {
        dense: '13px',
        default: '14px'
    },
    borderRadius: {
        default: '2px',
        rounded: '4px'
    }
}
const gridUnit = 8;
const borderRadius = {
    subtle: 1,
    round: "5px",
    extraRound: "15px",
    circle: "50%",
};
const shadows = {
    header: "black 10px 8px 100px",
    frame: "2px 10px 14px 6px rgba(0,0,0,0.2)",
    card: "-5px 5px 25px 0px rgb(0 0 0 / 20%)",
    default: "-1px 1px 5px 1px rgb(0 0 0 / 20%)",
    inset: "inset -1px 1px 5px 2px rgb(0 0 0 / 20%)",
};

export const theme = {
    colors,
    fonts,
    gridUnit,
    borderRadius,
    shadows,
    spacing,
    materialDesign
};