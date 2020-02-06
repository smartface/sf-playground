/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
const OS = require('sf-core/device/system').OS;

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: e.type || lang.applicationError,
        message: OS === "Android" ? e.stack : (e.message + "\n\n*" + e.stack)
    });
};

require("sf-extension-utils");
require("./theme");
const router = require("./routes");
router.push("/pages/page1");
