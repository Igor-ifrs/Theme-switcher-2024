const icon = document.querySelector(".icon-theme");
const root = document.documentElement;
const [so, page, local] = [...document.querySelectorAll(".info span")];

const THEMES = {
    DARK: "dark",
    LIGHT: "light",
    NOT_DEFINED: "Não definido",
    NO_PREFERENCE: "no-preference",
};

function localStorageTheme() {
    try {
        return localStorage.getItem("theme") || THEMES.NOT_DEFINED;
    } catch (error) {
        console.error("Erro ao acessar localStorage:", error);
        return THEMES.NOT_DEFINED;
    }
}

function SOTheme() {
    const prefTheme = [THEMES.NO_PREFERENCE, THEMES.DARK, THEMES.LIGHT];
    const theme = prefTheme.find((theme) => window.matchMedia(`(prefers-color-scheme: ${theme})`).matches) || THEMES.NOT_DEFINED;
    return theme;
}

function loadTheme() {
    const local = localStorageTheme();
    if (local !== THEMES.NOT_DEFINED) {
        setTheme(local);
        return;
    }
    const sotheme = SOTheme();
    if (sotheme !== THEMES.NO_PREFERENCE && sotheme !== THEMES.NOT_DEFINED) {
        setTheme(sotheme);
    }
}

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    local.textContent = localStorageTheme().toUpperCase();
}

function toggleTheme() {
    const theme = root.getAttribute("data-theme") === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(theme);
}

function updateInfo() {
    so.textContent = SOTheme().toUpperCase();
    page.textContent = root.getAttribute("data-theme").toUpperCase();
    local.textContent = localStorageTheme().toUpperCase();
}

icon.addEventListener("click", toggleTheme);

document.addEventListener("DOMContentLoaded", () => {
    updateInfo();
    loadTheme();
});
