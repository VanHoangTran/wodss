export const API_ENDPOINT = 'http://localhost:8080/api/';
export const API_ACTION_AUTH = 'authenticate';
export const API_ACTION_REGISTER = 'registration';

// pages
export const pages = {
    root: "/",
    login: "/login",
    registration: "/registration",
    matchList: "/match-list",
    resetPassword: "/reset-password",
};

// colors
export const colors = {
    primaryColor: '#4CAF50',

    // text colors
    hint: '#9E9E9E',
    light: '#FFFFFF',

    // card
    cardHeaderBackground: '#FAFAFA',
};

// dimensions
export const dimensions = {
    defaultSpacing: '1rem',
    smallSpacing: '0.5rem',
    bigSpacing: '2rem',

    toolbar: '4rem',
    formCardWidth: '24rem',
    formCardMarginTop: '10rem',
};

// app theme
export const appTheme = {
    palette: {
        primary1Color: colors.primaryColor,
        primary2Color: colors.primaryColor,
        primary3Color: colors.primaryColor,
    }
};