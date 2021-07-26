/* globals lang */
import "i18n/i18n"; // Generates global lang object
import Application from "@smartface/native/application";
import { errorStackBySourceMap } from "error-by-sourcemap";
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: error.stack
    });
};
import System from "@smartface/native/device/system";
import "theme";
import "@smartface/extension-utils";
import router from "routes";

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.


router.push("/pages/mainpage");