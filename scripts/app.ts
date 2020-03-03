/* globals lang */
require("i18n/i18n.js"); // Generates global lang object
import Application = require("sf-core/application");
import { errorStackBySourceMap } from "error-by-sourcemap";
import { System } from "sf-core/device";
// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};

require("sf-extension-utils");
require("./theme");
const router = require("./routes");
router.push("/pages/page1");
