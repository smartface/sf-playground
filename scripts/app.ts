/* globals lang */
import "i18n/i18n"; // Generates global lang object
import Application from "@smartface/native/application";
import { errorStackBySourceMap } from "error-by-sourcemap";
import System from "@smartface/native/device/system";
import "theme";
import "@smartface/extension-utils";

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    console.error({
        message: e.message,
        ...error
    });
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};
import router from "routes";

router.push("/root/btb/tab0/mainpage");