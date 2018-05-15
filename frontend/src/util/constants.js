export const API_ENDPOINT = 'http://localhost:8080/api/';
export const API_ACTION_AUTH = 'authenticate';
export const API_ACTION_REGISTER = 'registration';
export const API_ACTION_RECOVERY = 'recovery';
export const API_ACTION_PHASES = 'phases';
export const API_ACTION_GAMES = 'games';
export const API_ACTION_BET = 'bet';
export const API_ACTION_ACCOUNT = 'account';
export const API_ACTION_POOLS = 'betting-pool';

export const MAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/;
export const PASSWORD_REGEX = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}/;


// pages
export const pages = {
    root: "/",
    login: "/login",
    logout: "/logout",
    registration: "/registration",
    activate: "/activate",
    resetPassword: "/reset-password",
    recover: "/recover",
    matchList: "/match-list",
    bettingPools: "/betting-pools",
    admin: "/admin",
    profile: "/profile",

    paramRegistered: "?registered",
    paramRecoveryInitiated: "?recoveryInitiated",
    paramRecovered: "?recovered",
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
