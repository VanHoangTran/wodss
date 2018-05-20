const DEFAULT_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89x8AAuEB74Y0o2cAAAAASUVORK5CYII=";
const URL_BASE = "https://api.adorable.io/avatars/500/";
const FILE_TYPE = ".png";

export const getAvatarUrl = (name) => {
    if (name) {
        return URL_BASE + name + FILE_TYPE;
    }
    return DEFAULT_BASE64;
};

export const getFlagImage = (code) => {
    if (code) {
        return require("../images/flags/" + code + ".svg");
    }
    return DEFAULT_BASE64;
};