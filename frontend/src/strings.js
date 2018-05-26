import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
    de: {
        ok: "OK",
        errorOccurred: "Ein Fehler ist aufgetreten",
        navTitle:"WM Tippspiel G1",
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
        recoverCompleted: "Passwort-Zurücksetzung abgeschlossen",
        recoverCompletedSuccessfully: "Passwort-Zurücksetzung erfolgreich abgeschlossen. Du kannst dich jetzt mit deinem neuen Passwort einloggen.",

        accountActivated: "Account aktiviert",
        accountActivatedSuccessfully: "Dein Account wurde erfolgreich aktiviert.",

        logout: "Logout",
        logoutSuccessfully: "Du wurdest erfolgreich abgemeldet.",

        setPassword: "Passwort setzen",

        profile: "Profil",
        userInformation: "Benutzerinformationen",
        changePassword: "Passwort ändern",
        passwordChanged: "Passwort geändert",
        passwordChangedSuccessfully: "Dein Passwort wurde erfolgreich geändert.",

        bettingGame: "Tippspiel",
        goals: "Tore",
        points: "Punkte",
        stats: "Statistik",
        gameResult: "Spielergebnis",
        tipsOfOtherUsers: "Tipps aller Benutzer",
        draw: "Unentschieden",
        winner: "Sieger",

        failedToUpdateGame: "Spiel konnte nicht aktualisiert werden.",

        bettingPools: "Tippgruppen",
        newBettingPool: "Neue Gruppe erstellen",
        member: "Mitglied",
        ranking: "Rang",
        delPool: "Gruppe löschen",
        joinPool: "Beitreten",
        leavePool: "Gruppe verlassen",
        newGroupHint: "Name neuer Gruppe...",
        groupAlreadyExists: "Gruppe mit identischem Namen existiert bereits.\nBitte wählen Sie einen anderen Gruppen-Namen.",
        unableToJoinOrLeave: "Verlassen oder Beitreten der Gruppe ist fehlgeschlagen, versuchen Sie es später nochmals.",
        failedToDeleteBet: "Tipp konnte nicht gelöscht werden!",
        betDeleted: "Tipp wurde gelöscht!",
        searchUserHint: "Name eines Benutzers...",

        admin: "Admin",

        appTitle: "WM Tippspiel (G1/wodss)"
    }
});