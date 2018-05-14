import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
    de: {
        ok: "OK",
        errorOccurred: "Ein Fehler ist aufgetreten",

        login: "Login",
        username: "Benutzername",
        password: "Passwort",
        noAccountYet: "Noch keinen Account?",
        forgotPassword: "Passwort vergessen?",

        registration: "Registrieren",
        mail: "E-Mail-Adresse",
        confirmPassword: "Passwort bestätigen",
        usernameInvalid: "Benutzername ungültig",
        passwordInvalid: "Passwort entspricht nicht den Komplexitätsanforderungen (besteht aus mind. 8 Zeichen, mind. eine Zahl, mind. ein Kleinbuchstabe, mind. ein Grossbuchstabe, mind. ein Sonderzeichen, keine Leerzeichen)",
        mailInvalid: "E-Mail-Adresse ungültig",
        confirmPasswordInvalid: "Passwörter stimmen nicht überein",

        registered: "Account erstellt",
        registeredSuccessfully: "Dein Account wurde erfolgreich erstellt. Eine Mail mit dem Link zum Aktivieren deines Accounts wurde an deine Mail-Adresse verschickt.",

        resetPassword: "Passwort zurücksetzen",
        recoveryInitiated: "Passwort-Zurücksetzung initiiert",
        recoveryInitiatedSuccessfully: "Passwort-Zurücksetzung wurde erfolgreich initiiert. Eine Mail mit dem Link zum Zurücksetzen deines Passwortes wurde an deine Mail-Adresse verschickt.",

        accountActivated: "Account aktiviert",
        accountActivatedSuccessfully: "Dein Account wurde erfolgreich aktiviert.",

        logout: "Logout",
        logoutSuccessfully: "Du wurdest erfolgreich abgemeldet.",

        setPassword: "Passwort setzen",
        profile: "Profil",
        userInformation: "Benutzerinformationen",
        changePassword: "Passwort ändern",

        bettingGame: "Tippspiel",
        goals: "Tore",

        bettingPools: "Tippgruppen",

        admin: "Admin"
    }
});