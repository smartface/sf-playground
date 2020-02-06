const Application = require("sf-core/application");
const config = require("./settings.json").config;
const themeConfig = config.theme;
const { createThemeContextBound } = require("@smartface/contx/lib/styling/ThemeContext");
const themeSources = themeConfig.themes
    .map(name => ({
        name,
        rawStyles: require(`./themes/${name}`),
        isDefault: themeConfig.currentTheme === name
    }));

Application.theme = createThemeContextBound(themeSources);
